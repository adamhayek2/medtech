import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const auth = localStorage.getItem('token')
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes