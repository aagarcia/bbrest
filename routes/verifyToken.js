/**
 * Middleware para la validacion del token de acceso
 */
const jwt = require('jsonwebtoken');

/**
 * funcion Middleware para validacion del token de acceso
 */
module.exports = function(req, res, next) {

    /**
     * lee el token que viene en el header
     */
    const token = req.header('auth-token');

    if (!token) {
        console.error('Acceso denegado');
        return res.status(401).send('Acceso denegado');
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        console.info('Acceso exitoso');
        next();
    } catch (err) {
        console.error(err);
        res.status(400).send('Token Invalido');
    }
}