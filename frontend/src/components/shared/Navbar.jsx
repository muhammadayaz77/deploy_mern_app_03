import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiCompassLight } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import { IoMdPaperPlane } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";




function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const {user} = useSelector(store => store.auth);
  const dispatch = useDispatch()
  let handleLogout = async() => {
    await axios.get(`${USER_API_END_POINT}/logout`)
    .then(res => {
      window.toastify(res.data.message,'success');
      dispatch(setUser(null))
    })
    .catch(err => {
      window.toastify(err.response.data.message,'error')
    })
  }

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900 custom:h-16">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-5 xl:px-0 order-1">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/LogoMastersPortalTransparent.svg"
            className="md:h-16 h-12 sm:h-14 object-cover"
            alt="Study Portal Logo"
          />
        </Link>

        {/* Profile Section */}
        <div className="flex items-center md:order-4 order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        {
          user ? <Popover>
          <PopoverTrigger asChild>
        <Avatar className='cursor-pointer'>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
          </PopoverTrigger>
          <PopoverContent className='bg-white w-50 mx-5'>
            <div>
              <div className="">
                <div className="text-ps text-black">{user.fullname}</div>
                <div className="text-ps text-gray-600">{user.email}</div>
              </div>
              <hr className="my-2" />
              <div>
              <div className="text-ps text-gray-600 cursor-pointer p-1 hover:bg-gray-100 transition-all hover:rounded-lg">Dashboard</div>
              <Link to='/profile'>
              <div className="text-ps text-gray-600 p-1 hover:bg-gray-100 cursor-pointer transition-all hover:rounded-lg">Profile</div>
              </Link>
              <div className="text-ps text-gray-600 p-1 hover:bg-gray-100 cursor-pointer transition-all hover:rounded-lg">Setting</div>
              <div
              onClick={handleLogout}
              className="text-ps text-gray-600 p-1 hover:bg-gray-100 cursor-pointer transition-all hover:rounded-lg">Sign out</div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        : 
        <Link to='/auth/login' className="mr-3 cursor-pointer">
        <div className="flex sm:gap-0 gap-2 sm:flex-col items-center justify-center">
         <CgProfile className="sm:text-2x text-xl" />
         <p className="text-ps">Sign in</p>
        </div>
  
        </Link>        
        }

          {/* Menu Button (for mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        {/* <div
          className={` items-center justify-between ${
            menuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to='/' href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
              <div className="flex items-center justify-center">
              <PiCompassLight className="text-4xl" /> <span className="text-ps">Explore</span>
              </div>
              </Link>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white">
              <div className="flex items-center justify-center">
              <PiCompassLight className="w-full" /> <span className="border">Explore</span>
              </div>
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white">
              <div className="flex items-center justify-center">
              <PiCompassLight className="w-full" /> <span className="border">Explore</span>
              </div>
              </a>
            </li>
          </ul>
        </div> */}



        <div
          className={`items-center justify-between ${
            menuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto order-3 md:order-2`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
              <Link to='/' href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
              <div className="flex items-center justify-center">
              <PiCompassLight className="text-4xl" /> <span className="text-ps">Explore</span>
              </div>
              </Link>
            </li>
            <li>
              <Link to='/' href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
              <div className="flex items-center justify-center">
              <TbTargetArrow className="text-4xl" /> <span className="text-ps">Decide</span>
              </div>
              </Link>
            </li>
             <li>
              <Link to='/' href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
              <div className="flex items-center justify-center">
              <IoMdPaperPlane className="text-4xl" /> <span className="text-ps">Apply</span>
              </div>
              </Link>
            </li>
          </ul>

        </div>

            {/* Search Input */}
           <div className="custom:flex custom:w-[400px] w-full custom:order-3 order-4">
            <hr className=" bg-gray-200 h-0 p-[1px] custom:hidden my-2" />
<form class="max-w-2xl mx-auto w-full mb-2 custom:mb-0">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block text-ps w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 md:px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

           </div>
          
      </div>
    </nav>
  );
}

export default Navbar;
