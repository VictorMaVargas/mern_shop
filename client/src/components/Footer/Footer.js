import React from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const Footer = () => {
    return (
        <Grid item xs={12}>
        <ButtonGroup aria-label="outlined primary button group">
            <Button><ArrowBackIcon/>Anterior</Button>
            <Button>Siguiente<ArrowForwardIcon/></Button>
        </ButtonGroup>
        </Grid>
    )
}

export default Footer
