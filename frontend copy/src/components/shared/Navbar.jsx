import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";

function Navbar() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let {user} = useSelector(store => store.auth);
  const logoutHandler = async() => {
      await axios.get(`${USER_API_END_POINT}/user/logout`)
      .then(res => {
        dispatch(setUser(null));
        navigate('/')
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="flex p-4 justify-between items-center mx-20 h-15 text-black">
      <div>
        <Link to='/' className="text-2xl font-bold font-protestFont cursor-pointer select-none">
          <span>Job</span>
          <span className="text-red-500">Portal</span>
        </Link>
      </div>
      <ul className="flex items-center gap-5">
        {
          user && user.role == 'recruiter' ? 
          <>
          <li><Link to='/admin/companies'>Companies</Link></li>
          <li><Link to='/admin/jobs'>Jobs</Link></li>
          </>
          :
          <>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/jobs'>Jobs</Link></li>
          <li><Link to='/browse'>Browse</Link></li>
          </>
        }
        {
          !user ? (
            <div className="flex items-center gap-1">  
              <Link to='/auth/login'>
            <Button className=' rounded-lg border-[1px] border-gray-600'>
            Login
            </Button>
              </Link>
            <Link to='/auth/signup'>
            <Button className="bg-[#6A38C2] hover:bg-[#5829aa] rounded-lg text-white">
              Signup
            </Button>
            </Link>
            </div>
          ) : (
            <Popover>
          <PopoverTrigger asChild>
            <Avatar>
              <AvatarImage
                className="cursor-pointer"
                src={user?.profile?.profilePhoto}
                />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-white">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  className="cursor-pointer"
                  src={user?.profile?.profilePhoto}
                  />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
              <h1 className="font-medium">{user?.fullname}</h1>
              <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
              </div>
            </div>
              <ul className="text-sm text-gray-700 mt-3">
              {
                  user && user.role == 'student' &&

                <Link to='/profile' className="flex items-center" ><User2 />
                {/* <Link > */}
                <Button 
                variant="link">
                  View Profile
                  </Button>
                {/* </Link> */}
                </Link>
                }
                <li className="flex items-center" ><LogOut /> <Button 
                onClick={logoutHandler}
                variant="link">Logout</Button>                
                </li>
              </ul> 
          </PopoverContent>
        </Popover>
        )
        }
      </ul>
    </div>
  );
}

export default Navbar;
