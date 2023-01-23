import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const inquirer = require('inquirer');

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
}
