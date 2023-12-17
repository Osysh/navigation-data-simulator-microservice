function createWebSocketClient(serverUrl) {
  const socket = new WebSocket(serverUrl);

  socket.addEventListener('open', (event) => {
    console.log('WebSocket connection opened:', event);
    socket.send('Hello, Server!');
  });

  socket.addEventListener('message', (event) => {
    console.log('Message from server:', event.data);
  });

  socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
  });

  socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event);
  });

  setTimeout(() => {
    socket.close();
  }, 50000);
}

// Example usage
const serverUrl = 'ws://localhost:3000';
createWebSocketClient(serverUrl);
