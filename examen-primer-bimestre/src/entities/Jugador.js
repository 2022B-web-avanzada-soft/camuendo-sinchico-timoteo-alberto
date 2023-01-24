import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const inquirer = require('inquirer');

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
}
