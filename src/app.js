const express = require("express");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override")
const cartsRouter = require('./routes/carts.router');
const prodRouter = require('./routes/products.router');
const app = express();
const PORT = 8080


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine("handlebars", handlebars.engine());



app.set("views", __dirname+'/views');

app.set("view engine", "handlebars");
app.use(express.static(__dirname+'/public'));


app.use("/", cartsRouter);
app.use("/", prodRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Hubo un error en el servidor');
  });


app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

