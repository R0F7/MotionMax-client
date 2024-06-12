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
import EmployeeRoute from "./EmployeeRoute";
import HRRoute from "./HRRoute";

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
                element: <EmployeeRoute><WorkSheet></WorkSheet></EmployeeRoute>
            },
            {
                path:'payment-history',
                element:<EmployeeRoute><PaymentHistory></PaymentHistory></EmployeeRoute>
            },
            {
                path:'employee-list',
                element:<HRRoute><EmployeeList></EmployeeList></HRRoute>
            },
            {
                path:'details/:email',
                element:<HRRoute><Details></Details></HRRoute>
            },
            {
                path:'progress',
                element:<HRRoute><Progress></Progress></HRRoute>
            },
            {
                path:'all-employee-list',
                element:<AdminRoute><AllEmployeeList></AllEmployeeList></AdminRoute>,
               
            }
        ]
    }
])