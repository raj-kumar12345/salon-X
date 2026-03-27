import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,


    },
    reducers: {
        setUser: (state,action) =>{
            state.user = action.payload || null
        },
        removeUser: (state) =>{

        }
    }
})


export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer