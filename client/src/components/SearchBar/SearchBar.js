import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
//import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";

const SearchBar = () => {
    const history = useHistory();
    const [inputText, setInputText] = useState ('')

    function handleClick() {
      history.push(`/search?name=${inputText}`);
    }
    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
              <h1>THE MERN SHOP</h1>
              <form noValidate autoComplete="off">
                <TextField
                    value={inputText}
                    onChange={(e)=> setInputText(e.target.value)}
                    id="outlined-basic" label="Buscar" variant="outlined">
                </TextField>
              </form>
                  <Button onClick={() => handleClick(inputText)} variant="contained">Buscar</Button>
            </Grid>
        </Grid>
    )
}
export default SearchBar
