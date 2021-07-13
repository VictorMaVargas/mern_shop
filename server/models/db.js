const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/tiendaonline";

// Conexión
async function conn(){
    const client = await MongoClient(url,{ useUnifiedTopology: true });
    client
    .connect()
    .then(()=>console.log("BBDD Conectada"))
    .catch(e=>console.log(e));
    return client; // Objeto de conexion a la BBDD
}
// CRUD
const products = {
    // Función para leer los articulos de la BBDD
    getProductsByName: async (Nombre) => {
        const client = await conn();
        let result;
        Nombre? result = await client.db("tiendaonline").collection("articulos").find({ "Nombre": Nombre }).toArray():
            result = await client.db("tiendaonline").collection("articulos").find().toArray();
            console.log(result)
    
        if (result) {
            console.log(`Hay articulo con el nombre '${Nombre}':`);
            console.log(result);
        } else {
            console.log(`No hay articulos con el nombre'${Nombre}'`);
        }
        return result;
    }
}
module.exports = products;