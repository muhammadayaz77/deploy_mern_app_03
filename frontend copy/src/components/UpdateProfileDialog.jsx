import React, { useState } from 'react'
import { Button } from "../components/ui/button"
import {useDispatch, useSelector} from 'react-redux'
import {
Dialog,
DialogContent,
DialogDescription,
DialogFooter,
DialogHeader,
DialogTitle,
DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Loader2 } from 'lucide-react'
import { USER_API_END_POINT } from '../utils/constant'
import axios from 'axios'
import { setUser } from '../redux/authSlice'
import { toast } from 'sonner'

function UpdateProfileDialog({open,setOpen}) {
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  let {user} = useSelector(store => store.auth);
  let [input,setInput] = useState({
    fullname : user?.fullname,
    email : user?.email,
    phoneNumber : user?.phoneNumber,
    role : user?.role,
    skills : user?.profile?.skills?.map(skill => skill),
    file : user?.profile?.resume,
    bio : user?.profile?.bio,
  })
  
  const changeEventHandler = (e) => {
    console.log(e.target.value)
      setInput({
        ...input,
        [e.target.name] : e.target.value
      })
  }
  const submitHandler = async(e)=> {
    e.preventDefault();
    console.log('click')
    const formData = new FormData();
    formData.append('fullname',input.fullname)
    formData.append('email',input.email)
    formData.append('phoneNumber',input.phoneNumber)
    formData.append('bio',input.bio)
    formData.append('skills',input.skills)
    if(input.file){
      formData.append('file',input.file)
    }
    setLoading(true)
    await axios.post(`${USER_API_END_POINT}/user/profile/update`,formData,{
      headers : {
        'Content-Type' : 'multipart/form-data'
      },
      withCredentials : true
    })
    .then(res => {
      dispatch(setUser(res.data.user));
      toast.success(res.data.message)
      console.log(res)})
    .catch(err => {
      toast.error(err.response.data.message)
      console.log(err)})
      setLoading(false);
      setOpen(false)
  }
  const fileChangeHandler = (e) => {
    setInput({
      ...input,
      file : e.target?.files[0]
    })
  }
  return (
    <div>

    <Dialog open={open} setOpen={open}>
      <DialogContent className="sm:max-w-[425px] bg-white" onInteractOutside={(e) =>{
        e.preventDefault();
        setOpen(false)}}>
        <form onSubmit={submitHandler}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="name" className="text-left col-span-2">
              Name
            </Label>
            <Input
              id="name"
              name="fullname"
              onChange={changeEventHandler}
              defaultValue={input.fullname}
              className="col-span-10"
            />
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="email" className="text-left col-span-2">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              onChange={changeEventHandler}
              defaultValue={input.email}
              className="col-span-10"
            />
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="number" className="text-left col-span-2">
              Number
            </Label>
            <Input
              name="phoneNumber"
              onChange={changeEventHandler}
              defaultValue={input.phoneNumber}
              className="col-span-10"
            />
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="bio" className="text-left col-span-2">
              Bio
            </Label>
            <Input
              name="bio"
              onChange={changeEventHandler}
              defaultValue={input.bio}  
              className="col-span-10"
            />
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="skill" className="text-left col-span-2">
              Skill
            </Label>
            <Input
              name="skills"
              onChange={changeEventHandler}
              defaultValue={input.skills}
              className="col-span-10"
            />
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="resume" className="text-left col-span-2">
              Resume
            </Label>
            <input
              id="res"
              name="file"
              type="file"
              onChange={fileChangeHandler}
              className="col-span-10 border border-gray-200 p-2 rounded-lg"
              accept='application/pdf'
            />
          </div>
        </div>
        <DialogFooter>
        {
                    loading ?  <button class={`w-full text-white bg-blue-600 focus:ring-4 foc us:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center cursor-not-allowed`} disabled
                    ><Loader2 className='animate-spin' /> &nbsp;Please Wait</button> : 
                  <button type='submit' class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 foc us:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-none">Save Changes</button>
                }
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default UpdateProfileDialog