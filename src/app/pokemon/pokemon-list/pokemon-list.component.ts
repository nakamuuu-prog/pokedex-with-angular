import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../shared/service/pokemon.service';
import { PokemonData } from '../../type';
import {
  NamedAPIResource,
  Pokemon,
  PokemonSpeciesName,
  PokemonSprites,
} from 'pokedex-promise-v2';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemonsList: PokemonData[] = [];
  isLoading: boolean = this.pokemonsList === null;
  private total: number = 1025;
  private noImage: string = '/assets/image/20200501_noimage.png';
  private noData: string = '？？？';

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    const pokemonsList = await this.pokemonService.getPokemonsList();
    await this.setPokemonsList(pokemonsList);
  }

  private async setPokemonsList(list: NamedAPIResource[]): Promise<void> {
    for (const resource of list) {
      const pokemon = await this.pokemonService.getPokemonByName(resource.name);

      if (pokemon.id > this.total) break;

      const pokemonSpecies = await this.pokemonService.getPokemonSpeciesByName(
        pokemon.id
      );

      const name = this.getPokemonName(pokemonSpecies.names);
      const image = this.getPokemonImage(pokemon.sprites);
      const types = await Promise.all(await this.getPokemonTypes(pokemon));

      this.pokemonsList.push({
        id: pokemon.id,
        name: name,
        image: image,
        types: types,
      });
    }
  }

  private getPokemonName(names: PokemonSpeciesName[]): string {
    const name = names.find((name) => name.language.name === 'ja')?.name;
    return name ?? this.noData;
  }

  private getPokemonImage(sprites: PokemonSprites): string {
    const image = sprites.other['official-artwork'].front_default;
    return image ?? this.noImage;
  }

  private async getPokemonTypes(pokemon: Pokemon): Promise<Promise<string>[]> {
    return pokemon.types.map(async (typeInfo) => {
      return typeInfo.type.name;
    });
  }
}
