import { Navigate, useLocation } from "react-router-dom";
import useEmployee from "../hooks/useEmployee";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';
import Lottie from "lottie-react";
import loadingSpinner from '../../public/Animation - 1715748794001 (1).json';

const EmployeeRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isEmployee, isEmployeeLoading] = useEmployee();
    const location = useLocation();

    if (loading || isEmployeeLoading) {
        return <div className="flex items-center justify-center max-h-[calc(100vh-350px)]">
            <Lottie animationData={loadingSpinner} style={{ height: '50%', width: '50%' }}></Lottie>
        </div>
    }

    if (user && isEmployee) {
        return children
    }

    return (
        <div>
            <Navigate to='/' state={{from:location}} replace></Navigate>
        </div>
    );
};

EmployeeRoute.propTypes = {
    children: PropTypes.node
}

export default EmployeeRoute;