import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import PokemonListSkeletonComponent from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [
    CommonModule,
    PokemonListComponent,
    PokemonListSkeletonComponent,
    RouterLink,
  ],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute);
  private title = inject(Title);

  currentPage = toSignal(
    this.route.params.pipe(
      map((params) => params['page'] ?? 1),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );
  isLoading = signal(true);

  private appRef = inject(ApplicationRef);
  private $appState = this.appRef.isStable.subscribe((isStable) => {
    if (isStable) {
      this.isLoading.set(false);
    }
  });

  loadOnPageChanged = effect(
    () => {
      this.loadPokemons(this.currentPage());
    },
    {
      allowSignalWrites: true,
    }
  );

  ngOnDestroy() {
    this.$appState.unsubscribe();
  }

  loadPokemons(page = 0) {
    this.isLoading.set(true);
    this.pokemonsService
      .loadPage(page)
      .pipe(
        tap(() => {
          this.title.setTitle(`Pokemons - Page ${page}`);
        })
      )
      .subscribe((pokemons) => {
        this.isLoading.set(false);
        this.pokemons.set(pokemons);
      });
  }
}
