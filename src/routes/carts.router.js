const express = require("express");
const router = express.Router();
const userData = require("./userData");


const userCartIds = {};

// Ruta para obtener los datos del usuario
router.get("/userData", async (req, res) => {
    try {
        // userData contiene los datos exportados desde userData.js
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error: "Error al cargar la información del usuario" });
    }
});

// Ruta para obtener el carrito de un usuario
router.get("/api/cart/:cartId", (req, res) => {
    const cartId = req.params.cartId;
    const cartProducts = userCartIds[cartId] || [];

    res.json({ cartId, products: cartProducts})
});

// Ruta para agregar un producto al carrito de un usuario
router.post("/api/cart/add/:cartId/:productId", (req, res) => {
    const cartId = req.params.cartId;
    const productId = parseInt(req.params.productId)
    //console.log(`Solicitud POST recibida 1. cartId: ${cartId}, productId: ${productId}`);

    if (isNaN(productId)) {
        res.status(400).json({ error: "El productId no es un número válido" });
        return;
        
    }
    //console.log(`Solicitud POST recibida 2. cartId: ${cartId}, productId: ${productId}`);

    if (!userCartIds[cartId]) {
        userCartIds[cartId] = [];
    }

    try {

        if (!userCartIds[cartId]) {
            res.status(404).json({ error: "Carrito no encontrado" });
            return;
        }
        //console.log(`Solicitud POST recibida 3. cartId: ${cartId}, productId: ${productId}`);

        //busca si el producto ya está en el carrito del usuario
        const userCart = userCartIds[cartId]
        const prodInCart = userCart.find((item) => item.id === productId);

        if (prodInCart) {
            prodInCart.quantity++;
        } else {
            const prodAdd = {
                id: productId,
                quantity: 1
            };
            userCart.push(prodAdd);
        }
        
        //console.log(`Solicitud POST recibida 4. cartId: ${cartId}, productId: ${productId}`);
        res.json({ message: 'Producto agregado correctamente', cartId });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar producto al carrito SERVER" });
    }
});



module.exports = router;