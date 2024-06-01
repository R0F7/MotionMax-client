import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="border-b border-[#00b4d8] flex items-center justify-between container mx-auto py-4">
            <div>
                <h4 className="text-2xl text-[#00b4d8] font-bold">MotionMax</h4>
            </div>
            <div>

            </div>
            <div className="flex items-center">
                <div className="mr-14">
                    <ul className="space-x-3">
                        <NavLink to='/' className={({isActive})=>isActive ? 'text-red-400 font-bold border-b-2 pb-1.5 border-[#00b4d8]':'font-medium'}>Dashboard</NavLink>
                        <NavLink to='/contact-us' className={({isActive})=>isActive ? 'text-red-400 font-bold border-b-2 pb-1.5 border-[#00b4d8]':'font-medium'}>Contact us</NavLink>
                    </ul>
                </div>
                <div>
                    <Link to='/login' className="bg-[#00b4d8] py-2 px-3 text- font-bold text-white rounded-lg mr-3">Login</Link>
                    <Link to='/register' className="bg-[#00b4d8] py-2 px-3 text- font-bold text-white rounded-lg">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;