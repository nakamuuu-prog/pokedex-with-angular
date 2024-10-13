// TODO
/**
 * ListとDetailの共通処理。
 * どこに書くか迷ったのでとりあえずutilsに実装しておく。
 */

import {
  Pokemon,
  PokemonSpeciesName,
  PokemonSprites,
} from 'pokedex-promise-v2';

export type PokemonData = {
  id: number;
  name: string;
  image: string;
  types: (string | undefined)[];
};

export function getPokemonName(names: PokemonSpeciesName[]): string {
  const name = names.find((name) => name.language.name === 'ja')?.name;
  const noData: string = '？？？';
  return name ?? noData;
}

export function getPokemonImage(sprites: PokemonSprites): string {
  const image = sprites.other['official-artwork'].front_default;
  const noImage: string = '/assets/image/20200501_noimage.png';
  return image ?? noImage;
}

export async function getPokemonTypes(pokemon: Pokemon): Promise<string[]> {
  return pokemon.types.map((typeInfo) => typeInfo.type.name);
}
