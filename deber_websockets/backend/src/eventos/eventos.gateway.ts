import {
    ConnectedSocket,
    MessageBody,
    WebSocketGateway,
    SubscribeMessage
} from "@nestjs/websockets";
import {Socket} from "socket.io";


export interface Temperatura {
    id: number;
    dia: string;
    fechaDia: number;
    temperatura: number;
}

@WebSocketGateway(
    8086, // Puerto donde escucha el servidor de websockets
    {
        cors: {
            origin: "*", // Habilitando la conexion desde cualquier IP
        }
    }
)
export class EventosGateway{
    @SubscribeMessage("cambiarValorTemperatura")
    cambiarValorMoneda(
        @MessageBody()
        message: {temperatura: Temperatura, nuevoValor: number},
        @ConnectedSocket()
        socket: Socket
    ){
        socket.broadcast
            .emit(
                'escucharEventoCambiarValorTemperatura',
                message
            )
        return {mensaje: 'ok'}
    }
}