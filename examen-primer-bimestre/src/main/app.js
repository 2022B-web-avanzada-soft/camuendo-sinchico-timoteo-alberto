import {EquipoBasket} from '../entities/EquipoBasket.js'
import {FileManager} from '../repository/FileManager.js'

function main() {

    let equipoBasket = new EquipoBasket()
    let fileManager = new FileManager()
    const path = '../repository/bd.txt'

    equipoBasket.crear().then(
        equipoBasket => {
            console.log(equipoBasket)
            fileManager.escribir(path, equipoBasket).then(
                json => {
                    console.log(json)
                }
            )
        }
    )

}

main()