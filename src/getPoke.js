import { readFile, writeFile } from "fs/promises";

class GetPokeApi {
    async create() {
        const pokes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15')

        pokes.json().then(item => {
            writeFile('pokeUrl.json', JSON.stringify(item.results, null, 2))                                                            
        })
    }

    async getPokeUrl () {
        const pokeListUrl = JSON.parse(await readFile('pokeUrl.json', 'utf-8'))

        const infosPokes = pokeListUrl.map(async (pokeLink) => {
            let url = pokeLink.url;

            // const result = await fetch(url).then(response => response.json())
            const response = await fetch(url);
            const result = await response.json();
      
            const pokeStats = result.stats.map((pokeStat) => {
              return {
                statName: pokeStat.stat.name,
                value: pokeStat.base_stat,
              };
            });
      
            const pokeMoves = result.moves.map((pokeMove) => {
              return {
                move: pokeMove.move.name,
              };
            });
            const PokeData = {
              name: result.forms[0].name,
              dex: result.game_indices[9].game_index,
              version: result.game_indices[9].version.name,
              height: result.height,
              weight: result.weight,
              //stats: pokeStats,
              imgUrl: result.sprites.front_default,
              imgOfficial: result.sprites.other['official-artwork'].front_default
              //moves: pokeMoves
            };
      
            return PokeData;
        })

        const listFinal = await Promise.all(infosPokes)

        writeFile('pokedex.json', JSON.stringify(listFinal, null, 2))

    }
}



function main() {
    const poke = new GetPokeApi()
    poke.getPokeUrl()
}

main()