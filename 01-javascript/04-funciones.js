function soloNumeros(a, b, c) {
    return a - b + c;
}


//sin return devolvemos: undefined
function soloLetras(a, b, c) {
    console.log(a, b, c)
}

//Funciones Anonimas -
const funcionSinNombre1 = function () {
};
var funcionSinNombre2 = function () {
};
let funcionSinNombre3 = function () {
};

[].forEach(function () {
    funcionSinNombre1();
    funcionSinNombre2();
    funcionSinNombre3();
})

//FAT ARROW > ANONIMAS

//funciones anonimas - fat arrow functions

const funcionFatArrow1 = () => {};
const funcionFatArrow2 = () => {};
const funcionFatArrow3 = () => {};

[].forEach(() => {
    funcionFatArrow1();
    funcionFatArrow2();
    funcionFatArrow3();
});

const funcionFatArrow4 = () => {};
const funcionFatArrow5 = (parametro) => {
    return parametro + 1;
}

const funcionFatArrow6 = (param) => param + 1; //unsa sola linea, omito return, omito llaves
const funcionFatArrow7 = param => param + 1; //solo si tenemos 1 parametro

const funcionFatArrow8 = (numUno, numDos, numTres) => numUno + numDos + numTres;

// ... => parametros infinitos => llegan en un arreglo de parametros
// solo ponedmos tener un parametros infinito por funcion

function sumarNumeros(...todosNumeros){
    // parametros infinitos [1,3,5,6,2,1,3]
    let total = 0;
    todosNumeros.forEach((valorAcutal) => {
        total = total + valorAcutal;
        }
    );
    return total;

    //return todosNumeros.reduce((a,v) => a + v, 0);
}

sumarNumeros(1,2,3,4,5,6);