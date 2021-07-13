import React from 'react'
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
//import SearchIcon from '@material-ui/icons/Search';



const SearchBar = () => {
    const [inputText, setInputText] = useState ('')

    return (
        <Grid item xs={12}>
          <Grid item>
              <h1>THE MERN SHOP</h1>
              <input onClick="/search" value="Buscar"></input>
                <TextField
                    value={inputText}
                    onChange={(e)=>setInputText(e.target.result)}
                    id="outlined-basic" label="Buscar" variant="outlined">
                </TextField>
          </Grid>
            
        </Grid>
    )
}

export default SearchBar
