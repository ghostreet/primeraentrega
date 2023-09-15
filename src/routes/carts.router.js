const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");
const userData = require("./userData");


const cartIdsFilePath = path.join(__dirname, "./routes/cartIds.json");

// Ruta para obtener los datos del usuario desde userData.js
router.get("/api/userData", async (req, res) => {
    try {
        // userData contiene los datos exportados desde userData.js
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error: "Error al cargar la información del usuario" });
    }
});
async function loadCartIds() {
    try {
        const data = await fs.readFile(cartIdsFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        // Si el archivo no existe o hay un error al leerlo, retorna un objeto vacío
        return {};
    }
}
async function saveCartIds(cartIds) {
    try {
        await fs.writeFile(cartIdsFilePath, JSON.stringify(cartIds, null, 2), "utf-8");
    } catch (error) {
        console.error("Error al guardar las cartIds:", error);
    }
}


// Estructura para mantener los carritos en memoria
let userCartIds = {};

// Ruta para obtener el carrito de un usuario o renderizar la vista
router.get("/api/cart/:userId", async (req, res) => {
    const userId = req.params.userId;
    console.log(userId)

    try {
        // Verifica si el usuario ya tiene una cartId
        let cartId = userCartIds[userId];

        // Si el usuario no tiene una cartId, genera una nueva
        if (!cartId) {
            // Asigna la cartId al usuario y guárdala en el archivo
            const cartIds = await loadCartIds();
            cartId = cartIds[userId];

            if (!cartId) {
                cartId = generateCartId();
                cartIds[userId] = cartId;
                await saveCartIds(cartIds);
        }
        userCartIds[userId] = cartId;
    }

        res.render('index.handlebars', {
            user: {
               
                name: "Nombre del usuario",
                role: "user"
            },
            isAdmin: false, // Cambiar a false si es un usuario normal
            products: []
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos del usuario" });
    }
});

// Ruta para agregar un producto al carrito de un usuario
router.post("/api/cart/add/:userId/:productId", (req, res) => {
    const userId = req.params.userId;
    const productId = parseInt(req.params.productId);

    try {
        // Verifica si el carrito ya existe para este usuario, si no, crea uno nuevo
        if (!userCarts[userId]) {
            userCarts[userId] = [];
        }

        // Busca si el producto ya está en el carrito del usuario
        const prodInCart = userCarts[userId].find((item) => item.id === productId);

        if (prodInCart) {
            prodInCart.quantity++;
        } else {
            const prodAdd = {
                id: productId,
                quantity: 1
            };
            userCarts[userId].push(prodAdd);
        }

        res.json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar producto al carrito SERVER" });
    }
});

module.exports = router;