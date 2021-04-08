import React, {Component} from 'react'
import  ApiService from  '../../services/api-service/api-service.js';
import PokemonList from '../pokemons-list';
import PokemonInfo from '../pokemon-info';
import PokemonFilter from '../pokemon-filter';
import './app.css';


export default class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            firstPokemons: null,
            pokemonUrl : 'https://pokeapi.co/api/v2/pokemon/1/',
            currentPokemon : null,
            term : '',
            loading: true
        }
        this.GetPokemon = this.GetPokemon.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }
    apiservice = new ApiService();
   
    onPokemonsLoaded = (pokemons) => {
        this.setState({
            firstPokemons: pokemons,
            loading: false
        });
    }

    componentDidMount() {
        this.apiservice.GetFirstPokemons()
                .then(pokemons => this.onPokemonsLoaded(pokemons));
                this.GetPokemon(this.state.pokemonUrl);
    }


    GetPokemon(pokemon){
        this.setState(() => {
            return (
                {
                    currentPokemon : pokemon
                }
            )
        });
    }
    onUpdateSearch(term){
        this.setState({term});
    }

   render(){
       const {firstPokemons, loading,currentPokemon, term} = this.state;
       const list = loading ? <div>loading...</div> :
       <div className="page">
       <div className="list">
            <PokemonFilter onUpdateSearch={this.onUpdateSearch}/>
            <PokemonList GetPokemon={this.GetPokemon} pokemons={firstPokemons} term={term}/>
        </div>
        <div className="pokemonInfo">
        <PokemonInfo pokemon={currentPokemon}/>
        </div>
        </div>
        return (
            <>
                {list}
            </>
        )
    }


}