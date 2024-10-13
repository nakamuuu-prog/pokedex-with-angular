import { Injectable } from '@angular/core';
import PokeAPI, {
  NamedAPIResource,
  Pokemon,
  PokemonSpecies,
} from 'pokedex-promise-v2';

const pokeApi: PokeAPI = new PokeAPI();

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  async getPokemonsList(
    limit: number = 20,
    offset: number = 0
  ): Promise<NamedAPIResource[]> {
    return await pokeApi
      .getPokemonsList({ limit: limit, offset: offset })
      .then((response) => response.results)
      .catch((error) => {
        throw Error('Error fetching Pokémon list:', error);
      });
  }

  async getPokemonSpeciesById(id: number): Promise<PokemonSpecies> {
    return await pokeApi
      .getPokemonSpeciesByName(id)
      .then((response) => response)
      .catch((error) => {
        throw Error('Error fetching Pokémon species:', error);
      });
  }

  async getPokemonByName(name: string): Promise<Pokemon> {
    return await pokeApi
      .getPokemonByName(name)
      .then((response) => response)
      .catch((error) => {
        throw Error('Error fetching Pokémon detail:', error);
      });
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    return await pokeApi
      .getPokemonByName(id)
      .then((response) => response)
      .catch((error) => {
        throw Error('Error fetching Pokémon detail:', error);
      });
  }
}
