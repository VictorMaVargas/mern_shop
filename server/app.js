const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Esta es la Home')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})