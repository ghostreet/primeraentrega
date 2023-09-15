const express = require("express")
const router = express.Router()
const products = require('./products')

router.get("/api/products", (req,res)=>{
    const limit = req.query.limit;
    if (limit && !isNaN(limit)) {
    const limite = parseInt(limit, 10);
    const numProd = products.slice(0,limite);
    res.json(numProd)
}else {
    res.json(products);
} 
})

router.get("/api/products/:pid", (req,res)=>{
    const prodId = parseInt(req.params.pid)
    const product = products.find((product)=> product.id === prodId)
    if (!product) {
        res.status(404).json({message: "producto no encontrado"})
    }
       return res.json(product);
})

router.put('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const updateFields = req.body;
    console.log('Datos recibidos:', updateFields);

    
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar.' });
    }

    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    products[productIndex] = {
        ...products[productIndex],
        ...updateFields
    };

    return res.json(products[productIndex]);
});


router.post("/api/products", (req,res)=>{
    const newProd = req.body;

    newProd.pid = parseInt(newProd.id, 10)

    const checkId = products.find(product => product.id === newProd.id);
    if (checkId){
        return res.status(400).json({error: 'Ya existe un producto con ese ID'});
    }
    if (!newProd.id ||
        !newProd.name ||
        !newProd.price ||
        !newProd.description ||
        !newProd.code ||
        !newProd.stock ||
        !newProd.category) {
        return res.status(400).json({ error: 'Debe proporcionar todos los campos (id, name, price, description, code, stock, category).' });
    }

    products.push(newProd)
    res.json({message: "Producto agregado correctamente"})
})

router.delete("/api/products/delete/:pid", (req,res)=>{
    const eliminarProd = parseInt(req.params.pid, 10)
    const index = products.findIndex((product) => product.id === eliminarProd)
    
    if (index === -1){
        console.log('producto no encontrado')
        return res.status(404).json({error: 'Producto no encontrado'})
    }
    products.splice(index, 1);
    console.log('producto eliminado')
    res.json({message: 'Producto eliminado exitosamente'})
})


router.get("/", (req,res)=>{
    
    usuarios = [

        {
            name: "Administrador",
            role: "admin"
        },

        {
            name: "Usuario",
            role: "user"
        }
    ]

    const userRole = "user";
    const userObject = usuarios.find(user => user.role === userRole);
    
    res.render('index.handlebars', {
        user: {
            name: userObject.name,
            role: userRole
        }, 
        isAdmin: userRole === "admin",      
        products : products
    })
})


module.exports = router