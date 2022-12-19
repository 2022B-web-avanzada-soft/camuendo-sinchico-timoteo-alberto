const fs = require('fs');

function promesaEsPar(numero) { // f -> Promesa
    const miPrimerPromesa = new Promise( // es una clase que recibe una funcion como parametro
        (resolve, reject) => {
            /*
            reject(':('); //throw
            resolve(1); //return
             */
            if (numero % 2 === 0) {
                resolve(numero);
            } else {
                reject(':( no es par')
            }
        }
    );
    return miPrimerPromesa
}


function promesaElevarAlCuadrado(numero){
    return new Promise((res) => res(Math.pow(numero,2)))
}

promesaEsPar(4)
    .then(
        (data) => {
            console.log('DATA', data)
            return promesaElevarAlCuadrado(data)
        }
    ).then(
        (data) => {
            console.log('DATA', data)
            return promesaElevarAlCuadrado(data)
        }
    )
    .then(
        (data) => {
            console.log('DATA FINAL', data)
        }
    )
    .catch(
        (error) => {
            console.log('ERROR', error)
        }
    )
    .finally(
        () => {
            console.log('FINALLY')
        }
    )