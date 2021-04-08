import React, {Component} from 'react'
import PokemonListItem from '../pokemon-list-item';
import ApiService from '../../services/api-service/api-service.js'
import {SetPokemons} from '../../services/api-service/api-service.js'
import './pokemon-list.css'
import 'bootstrap/dist/js/bootstrap.bundle';

export default class PokemonList extends Component{
    constructor(props){
        
        super(props);
        this.state = {
            allPokemons : [],
            pagePokemons : [],
            pokemonListItem : [],
            allTypes: ["all types"],
            startIndex : 0,
            endIndex : 9,
            currentPageIndex : 1,
            loading : true,
            count : 11000,
            term : '',
            filter : '',
            currentType : 'all types'

        }
        this.NextItems = this.NextItems.bind(this);
        this.PreviosItems = this.PreviosItems.bind(this);
    }   
    apiservice = new ApiService();

    async SetPokes(){
         for(let i=1; i<=this.state.count;i++){
                if(i===898){
                        this.setState({count : 10220})

                }
             let pokemon = await SetPokemons(i);
             for(let i =0 ;i<pokemon.types.length;i++){
                if(!(this.state.allTypes.includes(pokemon.types[i].type.name))){
                    
                    this.setState({allTypes: [...this.state.allTypes ,pokemon.types[i].type.name]});
    
                }
             }
             
            this.setState({allPokemons: [...this.state.allPokemons , pokemon]});
            if(i===898){
                i=10000;
            }

         }
     }
    async componentDidMount(){
       await this.SetPokes()
    }

    updateTerm(term) {
        
        this.setState({
            term,
            currentPageIndex : 1
        })
    }

    componentDidUpdate(prevProps){
        if (this.props.term !== prevProps.term) {
            this.updateTerm(this.props.term);
        }
    }

    PreviosItems(){
            if(this.state.currentPageIndex<2){
                return;
            }
            else{
                this.setState({currentPageIndex : this.state.currentPageIndex-1})
            }
    }

    NextItems(){
        if(this.state.currentPageIndex*9<this.state.allPokemons.length){
            this.setState({currentPageIndex : this.state.currentPageIndex+1}) 
        }
        else{
            return;
        }
    }

    SetNewListOfPokemons(){
        const {startIndex, endIndex, allPokemons} = this.state;
        let newPagePokemons = allPokemons.slice(startIndex, endIndex + 1)
        this.setState(() => {
            return (
                {
                    pagePokemons : newPagePokemons
                }
            )
        })
    }
    searchPokemon(items,term) {
        if (term === ''){
            return items;
        }
        else{
           return items.filter((item) => item.name.indexOf(term) > -1);
        }
    }
    
    GetType(e){
        this.setState({currentType : e.target.outerText});
        this.setState({currentPageIndex: 1});
    }
    FilterByType(items) {
        let newItems = [] 
        for(let i=0; i<items.length;i++){
            for(let j=0; j<items[i].types.length;j++){
                if(this.state.currentType==="all types"){
                    return items;
                }
                else if(this.state.currentType===items[i].types[j].type.name){
                    newItems.push(items[i]);
                }   
            }
        }
        return newItems;
        
    }
render(){
    const types= [];
    const {allPokemons,term} = this.state
    const visiblePoKemons = this.FilterByType(this.searchPokemon(allPokemons, term,));
    let elements = [];
    const {GetPokemon} = this.props;
    if(this.state.allTypes!==undefined){
        for(let i=0; i<=this.state.allTypes.length;i++){
        
            types.push(<a key={i} onClick={(e) => this.GetType(e)} value={this.state.allTypes[i]} className="dropdown-item" href="#">{this.state.allTypes[i]}</a>)
        }
    }
    
    if(allPokemons[0]!==undefined && allPokemons[0]!==null && allPokemons[0].id!==undefined && allPokemons[0].id!==null){
        let startInd = (this.state.currentPageIndex-1)*this.state.endIndex;
        let endInd = startInd+8; 
        for(let i = startInd; i<=endInd; i++){
            if(visiblePoKemons[i]!==undefined && visiblePoKemons[i]!==null && visiblePoKemons[i].id!==undefined && visiblePoKemons[i].id!==null){
                elements.push(<PokemonListItem  GetPokemon={() => GetPokemon(visiblePoKemons[i])} key={visiblePoKemons[i].id}  pokemon={visiblePoKemons[i]}/>)
            }
        }
    }
    
    return (
        <>
        <div className="listButtons">
        <div className="types">
            <button  className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Types
            </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {types}
              </div>
            </div>
            <ul className="list-inline-item">{elements}</ul>
            <div className="buttonsGroup">
                <button className='btn btn-primary' onClick={this.PreviosItems}>Prev</button>
                <button className='btn btn-primary'onClick={this.NextItems}>Next</button>
            </div>
            
        </div>
        </>
            
        
        
    )
}

}