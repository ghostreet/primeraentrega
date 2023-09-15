const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const userData = require("./userData");

let userCartIds = {};

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

    try {
        // Verifica si el usuario ya tiene una cartId
        const cartProducts = userCartIds[cartId] || [];

        res.json({cartId, products: cartProducts});

        // Si el usuario no tiene una cartId, genera una nueva
        if (!userCartIds[cartId]) {
            const newCarId = generateCartId();
            userCartIds[newCarId] = [];
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos del usuario" });
    }
});

// Ruta para agregar un producto al carrito de un usuario
router.post("/api/cart/add/:cartId/:productId", (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const productId = parseInt(req.params.productId);

    try {
        // Verifica si el carrito ya existe para este usuario, si no, crea uno nuevo
        if (!userCartIds[cartId]){
            const newCartId = generateCartId();
            userCartIds[newCartId] = [];
        }

        const userCart = userCartIds[cartId]

        //busca si el producto ya está en el carrito del usuario
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

        res.render('index.handlebars, { cartId }');
        res.json({ message: 'Producto agregado correctamente', cartId });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar producto al carrito SERVER" });
    }
});

// Función para generar una cartId (puedes personalizarla según tus necesidades)
function generateCartId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

module.exports = router;