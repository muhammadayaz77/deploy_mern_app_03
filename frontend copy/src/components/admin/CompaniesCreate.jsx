import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/CompanySlice';

function CompaniesCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = React.useState('');
  const registerNewCompany = async() => {
try {
  await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
    headers: {
      'Content-Type': 'application/json'
  },
  withCredentials: true
  }).then(
    (res) => {
      dispatch(setSingleCompany(res?.data?.company))
      const companyId = res?.data?.company?._id;
      toast.success("Company Created Successfully")
      navigate(`/admin/companies/${companyId}`)
      console.log(res)
}
  )
  .catch((error) => {
    console.log(error)
  })
} catch (error) {
  console.log(error)
}

  }
  
  return (
    <div className='mx-40 mt-5'>
      <div className='mb-5'>
        <h2 className='text-xl font-bold tracking-tight'>Your Company Name</h2>
        <p className='text-sm text-gray-500'>What would you like to give your company name ? You can change it later</p>
      </div>
      <div>
        <p className='font-semibold '>Company Name</p>
        <input
        onChange={(e) => setCompanyName(e.target.value)}
        type="text" className='border border-gray-400 outline-none p-1 w-1/2' placeholder='Company Name' />
      </div>
      <div className='mt-5 flex gap-2'>
        <Button
        onClick={() => navigate("/admin/companies")}
        variant='outline'>Cancel</Button>
        <Button 
        onClick={registerNewCompany}
        className='bg-black text-white hover:bg-black hover:text-white hover:shadow-lg'>Continue</Button>
      </div>
    </div>
  )
}

export default CompaniesCreate