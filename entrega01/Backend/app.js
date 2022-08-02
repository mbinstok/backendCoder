const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

const routeProducts = require('./routes/productosRoutes');
const routeCart = require('./routes/carritosRoutes');

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))  

// Rutas
app.use('/api/productos', routeProducts);
app.use('/api/carrito', routeCart);


app.get('*', function(req, res){
    res.sendFile(__dirname+'/public/error.html');
    }
);
// Middleware de error 
app.use((err, req, res, next) => {
    res.status(500).send({error: err.message});
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))