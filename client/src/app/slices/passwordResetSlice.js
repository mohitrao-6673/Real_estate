import { createSlice } from '@reduxjs/toolkit'
import Cookies from "js-cookie";

export let passwordResetSlice = createSlice({
    name: 'token',
    initialState: {
        ResetPasswordToken: Cookies.get("ResetPasswordToken") ?? '',
    },
    reducers: {
        resetToken: (oldstate, reqData) => {
            oldstate.ResetPasswordToken = reqData.payload.ResetPasswordToken
            Cookies.set('ResetPasswordToken', reqData.payload.ResetPasswordToken)
        },
        destroyToken: (oldstate) => {
            oldstate.ResetPasswordToken = ''
            Cookies.remove("ResetPasswordToken")
        }
    }

})

export let { resetToken, destroyToken } = passwordResetSlice.actions
export default passwordResetSlice.reducer



