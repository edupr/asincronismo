let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();

        //Abrir o llamar a la url. El parámetro TRUE indica que se ejecutará de forma asíncrona
        xhttp.open('GET', url_api, true)
    
        //Cuando cambie el estado de la petición
        xhttp.onreadystatechange = (() => {
            if(xhttp.readyState === 4) {

                (xhttp.status === 200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error ', url_api))
            }
        });
        xhttp.send();
    });
}

module.exports = fetchData;