import React from 'react'
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const SearchBar = () => {
    const [inputText, setInputText] = useState ('')

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
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
