import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constants';

function UpdateProfile({setDialogOpen}) {
  let { user } = useSelector(store => store.auth);
  let [loading,setLoading] = useState(false);
  let [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    aboutMe: user?.aboutMe,
    profilePic: user?.profilePic,
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading
    console.log('click');
    axios.defaults.withCredentials = true;
    setLoading(true)
    await axios
      .post(`${USER_API_END_POINT}/update/profile`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        window.toastify(res.data.message,'success');
        setDialogOpen(false)
      })
      .catch((err) => {
        window.toastify(err.response.data.message,'error');
      });
    setLoading(false);
  };

  return (
    <DialogContent className="sm:max-w-[425px] bg-white"
      onInteractOutside={(e) =>{
        e.preventDefault()}}
      >
        <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullname" className="text-right">
              Name
            </Label>
            <Input
              name="fullname"
              onChange={handleChange}
              id="fullname"
              value={input?.fullname}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              name="email"
              onChange={handleChange}
              id="email"
              value={input?.email}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="aboutMe" className="text-right">
              About
            </Label>
            <Input
              name="aboutMe"
              onChange={handleChange}
              id="aboutMe"
              value={input?.aboutMe}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profilePic" className="text-right">
              Profile Picture
            </Label>
            <Input
              type="text"
              name="profilePic"
              onChange={handleChange}
              id="profilePic"
              value={input?.profilePic}
              className="col-span-3"
            />
          </div>
        </div>
        <button type="submit" className="mt-4">
          {!loading ? 'Save changes' :
<span className="loading loading-spinner loading-md"></span>
          }
        </button>
    </form>
      </DialogContent>
  );
}

export default UpdateProfile;
