// inquirer


const inquirer = require('inquirer');

async function main() {
    try {
        const respuesta = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'nombre',
                    message: 'Ingresa tu nombre'
                },
                {
                    type: 'input',
                    name: 'edad',
                    message: 'Ingresa tu edadti'
                }
            ]);
        console.log("Respuesta: ", respuesta)
    } catch (e) {
        console.log(e)
    }
}

main();
