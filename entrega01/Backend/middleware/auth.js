//Midleware de Autenticacion
const auth = rol => {
    return (req, res ,next) => {
        if (rol) {
            next()
        } else {
            res.status(403).json({
                error: -1 ,
                descripcion: `Route: ${req.baseurl}`
            })
        }
    }
}
// Exporta módulo
module.exports = auth;