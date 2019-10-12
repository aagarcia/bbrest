/**
 * archivo de registro y login de usuario
 */
const router = require('express').Router();
const User = require('../model/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation.js');


/**
 * Registro de usuario
 * Se envie un JSON de la siguiente forma
 * {
 *  'name': 'usuario',
 *  'email': 'usuario@correo.com',
 *  'password': '123456'
 * }
 */
router.post('/register', async(req, res) => {

    /**
     * proceso de validacion del JSON enviado
     */
    const validation = registerValidation(req.body);

    if (validation.error !== undefined) {
        console.error('Error de validacion del JSON');
        return res.status(400).send(validation.error.details[0].message);
    }


    /**
     * verifica que el correo enviado ya esta registrado
     */
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
        console.error('Error de validacion de correo existente');
        return res.status(400).send('Email realmente existe en la BD');
    }

    /**
     * Encriptacion del password para ser guardo en la base de datos
     */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    /**
     * inicializamos el Schema
     */
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    /**
     * se graba en el MongoDB
     * en el caso de error respondera un status 400 con el error indicado
     */
    try {
        console.info('Usuario registrado');
        const savedUser = await user.save();
        res.send({
            user: user._id
        });
    } catch (err) {
        console.error('Error al registrar el usuario');
        res.status(400).send(err);
    }
});

/**
 * Login de usuario
 * Se envie un JSON de la siguiente forma
 * {
 *  'email': 'usuario@correo.com',
 *  'password': '123456'
 * }
 */
router.post('/login', async(req, res) => {

    /**
     * proceso de validacion del JSON enviado
     */
    const validation = loginValidation(req.body);
    if (validation.error !== undefined) {
        console.error('Error de validacion del JSON');
        return res.status(400).send(validation.error.details[0].message);
    }

    /**
     * Varifica si el usuario es el mismo de la base
     */
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        console.error('Error de Email o Password');
        return res.status(400).send('Email o Contraseña incorrecta');
    }

    /**
     * Valida el password enviado con el de la base
     */
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        console.error('Error de Email o Password');
        return res.status(400).send('Email o Contraseña incorrecta');
    }

    /**
     * Crea y asigna un token para acceder a las otras opciones
     */
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET);

    /**
     * envio el token para ser usado en las otras opciones
     */
    console.info('usuario logeado y token enviado');
    res.header('auth-token', token).send({
        token: token
    });

});

module.exports = router;