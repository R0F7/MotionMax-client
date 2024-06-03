import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { MdLogout } from "react-icons/md";
import { useState } from "react";

const NavBar = () => {
    const { user, logOut } = useAuth();
    const [toggle, setToggle] = useState(false)
    // console.log(user);

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleLogOut =  () => {
         logOut()
    }

    return (
        <div className="border-b border-[#00b4d8] flex items-center justify-between container mx-auto py-2 md:mt-2 mb-4">
            <div>
                <h4 className="text-2xl text-[#00b4d8] font-bold">MotionMax</h4>
            </div>
            <div>

            </div>
            <div className="flex items-center">
                <div className="mr-14">
                    <ul className="space-x-3">
                        <NavLink to='/' className={({ isActive }) => isActive ? 'text-red-400 font-bold border-b-2 pb-1.5 border-[#00b4d8]' : 'font-medium'}>Dashboard</NavLink>
                        <NavLink to='/contact-us' className={({ isActive }) => isActive ? 'text-red-400 font-bold border-b-2 pb-1.5 border-[#00b4d8]' : 'font-medium'}>Contact us</NavLink>
                    </ul>
                </div>
                <div>
                    {user ?
                        <div className="">
                            <div onClick={handleToggle} className="w-12 h-12 rounded-full border-2 p-[4px] border-[#00b4d8] focus:w-10 focus:h-10 relative ">
                                <img className="w-full h-full rounded-full" src={user?.photoURL} alt="user" />
                                <div className={toggle ? 'h-[60px] w-[150px] bg-[#00b4d8] absolute -left-[103px] top-[60px] rounded-lg flex justify-center items-center opacity-100 visible duration-700' : 'opacity-0 invisible duration-700 h-[60px] w-[150px] -left-[103px] top-[60px] flex justify-center items-center absolute'}>
                                    <button onClick={handleLogOut} className="border-y-white border py-2 w-full text- font-bold text-white  flex items-center hover:bg-white hover:text-[#00b4d8] duration-1000 ease-out">
                                        <span className="text-xl ml-2 mr-6"><MdLogout /></span>LogOut
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <>
                            <Link to='/login' className="bg-[#00b4d8] py-2 px-3 text- font-bold text-white rounded-lg mr-3">Login</Link>
                            <Link to='/register' className="bg-[#00b4d8] py-2 px-3 text- font-bold text-white rounded-lg">Register</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;