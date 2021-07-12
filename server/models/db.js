const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

// Conexión
async function conn(){
    const client = await MongoClient(url,{ useUnifiedTopology: true });
    client
    .connect()
    .then(()=>console.log("Ha funcionado! estamos conectados"))
    .catch(e=>console.log(e));
    return client; // Objeto de conexion a la BBDD
}