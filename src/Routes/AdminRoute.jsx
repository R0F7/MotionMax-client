import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';
import Lottie from "lottie-react";
import loadingSpinner from '../../public/Animation - 1715748794001 (1).json';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex items-center justify-center max-h-[calc(100vh-350px)]">
        <Lottie animationData={loadingSpinner} style={{ height: '50%', width: '50%' }}></Lottie>
    </div>
    }

    if (user && isAdmin) {
        return children
    }

    return (
        <div>
            <Navigate to='/' state={{from:location}} replace></Navigate>
        </div>
    );
};

AdminRoute.propTypes = {
    children: PropTypes.node
}

export default AdminRoute;