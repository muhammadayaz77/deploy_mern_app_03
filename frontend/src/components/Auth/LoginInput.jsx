import React from 'react'
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
function LoginInput({changeHandler}) {
  return (
    <div className='flex flex-col gap-2 text-p mt-2 p-2'>
<label className="input rounded-none bg-[#F4F8F7] border-none flex items-center gap-2">
   <MdOutlineEmail />
  <input
  onChange={changeHandler}
  name='email'
  type="email" className="" placeholder="Email" />
</label>
<label className="input rounded-none bg-[#F4F8F7] border-none flex items-center gap-2 focus:outline-none">
<TbLockPassword />
  <input
  onChange={changeHandler}
  name='password'
  type="password" placeholder='Password' className="" />
</label>
    </div>
  )
}

export default LoginInput