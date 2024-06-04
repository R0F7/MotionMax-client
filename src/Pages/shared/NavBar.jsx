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

    const handleLogOut = () => {
        logOut()
    }

    return (
        <div className="border-b border-[#00b4d8] flex items-center justify-between container mx-auto py-2 md:mt-2">
            <div>
                <h4 className="text-2xl flex items-center gap-2 text-[#00b4d8] font-bold">
                    <img className="w-[50px]" src="https://i.ibb.co/5c06sK1/Motion-Max-removebg-preview.png" alt="" />
                    <span>MotionMax</span>
                    </h4>
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
                            <Link to='/login'><button className="bg-[#00b4d8] py-2.5 px-5 text-sm font-bold text-white rounded-lg mr-3">Login</button></Link>
                            <Link to='/register'><button className="bg-[#00b4d8] py-2.5 px-3.5 text-sm font-bold text-white rounded-lg">Register</button></Link>
                        </>
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