import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';

// Initialize the Express app
const app = express();

// Define ports for multiple servers
const PORT1 = 5001; // Server instance 1
const PORT2 = 5002; // Server instance 2

// Resolve the current directory
const __dirname = path.resolve();

// Serve static files (e.g., index.html) from the root directory
app.use(express.static(__dirname));

// Serve the index.html file at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Function to create and start a server instance
const startServer = (port) => {
    const server = http.createServer(app);
    const io = new Server(server);

    // WebSocket connection logic
    io.on('connection', (socket) => {
        console.log(`A user connected to server on port ${port}`);

        // Listen for a message from the client
        socket.on('message', (msg) => {
            console.log(`Message from client on port ${port}:`, msg);

            // Send a response back to the client
            socket.emit('message', `Server on port ${port} received: ${msg}`);
        });

        // Handle client disconnect
        socket.on('disconnect', () => {
            console.log(`A user disconnected from server on port ${port}`);
        });
    });

    // Start the server
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
};

// Start server instances
startServer(PORT1);
startServer(PORT2);
