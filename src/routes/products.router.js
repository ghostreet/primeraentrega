const express = require("express");
const router = express.Router();
const userData = require('./userData');
const { productModel } = require('../models/product.model.js');
const user = userData;


router.get("/api/products", async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});


router.get("/api/products", async(req,res)=>{
    try{
        const limit = req.query.limit;
        const products = await productModel.find();


        if (limit && !isNaN(limit)) {  
        const limite = parseInt(limit, 10);
        products = await productModel.find().limit(limite)
    } else{
        products = await productModel.find();
    }
    res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos'});
    }
});
    

router.get("/api/products/:pid", async(req,res)=>{
    const { pid } = req.params;
    try{
        const product = await productModel.findById(pid)
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado'})
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto'});
    }
});

router.put('/api/products/:pid', async(req, res) => {
    const {pid} = req.params;
    const updateFields = req.body;
    try {
        const updateProduct = await productModel.findByIdAndUpdate(pid, updateFields, {new:true});
        if (!updateProduct){
            return res.status(404).json({error: 'Producto no encontrado'});
        }
        res.jason(updateProduct)
    }catch (error) {
        res.status(500).json({error: 'error al actualizar el producto'});
    };
})

router.post("/api/add/products", async(req,res)=>{
    const newProd = req.body;

    //newProd.pid = parseInt(newProd.id, 10)

    //const checkId = products.find(product => product.id === newProd.id);
    //if (checkId){
        //return res.status(400).json({error: 'Ya existe un producto con ese ID'});
    //}
    try{
        const createdProduct = await productModel.create(newProd);
        res.json({ message: 'Producto agregado correctamente', product: createdProduct });
    } catch (error) {
        res.status(500).json({ error:'Error al agregar el producto'})
    }
})
    /*if (!newProd.id ||
        !newProd.name ||
        !newProd.price ||
        !newProd.description ||
        !newProd.code ||
        !newProd.stock ||
        !newProd.category) {
        return res.status(400).json({ error: 'Debe proporcionar todos los campos (id, name, price, description, code, stock, category).' });
    }
    let result = await productModel.create({newProd})
    res.send({ result: "success", payload: result})

    products.push(newProd)
    res.json({message: "Producto agregado correctamente"})
})*/

router.delete("/api/products/delete/:pid", async(req,res)=>{
    const { pid } = req.params;
    try {
        const eliminarProd = await productModel.findByIdAndRemove(pid);
        if (!eliminarProd) {
            return res.status(404).json({ message: 'Producto no encontrado'})
        }
        res.json({ message: 'Producto eliminado correctamente'})
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto'})
    }
});
    /*const eliminarProd = parseInt(req.params.pid, 10)
    const index = products.findIndex((product) => product.id === eliminarProd)
    
    if (index === -1){
        console.log('producto no encontrado')
        return res.status(404).json({error: 'Producto no encontrado'})
    }
    products.splice(index, 1);
    console.log('producto eliminado')
    res.json({message: 'Producto eliminado exitosamente'})
    res.render('index.handlebars',{
        products:products
    })
})*/






module.exports = router;