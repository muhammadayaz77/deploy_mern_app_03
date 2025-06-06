import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { BiLogoFacebook } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import LoginInput from '@/components/auth/LoginInput';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constants';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Login = () => {
  let [input,setInput] = useState({
    email : '',
    password : '',
    role : '',
  })
  let [loading,setLoading] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch()
  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    console.log(input)
  }
  const radioHandler = (value) => {
    setInput({
      ...input,
      role : value
    });
    console.log(input)
  }
  const submitHandler = async(e) => {
    e.preventDefault();
    setLoading(true)
    if(!input.email || !input.password)
      {
      window.toastify('Required all fields','error')
      }
      else
      {
        await axios.post(`${USER_API_END_POINT}/login`,input,{
          headers : {
            'Content-Type' : 'application/json'
          },
          withCredentials : true
        })
        .then(res => {
          navigate("/");
          console.log(res)
      window.toastify(res.data.message,'success');
      dispatch(setUser(res.data.user))
        })
        .catch(err => {
          console.log(err)
          window.toastify(err.response.data.message,'error');
        })
      }
      setLoading(false)
  }
  return (
    <div className='h-[100vh] w-full flex justify-center items-center bg-gray-50'>
      <div className='border h-[80vh] w-full custom:w-[90%] custom:mx-0 md:mx-24 xs:mx-10 mx-2 lg:w-[80%] xl:max-w-[70vw] xl:max-h-[70vh] 2xl:w-fit 2xl:h-fit grid grid-cols-12 rounded-2xl overflow-hidden bg-white'>
        <div className='custom:col-span-7 col-span-12 flex justify-center flex-col 2xl:p-3  order-2 custom:order-1'> 
            <form 
            onSubmit={submitHandler}
            className='sm:w-[80%] p-0 sm:p-7'>
                <div className=''>
                  <h2 className='text-h2 text-center gradient-text'>Sign in</h2>
                  <div className='text-lg flex justify-center gap-2 ms:my-2'>
                    <div className='p-3 border border-slate-200 rounded-full cursor-pointer'>
                  <BiLogoFacebook/>
                    </div>
                    <div className='p-3 border border-slate-200 rounded-full cursor-pointer'>
                  <FaGoogle/>
                    </div>
                    <div className='p-3 border border-slate-200 rounded-full cursor-pointer'>
                  <GrLinkedinOption/>
                    </div>
                  </div>
                  <p className='text-ps text-gray-400 text-center'>or use your email account. </p>
                </div>
                <div>
                  <LoginInput changeHandler={changeHandler} />
                </div>
                   <div>
                              <RadioGroup value={input.role} onValueChange={(val) => radioHandler(val)}>
                               <div className="flex gap-5 ml-3">
                               <div className="flex items-center space-x-2 cursor-pointer">
                                  <RadioGroupItem value="student" id="option-one" />
                                  <Label htmlFor="option-one">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2 cursor-pointer">
                                  <RadioGroupItem value="teacher" id="option-two" />
                                  <Label htmlFor="option-two">Teacher</Label>
                                </div>
                               </div>
                              </RadioGroup>
                            </div>
                <div className='ml-0 sm:ml-3'>
            <Button className='px-10 py-5 rounded-full border text-white bg-cyan mt-2'>
               {
                              !loading ? <span>SIGN IN</span> :         
              <span className="loading loading-spinner loading-md"></span>
                            }
            </Button>
                </div>
            </form>
        </div>
        <div className='custom:col-span-5 col-span-12 bg-cyan flex justify-center items-center 2xl:p-3 p-0 order-1 custom:order-2'>
          <div className='w-fit text-white'>
          <h2 className='text-h2'>Hello, Friend!</h2>
            <p className='text-p'>Enter your personal details</p>
            <p className='text-p'>and start journey with us.</p>
            <Link to='/auth/signup'>
            <Button className='px-10 py-5 rounded-full border border-white mt-2'>SIGN UP</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login