import {configureStore} from '@reduxjs/toolkit'
import appointmentReducer from '../features/appointmentSlice'
import authReducer from '../features/userSlice'
import barberReducer from '../features/barberSlice'
import serviceReducer from '../features/serviceSlice'

export const store = configureStore({

    reducer: {
        auth: authReducer,
        service: serviceReducer,
        barber: barberReducer,
        appointment: appointmentReducer,
    }
})