const express = require("express");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override")
const cartsRouter = require('./routes/carts.router');
const prodRouter = require('./routes/products.router');
const userData = require('./routes/userData');
const user = userData;
const http = require('http')
const socketIo = require('socket.io')
const path = require('path')
const {Server} = require('socket.io');
const products = require("./routes/products");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+'/views');
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")))



io.on('connection', (socket)=>{
  console.log("nuevo cliente conectado")

    socket.emit('productos', products);

    socket.on('message', data =>{
      console.log(data)
    })
})




app.use("/", cartsRouter);
app.use("/", prodRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Hubo un error en el servidor');
  });

  app.get("/", (req, res) => {
    const userRole = user.role;
    const isAdmin = userRole === "admin";
  
    res.render('index.handlebars', {
      userId: user.id,
      user: {
        name: user.name,
        role: userRole
      },
      isAdmin: isAdmin,
    });
  });

  const PORT = process.env.PORT || 8080;
  server.listen(PORT,()=>{ 
   console.log(`Servidor ejecutandose en el puerto: ${PORT}`);
  });
