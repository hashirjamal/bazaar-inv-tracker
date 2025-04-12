import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";



@WebSocketGateway()
export class EventsGateway {

    @WebSocketServer()
    server: Server;
  
    emitEvent(eventName:string,data: any) {
      this.server.emit(eventName, data); // 'customEvent' is the event name
    }
}