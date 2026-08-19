import { io } from "socket.io-client";

 let socket = null;

// ========================================
// Create / Get Socket Connection
// ========================================
export const connectSocket = (apiBaseUrl) => {
    // URL required
    if (!apiBaseUrl) {
        console.error(
            "❌ Socket URL is missing"
        );

        return null;
    }
    // Already connected
    if (socket?.connected) {
        return socket;
    }

    // Socket already created
    // It may still be connecting
    if (socket) {
        return socket;
    }

    console.log(
        "🔌 Connecting Socket:",
        apiBaseUrl
    );

    socket = io(apiBaseUrl, {
        transports: ["websocket"],
        autoConnect: true,
    });

    return socket;
};


// ========================================
// Get Existing Socket
// ========================================

export const getSocket = () => {
    return socket;
};

// ========================================
// Disconnect Socket
// ========================================

export const disconnectSocket = () => {
    if (!socket) {
        return;
    }

    console.log(
        "🔌 Disconnecting Socket"
    );

    socket.removeAllListeners();

    socket.disconnect();

    socket = null;
};



