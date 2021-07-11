import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

function Footer() {
    return (
        <Grid item xs={12}>
        <ButtonGroup aria-label="outlined primary button group">
            <Button>Anterior</Button>
            <Button>Siguiente</Button>
        </ButtonGroup>
        </Grid>
    )
}

export default Footer
