let arreglo = [6, 7, 8, 9];
arreglo  = 1;
arreglo  = true;
arreglo = [6, 7, 8, 9];

//for of
for (let numero of arreglo){
    console.log('numero', numero);
}
//for in -> indices

for (let indice in arreglo){
    arreglo[indice];
    console.log('indice', indice)
}

let objetoPrueba  = {a: '1', b:'2', c:'3'}

for (let llave in objetoPrueba){
    console.log('llave', llave)
}

arreglo.push(11);
arreglo.pop(); //elimina al final
arreglo.unshift(5); // anadir al principio del arreglo

arreglo.splice(0,0,8);
//splice(indice, numero de elementos aliminados, ...items a agreagr)
console.log(arreglo)

const indiceNueve  = arreglo.indexOf(9); //ecuentra el primer elemento
arreglo.splice(indiceNueve, 2);
console.log(arreglo)