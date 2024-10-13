import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../shared/service/pokemon.service';
import {
  getPokemonImage,
  getPokemonName,
  getPokemonTypes,
  PokemonData,
} from '../shared/utils/pokemon-utils';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent {
  pokemonDetails!: PokemonData;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  async ngOnInit(): Promise<void> {
    const routerPrams = this.route.snapshot.paramMap;
    const pokemonId = Number(routerPrams.get('pokemonId'));
    const pokemon = await this.pokemonService.getPokemonById(pokemonId);
    console.log(pokemon);
    const pokemonSpecies = await this.pokemonService.getPokemonSpeciesById(
      pokemon.id
    );

    const name = getPokemonName(pokemonSpecies.names);
    const image = getPokemonImage(pokemon.sprites);
    const types = await Promise.all(await getPokemonTypes(pokemon));

    this.pokemonDetails = {
      id: pokemon.id,
      name: name,
      image: image,
      types: types,
    };
  }
}
