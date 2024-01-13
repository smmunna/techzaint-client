/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    if (localStorage.getItem('email')) {
        return children
    }
    return <Navigate to="/login" />
}

export default PrivateRoutes;