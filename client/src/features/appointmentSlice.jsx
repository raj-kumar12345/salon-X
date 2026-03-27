import { createSlice } from "@reduxjs/toolkit"

const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        appointments: []
    },

    reducers: {
        setAppointments: (state,action) =>{
            state.appointments = action.payload;
        },
        addAppointments: (state,action) =>{
            state.appointments.push(action.payload);
        }
    }
})


export const {setAppointments,addAppointments} = appointmentSlice.actions

export default appointmentSlice.reducer;