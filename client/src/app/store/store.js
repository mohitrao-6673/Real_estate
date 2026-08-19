"use client"
import { configureStore } from "@reduxjs/toolkit";
import passwordResetSlice from "../slices/passwordResetSlice";
import userSlice from "../slices/userSlice";
import chatSlice from "../slices/chatSlice";



export let myStore = configureStore({
    reducer: {
        userStore: userSlice,
        resetPassowrdTokenStore: passwordResetSlice,
        chat: chatSlice
    }
})

