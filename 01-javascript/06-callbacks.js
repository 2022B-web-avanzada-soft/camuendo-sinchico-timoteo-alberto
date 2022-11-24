const fs = require('fs'); // file sustem

// 06-ejemplo.txt -> Hola
console.log('PRIMERO');

`fs.readFile(
    './06-ejemplo.txt',
    'utf-8', //codificacion
    (errorLecturaPrimerArchivo, contenidoPrimerArchivo) => { // callback
        if (errorLecturaPrimerArchivo) {
            console.error("ERROR LEYENDO ARCHIVO", errorLecturaPrimerArchivo);
        } else {
            console.log('Contenido: ', contenidoPrimerArchivo);
        }
    }
)
`
console.log('TERCERO');

// EJERCICIO

let contenido;

// 1) leer archivo: 06-ejemplo.txt
fs.readFile(
    './06-ejemplo.txt',
    'utf-8', //codificacion
    (errorLecturaPrimerArchivo, contenidoPrimerArchivo) => { // callback
        if (errorLecturaPrimerArchivo) {
            console.error("ERROR LEYENDO ARCHIVO", errorLecturaPrimerArchivo);
        } else {
            contenido = contenidoPrimerArchivo.toString();
            console.log('Contenido: ', contenidoPrimerArchivo);
            fs.readFile(
                './01-variables.js',
                'utf-8', //codificacion
                (errorLecturaPrimerArchivo, contenidoPrimerArchivo) => { // callback
                    if (errorLecturaPrimerArchivo) {
                        console.error("ERROR LEYENDO ARCHIVO", errorLecturaPrimerArchivo);
                    } else {
                        contenido += contenidoPrimerArchivo.toString();
                        console.log('Contenido: ', contenidoPrimerArchivo);
                        fs.writeFile(
                            './06-nuevo-archivo.txt',
                            contenido,
                            (errorEscritura) => {
                            }
                        );
                    }
                }
            )
        }
    }
)

// 2) leer archivo: 01-variables.js

// 3) crear un archivo llamado 06-nuevo-archivo.txt


