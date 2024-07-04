import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { MdLogout } from "react-icons/md";
import { useState } from "react";
import useEmployee from "../../hooks/useEmployee";
import useHR from "../../hooks/useHR";
import useAdmin from "../../hooks/useAdmin";

const NavBar = () => {
    const { user, logOut } = useAuth();
    const [toggle, setToggle] = useState(false);
    const [isEmployee] = useEmployee();
    const [isHR] = useHR();
    const [isAdmin] = useAdmin();

    // const isEmployee = false
    // const isHR = false
    // const isAdmin = true

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleLogOut = () => {
        logOut()
    }

    return (
        <div className="border-b border-[#00b4d8] flex items-center justify-between container mx-auto py-2 px-3 md:px-0 mt-2">
            <Link to='/'>
                <h4 className="text-2xl flex items-center gap-2 text-[#00b4d8] font-bold">
                    <img className="w-[50px]" src="https://i.ibb.co/5c06sK1/Motion-Max-removebg-preview.png" alt="" />
                    <span>MotionMax</span>
                </h4>
            </Link>
            <div>

            </div>
            <div className="flex items-center">
                <div className="mr-14">
                    <ul className="space-x-3 hidden md:block">
                        {isEmployee && <NavLink to='/dashboard/work-sheet' className={({ isActive }) => isActive ? 'font-bold border-b-2 pb-1.5 border-[#00b4d8]' : 'font-medium'}>Dashboard</NavLink>}
                        {isHR && <NavLink to='/dashboard/employee-list' className={({ isActive }) => isActive ? 'font-bold border-b-2 pb-1.5 border-[#00b4d8]' : 'font-medium'}>Dashboard</NavLink>}
                        {isAdmin && <NavLink to='/dashboard/all-employee-list' className={({ isActive }) => isActive ? 'font-bold border-b-2 pb-1.5 border-[#00b4d8]' : 'font-medium'}>Dashboard</NavLink>}
                        <NavLink to='/contact-us' className={({ isActive }) => isActive ? 'font-bold border-b-2 pb-1.5 border-[#00b4d8]' : 'font-medium'}>Contact us</NavLink>
                    </ul>
                </div>
                <div>
                    {user ?
                        <div className="z-50">
                            <div onClick={handleToggle} className="w-12 h-12 rounded-full border-2 p-[4px] border-[#00b4d8] focus:w-10 focus:h-10 relative ">
                                <img className="w-full h-full rounded-full" referrerPolicy='no-referrer' src={user?.photoURL} alt="user" />

                                <div className={toggle ? 'h-[160px] w-[250px] bg-[#00b4d8] absolute -left-[208px] top-[60px] rounded-lg justify-center md:hidden items-center opacity-100 visible duration-700 z-50' : 'opacity-0 invisible duration-700 h-[60px] w-[150px] -left-[103px] top-[60px] flex justify-center items-center absolute z-50'}>
                                    <ul className="flex flex-col ">
                                        {isEmployee && <NavLink to='/dashboard/work-sheet' className={({ isActive }) => isActive ? 'font-bold py-3.5 text-[#00b4d8] pl-12 bg-white' : 'font-bold pl-12 text-white py-3.5'}>Dashboard</NavLink>}
                                        {isHR && <NavLink to='/dashboard/employee-list' className={({ isActive }) => isActive ? 'font-bold py-3.5 text-[#00b4d8] pl-12 bg-white' : 'font-bold pl-12 text-white py-3.5'}>Dashboard</NavLink>}
                                        {isAdmin && <NavLink to='/dashboard/all-employee-list' className={({ isActive }) => isActive ? 'font-bold py-3.5 text-[#00b4d8] pl-12 bg-white' : 'font-bold pl-12 text-white py-3.5'}>Dashboard</NavLink>}
                                        <NavLink to='/contact-us' className={({ isActive }) => isActive ? 'font-bold border-y py-3.5 text-[#00b4d8] pl-12 bg-white' : 'font-bold border-y py-3.5 text-white pl-12'}>Contact us</NavLink>
                                    </ul>
                                    <button onClick={handleLogOut} className="border-y-white py-2 w-full text- font-bold text-white  flex items-center hover:bg-white hover:text-[#00b4d8] duration-1000 ease-out">
                                        <span className="text-xl ml-2 mr-6"><MdLogout /></span>LogOut
                                    </button>
                                </div>

                                <div className={toggle ? 'h-[60px] w-[150px] bg-[#00b4d8] absolute -left-[103px] hidden top-[60px] rounded-lg md:flex justify-center items-center opacity-100 visible duration-700 z-50' : 'opacity-0 invisible duration-700 h-[60px] w-[150px] -left-[103px] top-[60px] flex justify-center items-center absolute z-50'}>
                                    <button onClick={handleLogOut} className="border-y-white border py-2 w-full text- font-bold text-white  flex items-center hover:bg-white hover:text-[#00b4d8] duration-1000 ease-out">
                                        <span className="text-xl ml-2 mr-6"><MdLogout /></span>LogOut
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="">
                            <Link to='/login'><button className="bg-[#00b4d8] py-2.5 px-2 md:px-5 text-sm font-bold text-white rounded-lg mr-2 md:mr-3">Login</button></Link>
                            <Link to='/register'><button className="bg-[#00b4d8] py-2.5 px-1 md:px-3.5 text-sm font-bold text-white rounded-lg">Register</button></Link>
                        </div>
                    }

                    {/* for showing after toggle  */}
                    {/* <div class="container h-screen max-w-full">
                        <div class="m-auto my-28 w-96 max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
                            <div class="h-24 bg-white"></div>
                            <div class="-mt-20 flex justify-center">
                                <img class="h-32 rounded-full" src="https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=" />
                            </div>
                            <div class="mt-5 mb-1 px-3 text-center text-lg">Your Name</div>
                            <div class="mb-5 px-3 text-center text-sky-500">Title</div>
                            <blockquote>
                                <p class="mx-2 mb-7 text-center text-base">Bio</p>
                            </blockquote>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default NavBar;