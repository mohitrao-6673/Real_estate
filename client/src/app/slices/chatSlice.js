import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeChat: null,
    messages: [],
    notifications: [],
    isConnected: false,
};

const chatSlice = createSlice({
    name: "chat",

    initialState,

    reducers: {
        setActiveChat: (state, action) => {
            state.activeChat = action.payload;
        },

        clearActiveChat: (state) => {
            state.activeChat = null;
            state.messages = [];
        },

        sendMessage: (state, action) => {
            state.messages = action.payload || [];
        },

        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },

        clearMessages: (state) => {
            state.messages = [];
        },

        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },

        clearNotifications: (state) => {
            state.notifications = [];
        },

        setSocketConnected: (state, action) => {
            state.isConnected = action.payload;
        },

        resetChatState: (state) => {
            state.activeChat = null;
            state.messages = [];
            state.notifications = [];
            state.isConnected = false;
        },
    },
});

export const {
    setActiveChat,
    clearActiveChat,
    sendMessage,
    addMessage,
    clearMessages,
    addNotification,
    clearNotifications,
    setSocketConnected,
    resetChatState,
} = chatSlice.actions;

export default chatSlice.reducer;