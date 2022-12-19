const fs = require('fs');

/*
* Una funcion que acepte com parametro una variable
* del 'path' del archivo y otra variable con el 'contenidoArchivo'
* Utilizar el modulo 'fs' para leer el archivo en 'path' y anadir el
* 'contenidoArchivo' a ese archivo
 */

function leerArchivo(path) {
    return new Promise(
        (res) => {
            fs.readFile(
                path,
                'utf-8', //codificacion
                (errorLectura, contenido) => { // callback
                    if (errorLectura) {
                        console.error("ERROR LEYENDO ARCHIVO", errorLectura);
                    } else {
                        console.log(contenido)
                        res(contenido)
                    }
                }
            )
        }
    );
}

function escribirArchivo(path, contenidoEscribir) {
    return new Promise(
        (rej) => {
            fs.writeFile(
                path,
                contenidoEscribir,
                (errorEscritura) => {
                    rej(errorEscritura)
                }
            );
        }
    );
}

function ejercicio08(path, contenidoArchivo) {
    return leerArchivo(path)
        .then((data) => {
            return escribirArchivo(path, data + contenidoArchivo)
        })
}

ejercicio08('06-ejemplo.txt', 'Lo logramos!')
    .then()
    .catch()