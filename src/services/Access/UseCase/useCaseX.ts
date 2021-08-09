
import { repository } from '../Domain/repository';

export default async function fetchPoGOData(url:any): Promise<any>{
  const fetch = require('node-fetch')

    const response = await fetch(url)
    const data = await response.json()

    const pokemon = {
      // img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      imgGame: data.sprites.front_default,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      special: data.stats[3].base_stat,
    };

    return pokemon
}
