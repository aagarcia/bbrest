/**
 * archivo de rest de pesonajes
 */
const router = require('express').Router();
const verify = require('./verifyToken.js');
const axios = require('axios');

/**
 * Obtener los personajes aleatoriamente
 * El metodo responde lo siguiente
 * {
 *  nombre: 'nombre del personaje',
 *  edad: 'edad del personaje',
 *  personajesMuertos: 'Personajes que mato el personaje consultado en un array string'
 * }
 */
router.get('/', verify, (req, res) => {

    /**
     * con axios consumo los 2 servicios al mismo tiempo
     * para obtener la informacion que se necesita procesar
     */
    axios.all([
            axios.get('https://www.breakingbadapi.com/api/deaths'),
            axios.get('https://www.breakingbadapi.com/api/character/random')
        ])
        .then(responseArr => {
            death = responseArr[0].data;
            character = responseArr[1].data;
            let nombre = character[0].name;
            let listDeatch = [];

            /**
             * obtengo los nombres de los personajes
             * que mato el personaje consultado aleatoriamente
             */
            for (let i = 0; i < death.length; i++) {
                for (var exKey in death[i]) {
                    if (exKey === 'responsible') {
                        if (death[i][exKey] === nombre) {
                            listDeatch.push(death[i]['death']);
                        }
                    }
                }
            }

            /**
             * Calculo de la edad del personaje
             * la consulta devuelve una fecha
             * se la trata para que con el año actual de sus años que tiene
             * en cierto casos el campo fecha no tiene definido
             */
            let birthday = character[0].birthday;
            let fechaact = new Date();
            let edad = 0;

            if (birthday === null) {
                edad = 'Campo edad no tiene';
            } else {
                birthday = new Date(birthday);
                edad = fechaact.getFullYear() - birthday.getFullYear();
            }

            /**
             * respuesta del json con los datos solicitados
             */
            console.info('consulta exitosa');
            res.send({
                nombre: nombre,
                edad: edad,
                personajesMuertos: listDeatch
            });

        })
        .catch(function(error) {
            /**
             * en caso de error se envia status 400 con el error
             */
            console.error(error);
            res.status(400).send(error);
        });
});

module.exports = router;