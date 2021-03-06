import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

const OrderButtons = () => {
    return (
        <Grid item xs={12}>
        <ButtonGroup aria-label="outlined primary button group">
            <Button>Nombre</Button>
            <Button>Relevancia</Button>
            <Button>Precio</Button>
        </ButtonGroup>
        </Grid>
    )
}

export default OrderButtons
