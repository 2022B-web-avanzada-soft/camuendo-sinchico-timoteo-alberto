import {useEffect, useState} from "react";
import io from "socket.io-client";
import Head from "next/head";
import Image from "next/image";

const servidor = "http://localhost:8086";
const socket = io(servidor);


export interface Temperatura {
    id: number;
    dia: string;
    fechaDia: number;
    temperatura: number;
}

const arrayTemperatura: Temperatura[] = [
    {
        id: 1,
        dia: "Lunes",
        fechaDia: 20,
        temperatura: 0
    },
    {
        id: 2,
        dia: "Martes",
        fechaDia: 21,
        temperatura: 0
    },
    {
        id: 3,
        dia: "Miércoles",
        fechaDia: 22,
        temperatura: 0
    },
    {
        id: 4,
        dia: "Jueves",
        fechaDia: 23,
        temperatura: 0
    },
    {
        id: 5,
        dia: "Viernes",
        fechaDia: 24,
        temperatura: 0
    },

]


export default function () {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [temperaturas, setTemperaturas] = useState(arrayTemperatura)

    useEffect(
        () => {
            socket.on('connect', () => {
                setIsConnected(true);
                console.log('Conectado');
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log('Desconectado');
            });
            socket.on(
                'escucharEventoCambiarValorTemperatura', (data: { temperatura: Temperatura, nuevoValor: number }) => {
                    console.log('escucharEventoCambiarValorTemperatura: ', data);
                    const temperatura = temperaturas.find((temperatura) => temperatura.id === data.temperatura.id);
                    if (temperatura) {
                        temperatura.temperatura = data.nuevoValor;
                        setTemperaturas([...temperaturas])
                    }
                }
            )
        }
    );


    const cambiarValorTemperatura = (temperatura: Temperatura, variacion: number) => {
        const nuevoValor = temperatura.temperatura + variacion;
        socket.emit(
            'cambiarValorTemperatura',
            {temperatura, nuevoValor},
            (data: Temperatura) => {
                console.log('cambiarValorTemperatura: ', data);
                temperatura.temperatura = nuevoValor;
                setTemperaturas([...temperaturas])
            }
        )
    }

    return (
        <>
            <Head>
                <title>{"Clima de quito"}</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <h1 className={"h1"}>
                Cambio de Clima de Quito en Tiempo Real
            </h1>
            <h3 className={"h5"}>
                Conexión en tiempo real: {isConnected ? 'Conectado' : 'Desconectado'}
            </h3>
            <div className="d-flex justify-content-center mt-5 pt-3">
                <Image
                    src="/clima.png"
                    alt="13"
                    width={180}
                    height={150}
                    priority
                />
            </div>
            <div className="d-flex justify-content-center align-items-center container mt-5">
                <table className="table table-bordered text-center">
                    <thead className="table">
                    <tr>
                        <th>Día</th>
                        <th>Temperatura
                        </th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {temperaturas.map((temperatura) => (
                        <tr key={temperatura.id}>
                            <td className={"text"}>{temperatura.dia} ({temperatura.fechaDia})</td>
                            <td className={"text"}>{temperatura.temperatura}°</td>
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex align-items-center flex-column pe-5 '>
                                    <button className="btn btn-danger btn-lg me-2 w-25 rounded-circle"
                                            onClick={() => cambiarValorTemperatura(temperatura, -5)}>
                                        -
                                    </button>
                                    <span className="text-muted pe'4">Disminucion de temperatura</span>
                                </div>
                                <div className='d-flex align-items-center flex-column '>
                                    <button className="btn btn-success btn-lg w-25 rounded-circle"
                                            onClick={() => cambiarValorTemperatura(temperatura, 5)}>
                                        +
                                    </button>
                                    <span className="text-muted">Aumento de temperatura</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}