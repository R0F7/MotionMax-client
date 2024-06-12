import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { BsFillHouseAddFill, BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { MdHomeWork } from 'react-icons/md'
import { FaThList } from 'react-icons/fa'
import useHR from '../../../hooks/useHR'
import useAdmin from '../../../hooks/useAdmin'
import { LuFileSpreadsheet } from 'react-icons/lu'
import { RiFileHistoryLine } from 'react-icons/ri'
import { GiProgression } from 'react-icons/gi'
import useEmployee from '../../../hooks/useEmployee'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false);
  const [isEmployee] = useEmployee()
  const [isHR] = useHR();
  // console.log(isHR);
  const [isAdmin] = useAdmin()
  // console.log(isAdmin);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img
                // className='hidden md:block'
                src='https://i.ibb.co/5c06sK1/Motion-Max-removebg-preview.png'
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src='https://i.ibb.co/5c06sK1/Motion-Max-removebg-preview.png'
                  alt='logo'
                  width='40'
                  height='40'
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>

              {/* Employee */}
              {
                isEmployee && <>
                  <NavLink
                    to='/dashboard/work-sheet'
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300 hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <LuFileSpreadsheet className='w-5 h-5' />
                    <span className='mx-4 font-medium'>Work Sheet</span>
                  </NavLink>

                  <NavLink
                    to='/dashboard/payment-history'
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300 hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <RiFileHistoryLine className='w-5 h-5' />
                    <span className='mx-4 font-medium'>Payment History</span>
                  </NavLink>
                </>
              }

              {/* HR */}
              {
                isHR &&
                <>
                  <NavLink
                    to='/dashboard/employee-list'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300 hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <FaThList className='w-5 h-5' />
                    <span className='mx-4 font-medium'>Employee List</span>
                  </NavLink>
                  <NavLink
                    to='/dashboard/progress'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300 hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <GiProgression className='w-5 h-5' />
                    <span className='mx-4 font-medium'>Progress</span>
                  </NavLink>
                </>
              }
              {/* admin */}
              {isAdmin &&
                <>
                  <NavLink
                    to='/dashboard/all-employee-list'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300 hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <FaThList className='w-5 h-5' />
                    <span className='mx-4 font-medium'>All Employee List</span>
                  </NavLink>
                </>
              }

            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300 hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar