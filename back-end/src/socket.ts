import WebSocket, { WebSocketServer } from 'ws';

const initWebsocket = (server: WebSocketServer) => {
    const wss = new WebSocket.Server({ server });
    
    wss.on('connection', (ws: WebSocket) => {
        ws.on('message', (message: string) => {
        console.log('received: %s', message);
        });
    
        ws.send('something');
    });
    }
