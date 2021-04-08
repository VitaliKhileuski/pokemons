
export default class ApiService {
    constructor() {
        this._apiBase = 'https://pokeapi.co/api/v2';
    }
      async GetFirstPokemons(){
          let firstPokemons = {};
        await fetch('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0')
        .then(response => response.json())
        .then(pokemons => {
         
            firstPokemons = pokemons;
        
        });
        return firstPokemons;
       }

       async SetPokemons(func) {
         const pokemons =  this.getAllPokemons();
         for(let i=0; i<pokemons.results.length; i++){
             func(await this.GetPokemonByURL(pokemons.results[i].url))
             
         }
       }

       
       async GetPokemonByURL(url){
           let pokemon = {}
        await fetch(url)
        .then(response => response.json())
        .then(currentPokemon => {
            pokemon = currentPokemon;
        });

          return pokemon;
       }
       async getAllPokemons() {
        const data = [];
        let Pokemons = [];
        await fetch('https://pokeapi.co/api/v2/pokemon?limit=1118')
            .then(response => response.json())
            .then(allPokemons => {
                Pokemons = allPokemons;
                
            });
        for (let i = 0; i < Pokemons.results.length; i++) {
            let currentPokemon = await this.fetchPokemonData(Pokemons.results[i])
            if (!!currentPokemon.id) {
                data.push(currentPokemon);
            }
        }
        return data;
    }
    async fetchPokemonData(pokemon) {
        let url = pokemon.url;
        const res =  await fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            });
        return res;
    }
}
export async function SetPokemons(count) {
        return await GetPokemonByURL(count);
  }

  async function GetPokemonByURL(number){
    let pokemon = {}
    let url = `https://pokeapi.co/api/v2/pokemon/${number}`
 await fetch(url)
 .then(response => response.json())
 .then(currentPokemon => {
     pokemon = currentPokemon;
 });

   return pokemon;
}

async function getAllPokemons() {
 const data = [];
 let Pokemons = [];
 await fetch('https://pokeapi.co/api/v2/pokemon?limit=1118')
     .then(response => response.json())
     .then(allPokemons => {
         Pokemons = allPokemons;
         
     });
 for (let i = 0; i < Pokemons.results.length; i++) {
     let currentPokemon = await fetchPokemonData(Pokemons.results[i])
     if (!!currentPokemon.id) {
         data.push(currentPokemon);
     }
 }
 return data;
}

async function fetchPokemonData(pokemon) {
 let url = pokemon.url;
 const res =  await fetch(url)
     .then(response => {
         if (response.ok) {
             return response.json();
         } else {
             return null;
         }
     });
 return res;
}