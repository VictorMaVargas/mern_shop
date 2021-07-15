import React from 'react'
// import SearchBar from '../components/SearchBar/SearchBar'
// import Grid from '@material-ui/core/Grid';
//import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import './home.css';

const Home = () => {
    return (
        <div className="home">
            <h2>Bienvenido a </h2>
            <h1>The MERN Shop </h1>
            <a href="/search">
            <button>Busca tus artículos </button>
            </a>
            
        </div>
       
        

    )
}

export default Home