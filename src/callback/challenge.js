// instanciamos el XML Sx: require('nombre_consola').nombre_archivo;
// guardo en la variable el valor del archivo XMLHttpRequest
let request = require("xmlhttprequest").XMLHttpRequest;

// API, guardamos la api en una variable 
const API = 'https://rickandmortyapi.com/api/character/';

// funcion que nos permite traer la informacion desde nuestra API, recibe un callback y desencadena los llamados que necesitamos.
function fetchData(url_api, callback) {
    // construimos la peticion por xmlhttprequest generando la referencia al objeto que necesito
    let datos = new request();
    // hacemos el llamado a una url 
    datos.open('GET', url_api, true); /* el true activa el asincronismo  */
    // escucho lo que hace la conexion 
    datos.onreadystatechange = function (e) {
        // validamos para saber si fue exitoso todo
        if (datos.readyState === 4) {
            // saber el status 
            if (datos.status === 200) {
                // regresamos el callback si todo sale bien, responseText me lo convierte de object a string
                callback(null, JSON.parse(datos.responseText));
            } else { /* si las cosas no salen bien le pasamos la url y el estado */
                const error = new Error('Error' + url_api + ' paso esto: ' + datos.status);
                // al final retornamos el callback con un msj de error y un null ya que no se desencadena nada 
                return callback(error, null);
            }
        }
    }
    // enviamos la solicitud con send().
    datos.send();
}

// readyState Holds the status of the XMLHttpRequest.
// 0: request not initialized
// 1: server connection established
// 2: request received
// 3: processing request
// 4: request finished and response is ready