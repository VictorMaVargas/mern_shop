const Mongo = require('mongodb')
const url = "mongodb://localhost:27017/tiendaonline";

// Conexión a la BBDD con MongoDB

async function conn(){
    const client = await Mongo.MongoClient(url,{ useUnifiedTopology: true });
    client
    .connect()
    .then(()=>console.log("BBDD Conectada"))
    .catch(e=>console.log(e));
    return client; // Objeto de conexion a la BBDD
}
// Lee los articulos de la BBDD por nombre

const products = {

    getProductsByName: async (Nombre) => {
        const client = await conn();
        let result;
        Nombre !== '' ? result = await client.db("tiendaonline").collection("articulos").find({ "Nombre": Nombre }).toArray():
            result = await client.db("tiendaonline").collection("articulos").find().toArray();
    
        if (result) {
            console.log(`Hay articulo con el nombre '${Nombre}`);
            console.log(result);
        } else {
            console.log(`No hay articulos con el nombre'${Nombre}`);
        }
        return result;
    },

    // Lee los proveedores de la BBDD por nombre

    getProvidersByName: async (Provider) => {
        const client = await conn();
        let result;
        Provider !== '' ? result = await client.db("tiendaonline").collection("fabricante").find({ "Nombre": Provider }).toArray():
            result = await client.db("tiendaonline").collection("fabricante").find().toArray();
    
        if (result) {
            console.log(`Datos del fabricante con el nombre '${Provider}`);
            console.log(result);
        } else {
            console.log(`Datos del fabricante con el nombre'${Provider}`);
        }
        return result;
    },

    // Función para leer los proveedores de la BBDD por ID

    getManufacturerById: async (id) => {
        const client = await conn();
        const result = await client.db("tiendaonline").collection("fabricante").find({ "_id": Mongo.ObjectID(id)}).toArray()
        if (result) {
            console.log(`Hay proveedor con el id '${id}`);
            console.log(result);
        } else {
            console.log(`No hay proveedor con el id'${id}`);
        }
        return result;
    }
}
module.exports = products;