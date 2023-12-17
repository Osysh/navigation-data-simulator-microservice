import WebSocket from 'ws';
import { Server } from 'http';

export class Socket {
  private wss!: WebSocket.WebSocketServer;

  constructor(server: Server) {
    try {
      this.wss = new WebSocket.Server({ server });
    } catch (error) {
      console.error('Error creating WebSocket server:', error);
    }
  }

  public initConnection() {
    this.wss.on('connection', (ws) => {
      ws.send('Connected to Navigation Data Simulator');
    });
  }

  public sendData(data: any) {
    const message = JSON.stringify(data);

    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}
