import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { MdOutlineModeEdit } from "react-icons/md";
import UpdateProfile from '@/components/Profile/UpdateProfile';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSelector } from 'react-redux';



function Profile() {
  let {user} = useSelector(store => store.auth);
  let [dialogOpen,setDialogOpen] = useState(false)
  return (
            <Dialog open={dialogOpen}>
    <div>
      <div className='grid grid-cols-12 mx-10'>
          <div className='col-span-3 mt-10'>
            <div>
            <HoverCard>
  <HoverCardTrigger>
  <img src={`${user?.profilePic == true ? user?.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}`} className='object-cover rounded-full cursor-pointer border border-gray-400 shadow-lg' alt="" />
  </HoverCardTrigger>
  <HoverCardContent className='bg-[#25292E] w-fit h-fit text-white rounded-xl'>
    <div className="text-ps">Change your avatar.</div>
  </HoverCardContent>
</HoverCard>

             
            </div>
            <div>
              <p className='text-p mt-5 mb-3'>{user?.fullname}</p>
            </div>
            <div>
              <Button className='w-full hover:bg-gray-50 transition-all border border-gray-300 shadow-md'>Edit Profile</Button>
            </div>
          </div>
          <div className='col-span-9 border shadow-sm rounded-xl mt-10 mx-10 p-5'>
            <div>
              <div className='flex justify-between'>
                <div>
                  <p className='text-xs'>{user?.fullname}/Profile.me</p>
                </div>
                <div>
                <DialogTrigger asChild> 
              < MdOutlineModeEdit
              onClick={() => setDialogOpen(true)}
              className='text-xl text-gray-600 cursor-pointer hover:text-blue-600 transition-all' />
      </DialogTrigger>
                </div>
              </div>
            </div>
            <div className='mt-3'>
              <div className="text-2xl font-semibold ">🖤 About Me:</div>
              <hr className='my-3 h-[2px] bg-gray-100' />
              <p className='text-sm font-light text-black tracking-normal mt-3 text-justify'>{user?.aboutMe}</p>
            </div>
            <div className='mt-5'>
              <h3 className='text-2xl font-semibold' >🖋 Random Dev Quote</h3>
              <div className='bg-[#141321] rounded-xl w-[60%] p-4 '>
                 <p className='text-[#75CBD1]'><span className='text-yellow-300 font-mono'>"</span>For Most Software the efficiency does not matter<span className='text-yellow-300 font-mono'>"</span></p>
                 <p className='text-pink-500 text-end mt-2'> - Muhammad Ayaz</p>
              </div>
            </div>
          </div>
      </div>
    </div>
    <UpdateProfile setDialogOpen={setDialogOpen} />
    </Dialog>
  )
}

export default Profile