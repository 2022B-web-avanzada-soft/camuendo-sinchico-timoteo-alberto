import {createRequire} from 'module';
import {FileManager} from "../repository/FileManager.js";

const require = createRequire(import.meta.url);
const inquirer = require('inquirer');
const fileManager = new FileManager()
const path = '../repository/bd.txt'

export class EquipoBasket {
    constructor(nombre, numeroPartidosJugados, fechaCreacion, profesional, jugadores) {
        this.nombre = nombre;
        this.numeroPartidosJugados = numeroPartidosJugados;
        this.fechaCreacion = fechaCreacion;
        this.profesional = profesional;
        this.jugadores = jugadores;
    }

    async crear() {
        const equipoBasket = new EquipoBasket()
        try {
            await inquirer
                .prompt([
                    {type: 'input', name: 'nombre', message: 'Ingresa el nombre del equipo: '},
                    {type: 'input', name: 'numeroPartidosJugados', message: 'Ingresa el numero de partido jugados: '},
                    {type: "input", name: "fechaCreacion", message: 'Ingresa la fecha de creacion del equipo: '},
                    {type: "input", name: 'profesional', message: 'Es un equipo profesional Si o No: '},
                ]).then(datos => {
                    return new Promise(resolve => (
                        equipoBasket.nombre = datos.nombre,
                            equipoBasket.numeroPartidosJugados = parseInt(datos.numeroPartidosJugados),
                            equipoBasket.fechaCreacion = Date.parse(datos.fechaCreacion),
                            equipoBasket.profesional = (datos.profesional === 'Si'),
                            equipoBasket.jugadores = [],
                            resolve(equipoBasket)
                    ));
                });
        } catch (e) {
            console.log(e)
        }
        return equipoBasket
    }

    async editar() {

        let nombre
        const equipos = [];

        await fileManager.leer(path).then(
            contenido => {
                let equipo = contenido
                equipos.push(equipo)
            })

        const nombresEquipos = [];
        equipos.forEach(equipo => {nombresEquipos.push(equipo.nombre)})


        let equipoBasketEditado = new EquipoBasket()

        try {
            nombre = await inquirer
                .prompt([
                    {
                        type: 'rawlist',
                        name: 'equipo',
                        message: 'Que equipo desea editar: ',
                        choices: nombresEquipos
                    }
                ]).then()
            console.log('Seleccionaste a: ' + nombre.equipo)

        } catch (e) {
            console.log(e)
        }

        try {
            await inquirer.prompt([
                {type: 'input', name: 'nombre', message: 'Ingresa el nombre del equipo: '},
                {type: 'input', name: 'numeroPartidosJugados', message: 'Ingresa el numero de partido jugados: '},
                {type: "input", name: "fechaCreacion", message: 'Ingresa la fecha de creacion del equipo: '},
                {type: "input", name: 'profesional', message: 'Es un equipo profesional Si o No: '},
            ]).then(datos => {
                return new Promise(resolve => (
                    equipoBasketEditado.nombre = datos.nombre,
                        equipoBasketEditado.numeroPartidosJugados = parseInt(datos.numeroPartidosJugados),
                        equipoBasketEditado.fechaCreacion = Date.parse(datos.fechaCreacion),
                        equipoBasketEditado.profesional = (datos.profesional === 'Si'),
                        equipoBasketEditado.jugadores = [],
                        resolve(equipoBasketEditado)
                ));
            });
        } catch (e) {

        }
        return equipoBasketEditado
    }

    async eliminar() {
        let nombre
        const equipos = [];

        await fileManager.leer(path).then(
            contenido => {
                let equipo = contenido
                equipos.push(equipo)
            })

        const nombresEquipos = [];
        equipos.forEach(equipo => {nombresEquipos.push(equipo.nombre)})

        try {
            nombre = await inquirer
                .prompt([
                    {
                        type: 'rawlist',
                        name: 'equipo',
                        message: 'Que equipo desea eliminar: ',
                        choices: nombresEquipos
                    }
                ]).then()
            console.log('Seleccionaste a: ' + nombre.equipo)

        } catch (e) {
            console.log(e)
        }

        await fileManager.escribir(path,'');
    }

}
