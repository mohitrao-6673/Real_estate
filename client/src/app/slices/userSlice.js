"use client"

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export let userSlice = createSlice({
    name: 'login',
    initialState: {
        loginDetails: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
        userDeatails: Cookies.get('userData') ? Cookies.get('userData') : null,
        token: Cookies.get("token") ?? ''
    },
    reducers: {
        saveUser: (state, reqData) => {
            state.loginDetails = reqData.payload.user
            state.userDeatails = reqData.payload.userData
            state.token = reqData.payload.token
            Cookies.set('user', JSON.stringify(reqData.payload.user))
            Cookies.set('userData', JSON.stringify(reqData.payload.userData))
            Cookies.set('token', reqData.payload.token)
        },
        logout: (state) => {
            state.loginDetails = null
            state.userDeatails = null
            state.token = ''
            Cookies.set('user', JSON.stringify(null))
            Cookies.set('userData', JSON.stringify(null))
            Cookies.set('token', JSON.stringify(''))
        }
    }

})

export let { saveUser, logout } = userSlice.actions
export default userSlice.reducer