import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';   
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../redux/jobSlice';
import axios from 'axios';
import { APPLICATIONS_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';

function Description() {
  const {singleJob} = useSelector(store => store.job)
  const {user} = useSelector(store => store.auth)
  let isInitiallyApplied = singleJob.applications?.some(app => app.applicant === user._id);
  const [isApplied,setIsApplied] = useState(isInitiallyApplied)
  let params = useParams();
  // get single Job
  let dispatch = useDispatch();
  let jobId = params.id

  const applyJobHandler = async () => {
    await axios.get(`${APPLICATIONS_API_END_POINT}/apply/${jobId}`,{withCredentials:true})
    .then(res => {
      toast.success(res.data.message);
      setIsApplied(true);
      let updateSingleJob = {
        ...singleJob,
        applications : [
          ...singleJob.applications,
          {applicant : user?._id}
        ]
      }
      dispatch(setSingleJob(updateSingleJob)) // Real Time UI update
      console.log(res.data)
    })
    .catch(err => {
      toast.error(err.response.data.message);
      console.log(err)
    })
  }

  useEffect(() => {
    const fetchedSingleJob = async() => {
      await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{
        withCredentials : true
      })
      .then(res => {
        console.log(res)
        console.log(user)
        dispatch(setSingleJob(res.data.job))
        setIsApplied(res.data.job.applications.some(application => application.applicant == user?._id))
      })
      .catch(err => {
        console.log(err)
      })
    }
    fetchedSingleJob();
  },[params.id])
  return (
      <div className='mx-20 mt-8'>
          <div className='flex justify-between'> 
            <div>
              <h2 className='text-xl font-semibold mb-3'>{singleJob.title}</h2>
              <div className="text-[11px] flex gap-3">
      <div className="bg-gray-100 font-semibold text-blue-600 p-[1px] px-2">
        {singleJob.position}
      </div>
      <div className="bg-gray-100 font-semibold text-red-600 p-[1px] px-2">
      {singleJob.jobType}
      </div>
      <div className="bg-gray-100 font-semibold text-purple-600 p-[1px] px-2">
      {singleJob.salary} LPA
      </div>
    </div>
            </div>
            <div>
              <Button 
              onClick={isApplied ? null : applyJobHandler}
              disabled={`${isApplied ? 'true' : ''}`}
              className='bg-black text-white hover:text-white hover:bg-black'
              >{isApplied ? 'Already Applied' : "Apply Now"}</Button>
            </div>
          </div>
          <div className='mt-5 '>
            <h3 className='text-base font-semibold text-gray-800'>
        {singleJob.description}
            </h3>
            <hr className='my-3' />
            <div className='text-sm text-gray-600 tracking-tight space-y-1'>
              <p><span className='text-black font-semibold'>Role:</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>{singleJob.title}</span></p>
              <p><span className='text-black font-semibold'>Location:</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>Peshawar</span></p>
              <p><span className='text-black font-semibold'>Description:</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>{singleJob.description}</span></p>
              <p><span className='text-black font-semibold'>Experience:</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>{singleJob.experienceLevel}</span></p>
              <p><span className='text-black font-semibold'>Salary:</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>{singleJob.salary} LPA</span></p>
              <p><span className='text-black font-semibold'>Total Applicant:</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>{singleJob.applications?.length}</span></p>
              <p><span className='text-black font-semibold'>Posted Date:</span> &nbsp;&nbsp;<span>{singleJob.createdAt?.split("T")[0]}</span></p>
            </div>
          </div>
      </div>
  )
}

export default Description