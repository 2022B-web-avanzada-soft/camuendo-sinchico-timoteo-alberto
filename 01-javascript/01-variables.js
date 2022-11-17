//01-javascript
//  01-variables.js


//muteables (re asignadas) e inmtables

var numeroUno = 1;
let numeroDos = 2;

numeroUno = 3;
numeroDos = 5;
numeroUno = false;
numeroDos = true;

//Inmutables
const configuracionArchivos = 'PDF';
// configuracionArchivos = 'XML'

// Vamos a preferir  CONST > LET > NUNCA var!

// Tipos de variables (PRIMITIVAS)
const numero = 1; //number
const sueldo = 1.2; //number
const texto = "Hola Mundo" + 'Hola mundo'; //string
const boolean = true; //boolean
const hijos = null; //object
const zapatos = undefined; //undefined

console.log(typeof numero);
console.log(typeof sueldo);
console.log(typeof texto);
console.log(typeof boolean);
console.log(typeof hijos);
console.log(typeof zapatos);

if ("") {
    console.log("String vacio es verdadero")
} else {
    console.log("String vacio el falso")
}

//Una cadena de caracteres es vacio -> es falso

if (-1) {
    console.log(" negativos es verdadero")
} else {
    console.log("negativo el falso")
}

if (0) {
    console.log(" cero es verdadero")
} else {
    console.log(" cero el falso")
}

if (1) {
    console.log(" positivo es verdadero")
} else {
    console.log(" positivo el falso")
}

if (null) {
    console.log(" null es verdadero")
} else {
    console.log(" null esl falso")
}

if (undefined) {
    console.log(" undefined es verdadero")
} else {
    console.log(" undefined esl falso")
}

//Orden de importancia
// 1) const
// 2) let
// 3) var


const timoteo = {
    //lave:valor

    "nombre": "Timoteo",
    "apellido": "Camuendo",
    edad: 32,
    hijos: null,
    ropa: {
        color: 'plomo',
        talla: 'XL',
    },
    mascotas: ['Jefe', 'Tarzan']
}

console.log(timoteo);

timoteo.nombre;
timoteo["nombre"];

//cambiar valores
timoteo.nombre = "Alberto";
timoteo["nombre"] = "Timoteo";

// crear nuevos atributos o metodos dentro del objeto
timoteo.sueldo;
console.log(timoteo.sueldo); //undefined

timoteo.sueldo = 800;
console.log(timoteo.sueldo) //800

timoteo['gastos'] = 0.9;
console.log(timoteo.gastos); //0.9

console.log(timoteo);


//Borrar el valor de una propiedad
timoteo.nombre = undefined;
console.log(timoteo);
console.log(Object.keys(timoteo));
console.log(Object.values(timoteo));

//DELETE la llave y el valor dentro del objeto

delete timoteo.nombre; //Eliminar la llave "nombre"
console.log(Object.keys(timoteo));
console.log(timoteo)

// Variables pro valor o referencia?

//Variables por valor en JS son las primitivas: number, string, boolean

let edadTimoteo = 10;
let edadAlberto = edadTimoteo;

console.log(edadAlberto); //10
console.log(edadTimoteo); //10

edadTimoteo = edadTimoteo + 1;

console.log(edadAlberto); //10
console.log(edadTimoteo); //11

// Variables por referencia

let notas = {
    total: 10
};

let notasSegundoBimestre = notas; // igualando la referencia

notasSegundoBimestre.total = notasSegundoBimestre.total + 1

console.log(notas);
console.log(notasSegundoBimestre)

// Como clonar objetos

let notasTercerBimenester  = Object.assign({},notas)

notasTercerBimenester.total = notasTercerBimenester.total + 1;
console.log('notas', notas);
console.log('notasSegundoBimestre', notasSegundoBimestre)
console.log('notasTercerBimestre', notasTercerBimenester)





