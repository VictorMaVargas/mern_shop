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

app.get('/search', (req, res) => {
  //console.log(req.query);
  if(req.query.name){
    const dbSearch = db.getProductsByName(req.query.name)//llamo a la BBDD
    res.send(dbSearch)
    
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})