// Destructuraion de Objetos

const adrian ={
    nombre: "Adrian",
};

const carolina = {
    nombre: "Carolina",
    apellido: "Eguez",
};

const adrianCarolina = { // crea una nueva referencia (valor)
    ...carolina,
    ...adrian,
}

console.log("adrianCarolina", adrianCarolina)

//Destructuracion de arreglos
const arregloUno = [1,2,3,4,5]
const arregloDos = [6,7,8,9,10]
const superArreglo = [
    ...arregloUno,
    ...arregloDos,
];
console.log('Super arreglo: ',superArreglo)