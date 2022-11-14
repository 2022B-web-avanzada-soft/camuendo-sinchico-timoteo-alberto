//01-javascript
//  01-variables.js


//muteables (re asignadas) e inmtables

var numeroUno = 1;
let numeroDos =2;

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