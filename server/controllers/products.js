
const Product = require('../models/Product')


const routes = {
    getProducts: async (req, res) => {

        // Obtener de la BBDD MongoDB productos
        let id = req.query.id;
        // Llamada a mongoose
        try {
            const data = id? await Product.find({"id":id}):await Product.find();
            res.status(200).json(data);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    }
}