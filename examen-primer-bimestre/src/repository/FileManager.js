import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const fs = require('fs');
const equipos = []
export class FileManager {

    async leer(path) {

        return await new Promise(
            (resolve, reject) => {
                fs.readFile(
                    path,
                    'utf-8',
                    (errorEnLectura,
                     contenidoArchivo) => {
                        if (errorEnLectura) {
                            reject('Error leyendo archivo');
                        }
                        if( contenidoArchivo === ''){
                            resolve('')
                        }
                        resolve(contenidoArchivo)
                    }
                );
            }
        )
    }

    async escribir(path, contenido) {
        return await new Promise(
            (resolve, reject) => {
                fs.writeFile(
                    path,
                    JSON.stringify(contenido.toString()),
                    (errorEscritura) => {
                        if (errorEscritura) {
                            reject('Error escribiendo archivo');
                        }
                        resolve("Escrito correctamente");
                    }
                );
            }
        )
    }
}
