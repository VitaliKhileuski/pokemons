import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import PokemonList from './components/pokemons-list'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

