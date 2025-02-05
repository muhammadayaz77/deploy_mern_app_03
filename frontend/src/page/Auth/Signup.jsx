import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { BiLogoFacebook } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import SignupInput from "@/components/auth/SignupInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Signup = () => {
  let [option,setOption] = useState("");
  let [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role : "",
  });
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input)
  };
  const radioHandler = (value) => {
    setInput({
      ...input,
      role : value
    });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!input.fullname || !input.email || !input.password) {
      window.toastify("Required all fields", "warning");
    }else if(!input.role){
      window.toastify("Required role to enter!!!", "warning");
    }
     else {
      await axios
        .post(`${USER_API_END_POINT}/register`, input)
        .then((res) => {
          navigate("/auth/login");
          window.toastify(res.data.message, "success");
          console.log(res);
        })
        .catch((err) => {
          window.toastify(err.response.data.message, "err");
        });
    }
    setLoading(false);
  };
  return (
    <div className="min-h-[100vh] w-full flex justify-center items-center bg-gray-50">
      <div className="border min-h-[80vh] w-full custom:w-[90%] custom:mx-0 md:mx-24 xs:mx-10 mx-2 lg:w-[80%] xl:max-w-[70vw] xl:max-h-[70vh] 2xl:w-fit 2xl:h-fit grid grid-cols-12 rounded-2xl overflow-hidden bg-white">
        <div className="custom:col-span-5 col-span-12 bg-cyan flex justify-center items-center 2xl:p-3">
          <div className="w-fit text-white">
            <h2 className="text-h2">Wellcome Back!</h2>
            <p className="text-p">To keep connected with us please</p>
            <p className="text-p">login with your personal information</p>
            <Link to="/auth/login">
              <Button className="px-10 py-5 rounded-full border border-white mt-2">
                SIGN IN
              </Button>
            </Link>
          </div>
        </div>
        <div className="custom:col-span-7 col-span-12 flex justify-center flex-col 2xl:p-3">
          <form onSubmit={submitHandler} className="w-[80%]">
            <div className="">
              <h2 className="text-h2 text-center gradient-text">
                Create Account
              </h2>
              <div className="text-lg flex justify-center gap-2 my-2">
                <div className="p-3 border border-slate-200 rounded-full cursor-pointer">
                  <BiLogoFacebook />
                </div>
                <div className="p-3 border border-slate-200 rounded-full cursor-pointer">
                  <FaGoogle />
                </div>
                <div className="p-3 border border-slate-200 rounded-full cursor-pointer">
                  <GrLinkedinOption />
                </div>
              </div>
              <p className="text-ps text-gray-400 text-center">
                or use your email for registration.{" "}
              </p>
            </div>
            <div>
              <SignupInput changeHandler={changeHandler} />
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
            <div className="ml-0 sm:ml-3">
              <Button className="px-10 py-5 rounded-full border text-white bg-cyan mt-2">
                {!loading ? (
                  <span>SIGN UP</span>
                ) : (
                  <span className="loading loading-spinner loading-md"></span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
