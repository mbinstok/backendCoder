const express =  require('express')
const errorRoutes = express.Router()

const responseError = (req, res) => {
    res.send({ error : -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` })
}

// Rutas de error
errorRoutes
    .get('*', responseError)
    .post('*', responseError)
    .delete('*', responseError)
    .put('*', responseError)

// Módulos exportados
module.exports = errorRoutes