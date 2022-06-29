//Se importa el paquete de XMLHTTPRequest debido a que estamos trabajando con Node y no con
//el browser. Es importante señalar que al usar Node de esta forma, se debe agregar a
//package.json las referencias necesarias bajo 'srcipts'
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const api = 'https://rickandmortyapi.com/api/character/'

function fetchData(url_api, callback) {
    let xhttp = new XMLHttpRequest()

    //Abrir o llamar a la url. El parámetro TRUE indica que se ejecutará de forma asíncrona
    xhttp.open('GET', url_api, true)

    //Cuando cambie el estado de la petición
    xhttp.onreadystatechange = function(event) {
        if(xhttp.readyState === 4) {
            if(xhttp.status === 200) {
                callback(null, JSON.parse(xhttp.responseText))
            }else {
                const error = new Error(`Error ${url_api}`)
                return callback(error, null)
            }
        }
    }
    xhttp.send()
}

fetchData(api, function(error1, data1) {
    if(error1) return console.error(error1)
    //Si no hubiera error, hago la petición al primer elemento de la api
    fetchData(api + data1.results[0].id, function(error2, data2) {
        if(error2) return console.error(error2)
        fetchData(data2.origin.url, function(error3, data3) {
            if(error3) return console.error(error3)
            console.log(data1.info.count)
            console.log(data2.name)
            console.log(data3.dimension)
        })
    })
})

// readyState Holds the status of the XMLHttpRequest.
// 0: request not initialized
// 1: server connection established
// 2: request received
// 3: processing request
// 4: request finished and response is ready
