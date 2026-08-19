import {
    addMessage,
    addNotification,
    setSocketConnected,
     setActiveChat,
    resetChatState,
} from "./chatSlice";

import {
    connectSocket as createSocket,
    disconnectSocket as destroySocket,
    getSocket,
} from "../socket/socketService";


// ================================
// Initialize Socket
// ================================

export const connectSocket = () => {
    return (dispatch, getState) => {
        const user =
            getState().userStore.loginDetails;

        if (!user?._id) {
            console.log(
                "No logged-in user"
            );

            return;
        }

        const socket = createSocket(
            process.env.NEXT_PUBLIC_SOCKETURL
        );

        if (!socket) {
            return;
        }


        // =================================
        // Remove previous listeners
        // =================================

        socket.off("receiveMessage");
        socket.off("connect");
        socket.off("disconnect");


        // =================================
        // Connected
        // =================================

        socket.on("connect", () => {
            console.log(
                "✅ Socket connected:",
                socket.id
            );

            dispatch(
                setSocketConnected(true)
            );
        });

 
        // =================================
        // Connection error
        // =================================

        socket.on(
            "connect_error",
            (error) => {
                console.error(
                    "❌ Socket connection error:",
                    error.message
                );

                dispatch(
                    setSocketConnected(false)
                );
            }
        );


        // =================================
        // Disconnected
        // =================================

        socket.on(
            "disconnect",
            (reason) => {
                console.log(
                    "🔌 Socket disconnected:",
                    reason
                );

                dispatch(
                    setSocketConnected(false)
                );
            }
        );


        // =================================
        // Receive message
        // =================================

        socket.on(
            "receiveMessage",
            (data) => {
                console.log(
                    "📩 Received message:",
                    data
                );

                const {
                    activeChat,
                } = getState().chatStore;


                // Current opened chat
                if (
                    activeChat?._id ===
                    data.chatId
                ) {
                    dispatch(
                        addMessage(data)
                    );
                }

                // Other chat
                else {
                    dispatch(
                        addNotification(data)
                    );
                }
            }
        );
    };
};

// ================================
// Disconnect Socket
// ================================  

export const disconnectSocket = () => {
    return (dispatch) => {
        destroySocket();

        dispatch(resetChatState());
    };
};


// ================================
// Join Chat
// ================================

export const joinChat = (chatId) => {
    return () => {
        const socket = getSocket();

        if (!socket || !chatId) {
            return;
        }

        socket.emit("joinChat", chatId);
    };
};


// ================================
// Open Chat
// ================================

export const openChat = (chat) => {
    return (dispatch) => {
        const socket = getSocket();

        if (!chat?._id) {
            return;
        }

        dispatch(setActiveChat(chat));

        if (socket) {
            socket.emit("joinChat", chat._id);
        }
    };
};


// ================================
// Send Message
// ================================

export const sendMessage = ({
    chatId,
    text = "",
    messageId = null,
    createdAt = new Date(),
    image = null,
}) => {
    return (dispatch, getState) => {
        const socket = getSocket();

      const user = getState().userStore.loginDetails;

        if (!socket || !user || !chatId) {
            return null;
        }

        const messageData = {
            chatId,
            sender: user._id,
            text,
            image,
            createdAt,
            _id: messageId,
        };

        socket.emit("sendMessage", messageData);

        return messageData;
    };
};