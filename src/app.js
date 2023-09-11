const express = require("express")
const handlebars = require("express-handlebars")
const path = require("path")
const cartsRouter = require("./routes/api/carts.router")
const prodRouter = require("./routes/api/products.router")
const app = express()
const PORT = 8081

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine("handlebars", handlebars.engine())

app.set("views", __dirname+'/views')

app.set("view engine", "handlebars")

app.use(express.static(path.join(__dirname, "public")))

app.use("/", cartsRouter)
app.use("/", prodRouter)





app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})