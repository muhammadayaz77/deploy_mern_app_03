import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import useGetCompanyById from '../../hooks/useGetCompanyById';

function CompaniesSetup() {
  const params = useParams();
  const {singleCompany} = useSelector(store => store.company)
  const [input,setInput] = useState({
    companyName: '',
    description : '',
    website : '',
    location : '',
    file : null
  })
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  }
  const changeFileHandler = (e) => { 

    setInput({
      ...input,
      file : e.target.files[0]
    })
  }
  useGetCompanyById(params.id);
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(input)
    const formData = new FormData();
    formData.append('name',input.companyName);
    formData.append('description',input.description);
    formData.append('website',input.website);
    formData.append('location',input.location);
    if(input.file)
    {
      formData.append('file',input.file);
    }
    try {
      setLoading(true);
      await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data' 
      },
      withCredentials: true
      })
      .then(res => {
        toast.success(res.data.message);
        navigate('/admin/companies')
        console.log(res)
      })
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    setInput({  
      companyName: singleCompany.name ||'',
      description : singleCompany.description ||'',
      website : singleCompany.website || '',
      location :singleCompany.location || '',
      file : singleCompany.file || null
    })
  },[singleCompany])
  return (
    <div className='flex justify-center pt-5'>
    <form 
    onSubmit={handleSubmit}
    className='w-[50%] mt-10'>
      <div className='flex items-center gap-4'>
        <Button 
        type='button'
        onClick={() => navigate('/admin/companies')}  
        variant='outline' className='text-gray-500 px-[5px] py-[1px]'><ArrowLeft /> Back</Button>
        <h1 className='text-lg font-semibold'>Company Setup</h1>
      </div>
      <div className='w-full grid grid-cols-12 mt-5 gap-5'>

        <div className='col-span-6'>
          <label className='font-semibold'>Company Name</label>
          <input 
          onChange={changeEventHandler}
          name='companyName'
          value = {input.companyName}
          type="text" className='border border-gray-300 outline-none w-full p-2 rounded-md' />
        </div>
        <div className='col-span-6'>
          <label className='font-semibold'>Description</label>
          <input 
          onChange={changeEventHandler}
          name='description'
          value = {input.description}
          type="text" className='border border-gray-300 outline-none w-full p-2 rounded-md' />
        </div>
        <div className='col-span-6'>
          <label className='font-semibold'>Website</label>
          <input 
          onChange={changeEventHandler}
          name='website'
          value = {input.website}
          type="text" className='border border-gray-300 outline-none w-full p-2 rounded-md' />
        </div>
        <div className='col-span-6'>
          <label className='font-semibold'>Location</label>
          <input 
          onChange={changeEventHandler}
          name='location'
          value = {input.location}
          type="text" className='border border-gray-300 outline-none w-full p-2 rounded-md' />
        </div>
        <div className='col-span-12'>
          <label className='font-semibold'>Logo</label>
          <input 
          onChange={changeFileHandler}
          name='file'
          accept='image/*'   
          type="file" className='border border-gray-300 outline-none w-full p-2 rounded-md' />
        </div>
        <div className='col-span-12'>
          {/* <Button className='bg-black text-white hover:bg-black hover:text-white hover:shadow-lg w-full'>Update</Button> */}
          {
                    loading ?  <button class={`w-full text-white bg-black focus:ring-4 foc us:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center cursor-not-allowed`} disabled
                    ><Loader2
                    className='animate-spin' /> &nbsp;Please Wait</button> : 
                  <button type='submit' class="w-full text-white bg-black hover:shadow-lg  focus:ring-4 foc us:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-none">Save Changes</button>
                }
        </div>
      </div>
    </form>
    </div>
  )
}

export default CompaniesSetup