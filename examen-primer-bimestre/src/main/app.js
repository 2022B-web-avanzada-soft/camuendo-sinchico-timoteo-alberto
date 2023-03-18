import {EquipoBasket} from '../entities/EquipoBasket.js'
import {FileManager} from '../repository/FileManager.js'
import {createRequire} from 'module';
import {Jugador} from "../entities/Jugador.js";

const require = createRequire(import.meta.url);
const inquirer = require('inquirer');
const path = '../repository/bd.txt'

let fileManager = new FileManager()
let equipoBasket = new EquipoBasket()
let jugador = new Jugador()

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

            //listar
            if (opcion.opcion === opcionesMenu[0]) {
                await fileManager.leer(path).then(
                    data => {
                        console.log(data)
                    }
                )
            }

            //crear
            if (opcion.opcion === opcionesMenu[1]) {
                await equipoBasket.crear().then(async equipoBasket => {
                    let numJugadores;
                    numJugadores = await inquirer.prompt([{
                        type: 'input',
                        name: 'num',
                        message: 'Cunatos jugadores tiene el basketball-team: '
                    }]).then()
                    while (numJugadores.num > 0) {
                        console.log('Ingrese la informacion del Jugador No. ' + numJugadores.num)
                        await jugador.crear().then(
                            async jugador => {
                                equipoBasket.jugadores.push(jugador)
                                await fileManager.escribir(path, equipoBasket)
                            }
                        )
                        numJugadores.num--;
                    }
                    console.log("Equipo creado correctamente")
                    await fileManager.leer(path)
                })
            }

            //editar
            if (opcion.opcion === opcionesMenu[2]) {

                let nombre
                const equipos = [];
                await fileManager.leer(path).then(
                    contenido => {
                        let equipo = contenido
                        equipos.push(equipo)
                    })
                const nombresEquipos = [];
                equipos.forEach(equipo => {
                    nombresEquipos.push(equipo.nombre)
                })
                let equipoBasketEditado = new EquipoBasket()
                try {
                    nombre = await inquirer
                        .prompt([
                            {
                                type: 'rawlist',
                                name: 'equipo',
                                message: 'Que basketball-team desea editar: ',
                                choices: nombresEquipos
                            }
                        ]).then()
                    console.log('Seleccionaste a: ' + nombre.equipo)

                } catch (e) {
                    console.log(e)
                }

                let respuesta = await inquirer.prompt([{
                    type: "rawlist",
                    name: "opcion",
                    message: "Que deseas editar",
                    choices: ['Editar el basketball-team', 'Editar un jugador', 'Agregar un jugador', 'Eliminar un jugador']
                }]).then()

                if (respuesta.opcion === 'Editar el basketball-team') {
                    let equipo;
                    const jugadores = [];
                    await fileManager.leer(path).then(
                        contenido => {
                            equipo = contenido
                            equipo.jugadores.forEach(jugador => {
                                jugadores.push(jugador)
                            })
                        }
                    )

                    let equipoBasketEditato = await equipoBasket.editar().then()
                    equipoBasketEditato.jugadores = jugadores;
                    await fileManager.escribir(path, equipoBasketEditato);
                    console.log('Equipo editado correctamente')

                }
                if (respuesta.opcion === 'Agregar un jugador') {
                    let equipo;
                    const jugadores = [];
                    await fileManager.leer(path).then(
                        contenido => {
                            equipo = contenido
                            equipo.jugadores.forEach(jugador => {
                                jugadores.push(jugador)
                            })
                        }
                    )
                    let nuevoJugador = await jugador.crear().then()
                    jugadores.push(nuevoJugador);
                    equipo.jugadores = jugadores;
                    await fileManager.escribir(path, equipo);
                    console.log('Jugador agregado correctamente')
                }

                if (respuesta.opcion === 'Editar un jugador') {
                    let equipo;
                    const jugadores = [];
                    await fileManager.leer(path).then(
                        contenido => {
                            equipo = contenido
                            equipo.jugadores.forEach(jugador => {
                                jugadores.push(jugador)
                            })
                        }
                    )
                    let [nombre, jugadorEditado] = await jugador.editar().then()
                    const nombreAEliminar = Object.values(nombre)[0];
                    const jugadoresEdit = jugadores.filter((jugador) => jugador.nombre !== nombreAEliminar)

                    jugadoresEdit.push(jugadorEditado)
                    equipo.jugadores = jugadoresEdit;
                    await fileManager.escribir(path, equipo).then()
                    await fileManager.leer(path)
                    console.log('Jugador editado correctamente')
                }

                if (respuesta.opcion === 'Eliminar un jugador') {
                    let equipo;
                    const jugadores = [];
                    await fileManager.leer(path).then(
                        contenido => {
                            equipo = contenido
                            equipo.jugadores.forEach(jugador => {
                                jugadores.push(jugador)
                            })

                        }
                    )
                    let nombre = await jugador.eliminar().then()
                    const nombreAEliminar = Object.values(nombre)[0];
                    const jugadoresEdit = jugadores.filter((jugador) => jugador.nombre !== nombreAEliminar)
                    equipo.jugadores = jugadoresEdit

                    await fileManager.escribir(path, equipo).then()
                    await fileManager.leer(path)
                    console.log('Jugador eliminado correctamente')
                }


            }

            if (opcion.opcion === opcionesMenu[3]) {
                await equipoBasket.eliminar().then()
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