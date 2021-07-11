import React from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
//import SearchIcon from '@material-ui/icons/Search';


const SearchBar = () => {
    return (
        <Grid item xs={12}>
            <form noValidate autoComplete="off">
          <Grid item>
              <h1>THE MERN SHOP</h1>
                <TextField id="outlined-basic" label="Buscar" variant="outlined" />
          </Grid>
            </form>
        </Grid>
    )
}

export default SearchBar
