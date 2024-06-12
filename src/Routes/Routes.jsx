import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import WorkSheet from "../Pages/Dashboard/WorkSheet/WorkSheet";
import EmployeeList from "../Pages/Dashboard/EmployeeList/EmployeeList";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import Details from "../Pages/Dashboard/Details/Details";
import Progress from "../Pages/Dashboard/Progress/Progress";
import AllEmployeeList from "../Pages/Dashboard/AllEmployeeList/AllEmployeeList";
import Contact from "../Pages/Contact/Contact";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path:'/contact-us',
                element:<Contact></Contact>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'work-sheet',
                element: <WorkSheet></WorkSheet>
            },
            {
                path:'payment-history',
                element:<PaymentHistory></PaymentHistory>
            },
            {
                path:'employee-list',
                element:<EmployeeList></EmployeeList>
            },
            {
                path:'details/:email',
                element:<Details></Details>
            },
            {
                path:'progress',
                element:<Progress></Progress>
            },
            {
                path:'all-employee-list',
                element:<AdminRoute><AllEmployeeList></AllEmployeeList></AdminRoute>,
               
            }
        ]
    }
])