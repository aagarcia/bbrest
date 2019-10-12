# Test Tecnico Programador NodeJS

[![N|Solid](http://esagaweb.com/images/favicon.ico)](http://esagaweb.com)

Api REST usando NodeJS, Express y MondoDB.
La idea es crear un API para login, registro y consulta de personaje de Breaking Back.

# Tabla de contenido
* [Registro](#Registro)
* [Login](#Login)
* [Personaje](#Personaje)
* [Instalacion](#Instalacion)


# Registro
Para la parte del registro se pide los siguientes datos en la forma del JSON expuesto.

```json
{
    "name": "usuario",
    "email": "usuario@correo.com",
    "password": "password"
}
```

Este JSON en el postman se lo pone en la pestaña *Body* del request *Registro*.

# Login

Para la parte del *Login* se pide los siguientes datos en la forma del JSON expuesto.

```json
{
    "email": "usuario@correo.com",
    "password": "password"
}
```

Este JSON en el postman se lo pone en la pestaña *Body* del request *Login*. Al responder el servicio da el *token* para poder acceder al servicio de *Personaje*, sin ese *token* no se tiene, no se puede acceder al servicio de [Personaje](#Personaje). Ademas en la pestaña *Test* del Postman se programo para que el token se setee de forma global para que el servicio de [Personaje](#Personaje) tome esa variable para poder consultar el servicio.

# Personaje

Para la parte del servicio del personaje se debe tener el *token* que fue generado en el servicio de [Login](#Login), porque de esta forma podra realizar la consulta de este servicio. Sin este *token* no tiene acceso al mismo. Toma el *token* de la configuracion global del Postman.

La respuesta del servicio es un JSON de la siguiente forma.

```json
{
    "nombre": "personaje",
    "edad": "edad del personaje",
    "personajesMuertos": [
        "Personaje que mato 1",
        "...",
        "Personaje que mato n"
    ]
}
```

# Instalacion

Para instalacion del proyecto localmente se baja el archivo zip del proyecto o se clona el repositorio del proyecto.

Para inicializar se procede con el siguiente comando.

```
npm install
```

Despues de la instalacion de los paquetes necesarios se procede con la configuracion del archivo `.env` para la configuracion del proyecto este archivo esta en [directorio](https://github.com/aagarcia/bbrest/.env). El campo `TOKEN_SECRET` debe ser configurado para la generacion del *token*.

Luego de la configuracion del archivo se procede con la ejecucion del servicio.

```
npm start
```