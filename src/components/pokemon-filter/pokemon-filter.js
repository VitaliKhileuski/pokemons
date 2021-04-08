import React, {Component} from 'react'
import './pokemon-filter.css'

export default class PokemonFilter extends Component {
 constructor(props){
     super(props);
     this.state = {
         term : '',
         allTypes : []
     }
     this.onUpdateSearch = this.onUpdateSearch.bind(this);
 }
 onUpdateSearch(e) {
     const term = e.target.value;
     this.setState({
         term : term
     })
     this.props.onUpdateSearch(term);
 }
    render(){
        return (
            <input className="form-control search-input"
            type="text"
            placeholder="find your pokemon"
            onChange={this.onUpdateSearch}/>
            
        )
    
    }
}