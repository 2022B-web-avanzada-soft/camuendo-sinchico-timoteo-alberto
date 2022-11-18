const arreglo = [
    {
        id: 1,
        nombre: 'Adrian',
        nota: 5
    },
    {
        id: 2,
        nombre: 'Vicente',
        nota: 8
    },
    {
        id: 3,
        nombre: 'Carolina',
        nota: 14
    },
    {
        id: 4,
        nombre: 'Wendy',
        nota: 16
    },
    {
        id: 5,
        nombre: 'Andrea',
        nota: 19
    },
    {
        id: 6,
        nombre: 'Pamela',
        nota: 19
    },
    {
        id: 7,
        nombre: 'Cristian',
        nota: 20
    },
    {
        id: 8,
        nombre: 'Daniel',
        nota: 19
    },
    {
        id: 9,
        nombre: 'Lilly',
        nota: 14
    },
    {
        id: 10,
        nombre: 'Ramiro',
        nota: 12
    }
];

// FUNCIONES COMO PARAMETROS
// FIND
// enviamos una expresion -> TRUTY, FALSY
// devuelve el primero que cumpla esa condicion

const respuestaFind = arreglo
    .find(
        function (valorActual, indiceActual, arregloCompleto) {
            console.log('valor actual', valorActual);
            console.log('indice actual', indiceActual);
            console.log('arreglo completo', arregloCompleto);
            // return valorActual.nombre === "Cristian";
            return valorActual.nota < 12; // devuelve el primero que encuentre

        }
    );

console.log("Respuesta find: ", respuestaFind); // Si no encuentra devuelve undefined

// FINDINDEX
// enviamos una expresion -> TRUTY, FALSY
// devuelve el primero que cumpla esa condicion

const respuestaIndex = arreglo
    .findIndex(
        function (valorActual, indiceActual, arregloCompleto) {
            return valorActual.nombre === "Cristian"
        });
console.log("Respuesta findIndex: ", respuestaIndex); // Si no encuentra -> -1


//FOREACH
//itera el arreglo

const respuestaForEach = arreglo
    .forEach(
        function (valorActual, indiceActual, arregloCompleto) {
            console.log('valor actual: ', valorActual)
        }
    );

console.log("respuesta foreach: ", respuestaForEach); //undefined

//MAP modificar o Mutar el arreglo y devuelve un nuevo arreglo
// enviamos los datos del nuevo arreglo
// devuelve el nuevo arreglo

const respuestaMap = arreglo
    .map(
        (valorActual, indiceActual, arregloCompleto) => {
            const notaActual = valorActual.nota + 1;
            const nuevoElemento = {
                id: valorActual.id,
                nombre: valorActual.nombre,
                nota: notaActual,
                estaAprobado: notaActual > 14,
                casado: false,
            };
            return nuevoElemento;
        }
    );

console.log("respuesta map: ", respuestaMap)
console.log("arreglo", arreglo)

// FILTER
// enviamos EXPRESION TRUTY - FALSY
// devuelve los elelemtos que cumplen esa condicion

const respuestaFilter = arreglo
    .filter(
        (valorActual, indiceActual, arregloCompleto) => {
            return valorActual.nota >= 14
        }
    )

console.log("respuesta filter", respuestaFilter);
console.log("arreglo ", arreglo)

// SOME -> expresion
// devuelve booleano
// hay alguna nota menor a nueve? SI NO
// OR

const respuestaSome = arreglo

    .some(
        function (valorAcutal, indiceAcutal, arregloCompleto) {
            return valorAcutal.nota < 9;
        }
    );
console.log('Repuesta some: ', respuestaSome);


//EVERY -> expresion
// Devuelve booleano
// todas las notas son mayores a 14? SI NO
// AND

const respuestaEvery = arreglo
    .every(
        function (valorActual, indiceActual, arregloCompleto) {
            return valorActual.nota > 14;
        }
    );
console.log("Respuesta Every", respuestaEvery);

// REDUCE        izq -> der
// REDUCE RIGHT  der -> izq
// [1,2,3,5,6,5,4,3,1]
// 0 -> variable inicial - se puede modificar la varaible inicial
//OPERACION (*,+,-,/,%)
// 0 + 1
// 1 + 2
// 3 + 3
// RESTA
// 100 -> variable inicial
// 100 1 1
// 99 - 2
// 97 - 3
// 94


const respuestaReduce = arreglo
    .reduce(
        function (valorAcumulado, valorActual, indice, arregloCompleto) {
            return (valorAcumulado + valorActual.nota);
        },
        0 // acumulador
    )

console.log('Respuesta reduce: ', respuestaReduce) //146
console.log('Respuesta reduce: ', respuestaReduce / arreglo.length) //14,6


arreglo.filter((a) => a.nota < 14)
    .map((e) => e.nota + 100)
    .some((e) => e > 14);

console.log(arreglo.filter((a) => a.nota < 14)
    .map((e) => e.nota + 1)
    .some((e) => e > 14))