const express = require("express");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override")
const cartsRouter = require('./routes/carts.router');
const prodRouter = require('./routes/products.router');
const path = require('path')
const {Server} = require('socket.io');
const app = express();
const PORT = 8080


app.use(express.json());

const httpServer = app.listen(8080, ()=>console.log(`Servidor escuchando en el puerto ${PORT}`))

const socketServer = new Server(httpServer)

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine("handlebars", handlebars.engine());
app.use(express.static(path.join(__dirname, "public")))




socketServer.on('connection', (socket)=>{
  console.log("nuevo cliente conectado")
    socket.on('message', data => {
      console.log(data)
    })
})

app.set("views", __dirname+'/views');

app.set("view engine", "handlebars");
app.use(express.static(__dirname+'/public'));


app.use("/", cartsRouter);
app.use("/", prodRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Hubo un error en el servidor');
  });


