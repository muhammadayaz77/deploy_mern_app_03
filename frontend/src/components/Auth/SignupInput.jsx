import React from 'react'
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
function SignupInput({changeHandler}) {
  return (
    <div className='flex flex-col gap-2 text-p mt-2 p-2'>
<label className="input rounded-none bg-[#F4F8F7] border-none flex items-center gap-2">
  <IoPersonOutline />
  <input
  onChange={changeHandler}
  name='fullname'
  type="text" className="w-full border-none " placeholder="Name" />
</label>
<label className="input rounded-none bg-[#F4F8F7] border-none flex items-center gap-2">
   <MdOutlineEmail />
  <input
  onChange={changeHandler}
  name='email'
  type="email" className="w-full border-none " placeholder="Email" />
</label>
<label className="input rounded-none bg-[#F4F8F7] border-none flex items-center gap-2 focus:outline-none">
<TbLockPassword />
  <input
  onChange={changeHandler}
  name='password'
  type="password" placeholder='Password' className="w-full border-none " />
</label>
    </div>
  )
}

export default SignupInput