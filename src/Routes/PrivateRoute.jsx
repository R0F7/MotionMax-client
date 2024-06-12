import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';
import Lottie from "lottie-react";
import loadingSpinner from '../../public/Animation - 1715748794001 (1).json';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex items-center justify-center max-h-[calc(100vh-350px)]">
        <Lottie animationData={loadingSpinner} style={{ height: '50%', width: '50%' }}></Lottie>
    </div>
    }
    
    if (user) {
        return children
    }

    return (
        <div>
            <Navigate to='/login' state={{from:location}} replace></Navigate>
        </div>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;