// i_websockets.tsx

import io from "socket.io-client"
import {useEffect, useState} from "react";
import MensajeChat, {MenajeChatProps} from "../components/i_websockets/MensajeChat";
import {useForm} from "react-hook-form";
import Layout from "../components/Layout";

const servidorWebsocket = 'http://localhost:8080';
const socket = io(servidorWebsocket);

export default function () {

    const [isConnected, setIsConnected] = useState(socket.connected)
    const [mensajes, setMensajes] = useState([] as MenajeChatProps[]);

    const {control, register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            salaId: '',
            nombre: '',
            mensaje: '',
        },
        mode: 'all'
    })

    useEffect(
        () => {

            socket.on('connect', () => {
                setIsConnected(true);
                console.log("Si esta conectado");
            });

            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log("No esta conectado");
            });

            socket.on('escucharEventoHola', (data: { mensaje: string }) => {
                console.log('escucharEventoHola');
                const nuevoMensaje: MenajeChatProps = {
                    mensaje: data.mensaje,
                    nombre: 'Sistema',
                    posicion: 'I'
                };
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje])
            })

            socket.on('escucharEventoUnirseSala', (data: { mensaje: string }) => {
                console.log('escucharEventoUnirseSala');
            })

            socket.on('escucharEventoMensajeSala', (data: { mensaje: string }) => {
                console.log('escucharEventoMensajeSala');
            })

        },
        []
    )

    const enviarEventoHola = () => {
        const nuevoMensaje: MenajeChatProps = {
            mensaje: 'Timoteo',
            nombre: 'Sistema',
            posicion: 'I'
        };
        socket.emit(
            'Hola',
            nuevoMensaje,
            (datosEventoHola) => {
                console.log(datosEventoHola)
                setMensajes((mensajesAnteriore) => [...mensajesAnteriore, nuevoMensaje])
            }
        )
    }

    return (
        <>
        <Layout title="Formulario">
            <h1>Websockets</h1>
            <button className={'btn btn-success'} onClick={() => enviarEventoHola()}>Enviar evento hola</button>
            <div className='row'>
                <div className='col-sm-6'>
                    FORMULARIO
                </div>
                <div>
                    {mensajes.map((mensaje, indice) =>
                    <MensajeChat key={indice}
                                 mensaje={mensaje.mensaje}
                                 nombre={mensaje.nombre}
                                 posicion={mensaje.posicion}
                    ></MensajeChat>
                    )}
                </div>
            </div>

        </Layout>
        </>
    )
}
