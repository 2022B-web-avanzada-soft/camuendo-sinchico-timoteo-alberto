import {EquipoBasket} from '../entities/EquipoBasket.js'
import {FileManager} from '../repository/FileManager.js'
import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const inquirer = require('inquirer');
const path = '../repository/bd.txt'

let fileManager = new FileManager()
let equipoBasket = new EquipoBasket()

const equipos = []
const opcionesMenu = [
    'Listar Equipos de Basket',
    'Crear un Equipo',
    'Editar un Equipo',
    'Eliminar un Equipo',
    'Salir'
]


async function menu() {
    try {
        let opcion;
        do {
            opcion = await inquirer.prompt([
                {
                    type: 'rawlist',
                    name: 'opcion',
                    message: "=================== BIENVENIDO ==============",
                    choices: opcionesMenu
                }
            ]).then()

            if (opcion.opcion === opcionesMenu[0]) {
                await fileManager.leer(path).then(
                    data => console.log(data)
                )
            }

            if (opcion.opcion === opcionesMenu[1]) {
                await equipoBasket.crear().then(equipoBasket => {
                    equipos.push(equipoBasket);
                    console.log(equipos)
                })
                fileManager.escribir(path, equipos).then().catch(e => {console.log(e)})
            }


        } while (opcion.opcion !== opcionesMenu[4])
        {
            console.log("Hasta luego")
        }
    } catch (e) {
        console.log(e)
    }
}


async function main() {
    await menu()
}

await main()