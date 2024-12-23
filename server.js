import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';

// Initialize the Express app
const app = express();
const PORT = 5000;
const PORT1 = 5001; // For server instance 1
const PORT2 = 5002; // For server instance 2

// Create HTTP server and WebSocket server
const server = http.createServer(app);
const io = new Server(server);

// Resolve the current directory
const __dirname = path.resolve();

// Serve static files (e.g., index.html) from the root directory
app.use(express.static(__dirname));

// Serve the index.html file at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// WebSocket connection logic
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for a message from the client
    socket.on('message', (msg) => {
        console.log('Message from client:', msg);

        // Send a response back to the client
        socket.emit('message', `Server received: ${msg}`);
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(PORT || PORT1 ||PORT2, () => {
    console.log(`Server running on http://localhost:${PORT}`,`Server running on http://localhost:${PORT1}`,`Server running on http://localhost:${PORT2}`);
});
