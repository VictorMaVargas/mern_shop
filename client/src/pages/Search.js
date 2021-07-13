import React from 'react';
import ProductList from '../components/ProductList/ProductList'
import OrderButtons from '../components/OrderButtons/OrderButtons'
import Footer from '../components/Footer/Footer'
import SearchBar from '../components/SearchBar/SearchBar'
import Grid from '@material-ui/core/Grid';
//import {Link} from 'react-router-dom'

const Search = () => {
    return (
        <div>
        <Grid container spacing={5}>
            <SearchBar/>
            <OrderButtons/>
            <ProductList/>
            <Footer/>
        </Grid>
        </div>
    )
}

export default Search