import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
function LatestJob() {
  let {allJobs} = useSelector(store => store.job)
  return (
    <div className='mx-20 my-20'>
    <h1 className='text-4xl font-bold mb-10'><span className='text-[#6a38c2]'>Latest & Top </span>Job Openings</h1>
    <div className='grid grid-cols-3 gap-5'>
      {
        allJobs.length > 0 ?
        allJobs.map((item,index)=> (
          <LatestJobCards key={item._id} item={item} />
        ))
        : 
        <span className='text-gray-700'>No Jobs Available</span>
      }

    </div>
    </div>
  )
}

export default LatestJob