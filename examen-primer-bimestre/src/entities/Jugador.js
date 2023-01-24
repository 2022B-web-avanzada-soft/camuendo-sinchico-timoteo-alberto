import {createRequire} from 'module';
import {FileManager} from '../repository/FileManager.js'
import {EquipoBasket} from "./EquipoBasket.js";

const path = '../repository/bd.txt'

const require = createRequire(import.meta.url);
const inquirer = require('inquirer');
const fileManager = new FileManager();


export class Jugador {
    constructor(nombre, altura, peso, fechaNacimiento, lesionado) {
        this.nombre = nombre;
        this.altura = altura;
        this.peso = peso;
        this.fechaNacimiento = fechaNacimiento;
        this.lesionado = lesionado;
    }

    async crear() {
        const jugador = new Jugador()
        try {
            await inquirer
                .prompt([
                    {type: 'input', name: 'nombre', message: 'Ingresa el nombre del jugador: '},
                    {type: 'input', name: 'altura', message: 'Ingresa la altura del jugador: '},
                    {type: "input", name: "peso", message: 'Ingresa el peso del jugador: '},
                    {type: "input", name: 'fechaNacimiento', message: 'Ingresa la fecha de nacimiento del jugador: '},
                    {type: 'input', name: 'lesionado', message: 'El juador esta lesionado?: Si o No'}
                ]).then(datos => {
                    return new Promise(resolve => (
                        jugador.nombre = datos.nombre,
                            jugador.altura = parseFloat(datos.altura),
                            jugador.peso = parseFloat(datos.peso),
                            jugador.fechaNacimiento = Date.parse(datos.fechaNacimiento),
                            jugador.lesionado = (datos.lesionado === 'Si'),
                            resolve(jugador)
                    ));
                });
        } catch (e) {
            console.log(e)
        }
        return jugador;
    }

    async editar() {
        let jugadorEditado = new Jugador()
        let nombre
        const jugadores = [];

        await fileManager.leer(path).then(
            contenido => {
                console.log("Editar")
                let equipo = contenido
                equipo.jugadores.forEach(jugador => {
                    jugadores.push(jugador)
                })
            }
        )
        console.log(jugadores)
        const nombreJugadores = []
        jugadores.forEach(jugador => {
            nombreJugadores.push(jugador.nombre)
        })
        try {
            nombre = await inquirer
                .prompt([
                    {
                        type: 'rawlist',
                        name: 'jugador',
                        message: 'Que jugador desea editar: ',
                        choices: nombreJugadores
                    }
                ]).then()

            console.log('Seleccionaste a: ' + nombre.jugador)

            for (jugadorEditado of jugadores) {
                if (jugadorEditado.nombre === nombre.jugador) {
                    try {
                        await inquirer
                            .prompt([
                                {type: 'input', name: 'nombre', message: 'Ingresa el nombre del jugador: '},
                                {type: 'input', name: 'altura', message: 'Ingresa la altura del jugador: '},
                                {type: "input", name: "peso", message: 'Ingresa el peso del jugador: '},
                                {
                                    type: "input",
                                    name: 'fechaNacimiento',
                                    message: 'Ingresa la fecha de nacimiento del jugador: '
                                },
                                {type: 'input', name: 'lesionado', message: 'El juador esta lesionado?: Si o No'}
                            ]).then(datos => {
                                return new Promise(resolve => (
                                    jugadorEditado.nombre = datos.nombre,
                                        jugadorEditado.altura = parseFloat(datos.altura),
                                        jugadorEditado.peso = parseFloat(datos.peso),
                                        jugadorEditado.fechaNacimiento = Date.parse(datos.fechaNacimiento),
                                        jugadorEditado.lesionado = (datos.lesionado === 'Si'),
                                        resolve(jugadorEditado)
                                ));
                            });
                    } catch (e) {
                        console.log(e)
                    }
                    break;
                }
            }

        } catch (e) {
            console.log(e)
        }
        return [nombre, jugadorEditado];
    }

    async eliminar() {
        let nombre
        const jugadores = [];

        await fileManager.leer(path).then(
            contenido => {
                let equipo = contenido
                equipo.jugadores.forEach(jugador => {
                    jugadores.push(jugador)
                })
            }
        )
        console.log(jugadores)
        const nombreJugadores = []
        jugadores.forEach(jugador => {
            nombreJugadores.push(jugador.nombre)
        })
        try {
            nombre = await inquirer
                .prompt([
                    {
                        type: 'rawlist',
                        name: 'jugador',
                        message: 'Que jugador desea eliminar: ',
                        choices: nombreJugadores
                    }
                ]).then()
            console.log('Seleccionaste a: ' + nombre.jugador)

        } catch (e) {
            console.log(e)
        }
        return nombre;
    }
}
