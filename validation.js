/**
 * Archivo de validacion del schema User
 */
const Joi = require('@hapi/joi');

/**
 * Validacion de registro del usuario
 */
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    console.info('Validacion de registro de usuario');

    return schema.validate(data);
};

/**
 * Validacion del login del usuario
 */
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    console.info('Validacion de login de usuario');

    return schema.validate(data);
};

/**
 * exports de las funciones para ser utilizadas
 */
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;