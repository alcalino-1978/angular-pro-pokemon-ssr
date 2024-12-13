import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import PokemonListSkeletonComponent from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [CommonModule, PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );
  isLoading = signal(true);

  private appRef = inject(ApplicationRef);
  private $appState = this.appRef.isStable.subscribe((isStable) => {
    if (isStable) {
      console.log({ isStable });
      this.isLoading.set(false);
    }
  });

  ngOnInit() {
    console.log(this.currentPage());
    this.loadPokemons();
  }

  ngOnDestroy() {
    this.$appState.unsubscribe();
  }

  loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;

    this.isLoading.set(true);
    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => {
          this.router.navigate([], {
            queryParams: { page: pageToLoad },
            queryParamsHandling: 'merge',
          });
        }),
        tap(() => {
          this.title.setTitle(`Pokemons - Page ${pageToLoad}`);
        })
      )
      .subscribe((pokemons) => {
        this.isLoading.set(false);
        this.pokemons.set(pokemons);
      });
  }
}
