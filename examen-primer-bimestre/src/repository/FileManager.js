import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const fs = require('fs');

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
                    JSON.stringify(contenido),
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
