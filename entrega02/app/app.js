// Curso Backend Coderhouse
// Comisión 31015
// Alumno: Miguel Binstok
// Segunda Entrega del Proyecto Final

const express = require('express')
const app = express()

const routesProductos = require('./routers/productos')
const routesCarritos = require('./routers/carritos')

app.use(express.json())
app.use('/api/productos', routesProductos)
app.use('/api/carritos', routesCarritos)


module.exports = app