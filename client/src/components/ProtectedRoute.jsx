import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {

    const user = useSelector((state)=> state.auth.user)
    if(!user){
        return <Navigate to="/register" />
    }

  return (
        <Outlet />
    )
}

export default ProtectedRoute