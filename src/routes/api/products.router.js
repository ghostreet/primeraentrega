const express = require("express")
const router = express.Router()

let products = [
    {id: 1, prod: "camara", price: 150000 },
    {id: 2, prod: "objetivo", price: 75000},
    {id: 3, prod: "tripode", price: 30000 },
    {id: 4, prod: "flash", price: 50000 },
    {id: 5, prod: "bateria", price: 10000},
]

router.get("/products", (req,res)=>{
    const limit = req.query.limit;
    if (limit && !isNaN(limit)) {
    const limite = parseInt(limit, 10);
    const numProd = products.slice(0,limite);
    res.json(numProd)
}else {
    res.json(products);
} 
})

router.get("/products/:id", (req,res)=>{
    const prodId = parseInt(req.params.id)
    const product = products.find((product)=> product.id === prodId)
    if (product) {
        res.json(product)
    }else {
        res.status(404).json({message: "producto no encontrado"})
    }
})

router.post("/products", (req,res)=>{
    const newProd = req.body
    products.push(newProd)
    res.json({message: "Producto agregado correctamente"})
})

router.get("/", (req,res)=>{
    let admUser={
        name: "Administrador",
        role: "admin"
    }
    res.render('index.handlebars', {
        user: admUser,
        isAdmin: admUser.role === "admin",
        products

    })
})


module.exports = router