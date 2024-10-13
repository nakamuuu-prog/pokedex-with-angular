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

  private total: number = 1025; // ポケモンの総数(2024/10/13時点)

  private noImage: string = '/assets/image/20200501_noimage.png';
  private noData: string = '？？？';

  pageSizeOptions: number[] = [20, 50, 100];
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = Math.ceil(this.total / this.pageSize);

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    const resourceList = await this.pokemonService.getPokemonsList();
    await this.setPokemonsList(resourceList);
  }

  private async setPokemonsList(
    resourceList: NamedAPIResource[]
  ): Promise<void> {
    const list: PokemonData[] = [];

    for (const resource of resourceList) {
      const pokemon = await this.pokemonService.getPokemonByName(resource.name);

      if (pokemon.id > this.total) break;

      const pokemonSpecies = await this.pokemonService.getPokemonSpeciesByName(
        pokemon.id
      );

      const name = this.getPokemonName(pokemonSpecies.names);
      const image = this.getPokemonImage(pokemon.sprites);
      const types = await Promise.all(await this.getPokemonTypes(pokemon));

      list.push({
        id: pokemon.id,
        name: name,
        image: image,
        types: types,
      });
    }

    this.pokemonsList = list;
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

  async updatePageSize(event: any): Promise<void> {
    this.pageSize = Number(event.target.value);
    this.totalPages = Math.ceil(this.total / this.pageSize);
    this.currentPage = 1;
    await this.updatePokemonsList();
  }

  async navigateToPage(page: number): Promise<void> {
    this.currentPage = page;
    await this.updatePokemonsList();
  }

  private async updatePokemonsList(): Promise<void> {
    const offset = this.pageSize * (this.currentPage - 1);
    const resourceList = await this.pokemonService.getPokemonsList(
      this.pageSize,
      offset
    );
    await this.setPokemonsList(resourceList);
  }
}
