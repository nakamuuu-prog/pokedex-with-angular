import { Component, Input } from '@angular/core';
import { PokemonData } from '../../shared/utils/pokemon-utils';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.scss',
})
export class PokemonItemComponent {
  @Input() pokemonDetails!: PokemonData;
}
