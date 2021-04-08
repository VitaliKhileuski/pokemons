import React, {Component} from 'react'
import ApiService from '../../services//api-service/api-service.js'
import './pokemon-info.css'
export default class PokemonInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemonUrl : 'https://pokeapi.co/api/v2/pokemon/1/',
            pokemon: null,
            loading : true
        }
    }
    apiservice = new ApiService();
    onPokemonLoaded = (currentPokemon) => {
        this.setState({
            pokemon: currentPokemon,
            loading: false
        });
    }
    componentDidMount() {
        this.apiservice.GetPokemonByURL(this.state.pokemonUrl)
        .then(pokemons => this.onPokemonLoaded(pokemons));
    }
    componentDidUpdate(prevProps) {
        if(this.props.pokemon!==prevProps.pokemon){
            this.setState({pokemon : this.props.pokemon,loading : false})
        }
    }
        
    

    render(){
        
        
        
        const{pokemon, loading} = this.state;
        let types = []
        let abilities = []
        let stats = []
        
        if(pokemon!==null){
            
                for(let i = 0;i<pokemon.stats.length;i++){
                    stats.push(<li key={i} className="list-group-item-active d-flex"><label>{pokemon.stats[i].stat.name}</label><label>{pokemon.stats[i].base_stat}</label></li>)
                }

             abilities = pokemon.abilities.map(item => {
                if (!item.is_hidden) {
                    return(
                        <li key={item.slot} className="list-group-item-active">
                            {item.slot}. {item.ability.name}
                        
                        </li>
                        
                    );
                } else {
                    return(
                        <li key={item.slot} className="list-group-item-active">
                            {item.ability.name} (hidden)
                            
                        </li>
                    );
                };
            });
             types = pokemon.types.map((item, i)=> {
                return(
                    <button key={i} type="button" className="btn btn-warning" disabled>
                        {item.type.name.toUpperCase()}
                    </button>
                );
            });
        }
        

        const info = loading ? <div>loading...</div> :
        <div className="cardInfo card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img className='pokImg' src={pokemon.sprites.other.dream_world.front_default} alt="no img"/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">Pokedex data</h4>
              <ul className="infoList list-group list-group-flush d-flex">
                    <li className="list-group-item-active d-flex">
                        <label>National № </label>
                        <label> {" "+pokemon.id}</label> 
                    </li>
                    <li className="list-group-item-active d-flex">
                    <label>Type</label>
                    {types}
                    </li>
                    <li className="list-group-item-active d-flex">
                        <label>Species</label>
                        <label>{pokemon.name+" pokemon"}</label>
                    </li>
                    <li className="list-group-item-active d-flex">
                        <label>Height</label>
                        <label>{pokemon.height/10 + "m"}</label> 
                    </li>
                    <li className="list-group-item-active d-flex" >
                        <label>Weight</label>
                        <label>{pokemon.weight/10+"kg"} </label>
                    </li>
                    
                    <li className="list-group-item-active d-flex">
                        <label>Abilities</label>
                        <ul className="abilities">{abilities}</ul>
                    </li>
                    {stats}
              </ul>
            </div>
          </div>
        </div>
      </div>
        return (
            <div className="main">
            {info}
            </div>
        )
    }




}