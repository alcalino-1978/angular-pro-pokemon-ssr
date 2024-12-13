import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnInit,
} from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from '@angular/router';

const IMG_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonCardComponent {
  pokemon = input.required<SimplePokemon>();
  readonly pokemonImage = computed(() => `${IMG_URL}${this.pokemon().id}.png`);

  // logEffect = effect(() => {
  //   console.log(
  //     'PokemonCardComponent initialized with pokemon:',
  //     this.pokemon()
  //   );
  // });
}
