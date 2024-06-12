import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useHR from "../hooks/useHR";
import PropTypes from 'prop-types';
import Lottie from "lottie-react";
import loadingSpinner from '../../public/Animation - 1715748794001 (1).json';

const HRRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isHR, isHRLoading] = useHR();
    const location = useLocation();

    if (loading || isHRLoading) {
        return <div className="flex items-center justify-center max-h-[calc(100vh-350px)]">
        <Lottie animationData={loadingSpinner} style={{ height: '50%', width: '50%' }}></Lottie>
    </div>
    }

    if (user && isHR) {
        return children
    }

    return (
        <div>
            <Navigate to='/' state={{from:location}} replace></Navigate>
        </div>
    );
};

HRRoute.propTypes = {
    children: PropTypes.node
}

export default HRRoute;