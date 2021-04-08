import React, {Component} from 'react'
import ApiService from '../../services/api-service/api-service';

export default class PokemonListItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            pokemonUrl : 'https://pokeapi.co/api/v2/pokemon/1/',
            pokemon : this.props.pokemon,
            loading : true
        }
    }
     

    apiservice = new ApiService();
    // onPokemonLoaded = (currentPokemon) => {
    //     this.setState({
    //         pokemon: currentPokemon,
    //         loading: false
    //     });
    // }

    // componentDidMount() {
    //     this.apiservice.GetPokemonByURL(this.state.pokemonUrl)
    //             .then(pokemons => this.onPokemonLoaded(pokemons));
    // }
    
    render(){
        //<img src={pokemon.sprites.other.dream_world.front_default} alt=''></img>
        const {GetPokemon} = this.props;
        const {name} = this.props.pokemon;
        const {pokemon} = this.state;
        const listItem = <div className='list-inline-item list-group-item-info' key={pokemon.id} onClick={GetPokemon}><img src={pokemon.sprites.other.dream_world.front_default} alt='no img'></img><label>{name}</label></div> 
        return (
            <>
                {listItem}
            </>
        )
    }

}