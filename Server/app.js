const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const Chat = require('./model/chat')
const cors = require("cors");
const path=require('path');
const authRoutes = require('./router/auth');
const chatRoutes = require('./router/chat');
const projectProgressRoutes = require('./router/projectProgress');
const PORT = process.env.PORT || 8000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
const server = http.createServer(app);
const io = socketIO(server);
// Use the authRoutes in the /auth path
app.use('/auth', authRoutes);
app.use('/', projectProgressRoutes)

// Socket.io setup
io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinRoom', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined the room`);
    });

    socket.on('sendMessage', async ({ sender, receiver, project, message }) => {
        try {
            const newMessage = new Chat({ sender, receiver, project, message });
            await newMessage.save();

            io.to(sender).emit('message', { sender, receiver, project, message });
            io.to(receiver).emit('message', { sender, receiver, project, message });
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });
});

app.use('/chat', chatRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the home page from the server');
});

server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
