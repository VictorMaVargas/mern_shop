const express = require('express')
const db = require('./models/db')
require ('dotenv').config();
const app = express()
const port = process.env.PORT || 5000

// Para habilitar recepcion de JSONs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Servidor levantado
app.get('/', (req, res) => {
  res.send('Servidor funcionando')
})

app.get('/search', async (req, res) => {
  if(req.query.name !== undefined){
    const dbSearch = await db.getProductsByName(req.query.name)//llamo a la BBDD
    res.send(dbSearch)
  }
  else{
    const dbSearch = await db.getProductsByName()//llamo a la BBDD
    res.send(dbSearch)
  }
  if(req.query.provider !== undefined){
    console.log("aquiiii")
    const dbSearch = await db.getProvidersByName(req.query.provider)//llamo a la BBDD
    res.send(dbSearch)
  }
  else{
    const dbSearch = await db.getProvidersByName()//llamo a la BBDD
    res.send(dbSearch)
  }
})

app.get('/searchProvider', async (req, res) => {
  if(req.query.id !== undefined){
    const dbSearch = await db.getManufacturerById(req.query.id)//llamo a la BBDD
    console.log(dbSearch);
    res.send(dbSearch);
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})