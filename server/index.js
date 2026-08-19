const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const mainRoute = require("./app/routes/mainRoute");

require("dotenv").config();

const app = express();


// ======================================
// Middleware
// ======================================

app.use(express.json());
app.use(cors());

app.use(mainRoute);

app.use(
    "/uploads/team",
    express.static("uploads/team")
);

app.use(
    "/uploads/property",
    express.static("uploads/property")
);

app.use(
    "/uploads/user",
    express.static("uploads/user")
);


// ======================================
// HTTP Server
// ======================================

const server = http.createServer(app);


// ======================================
// Socket.IO Server
// ======================================

const io = new Server(server);


// ======================================
// Socket Connection
// ======================================

io.on("connection", (socket) => {

    console.log(
        "✅ Socket connected:",
        socket.id
    );


    // ==============================
    // Join Chat
    // ==============================

    socket.on("joinChat", (chatId) => {

        if (!chatId) {
            return;
        }

        socket.join(chatId);

        console.log(
            `👤 ${socket.id} joined chat ${chatId}`
        );
    });


    // ==============================
    // Send Message
    // ==============================

    socket.on("sendMessage", (messageData) => {

        console.log(
            "📩 Message received:",
            messageData
        );

        if (!messageData?.chatId) {
            return;
        }

        io
            .to(messageData.chatId)
            .emit(
                "receiveMessage",
                messageData
            );
    });


    // ==============================
    // Disconnect
    // ==============================

    socket.on("disconnect", (reason) => {

        console.log(
            "❌ Socket disconnected:",
            socket.id,
            reason
        );
    });

});


// ======================================
// MongoDB
// ======================================

let mongoUrl = `mongodb+srv://mohitrao56722:v2ZLqps0rR0RFjvP@mohit.thtzf.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=mohit`

mongoose
    .connect(mongoUrl)
    .then(() => {

        console.log(
            "✅ MongoDB connected"
        );


        // IMPORTANT:
        // server.listen(), NOT app.listen()

        server.listen(
            process.env.PORT,
            () => {
                console.log(
                    `🚀 Server started on port ${process.env.PORT}`
                );
            }
        );

    })
    .catch((error) => {

        console.error(
            "❌ MongoDB connection failed:",
            error
        );

    });