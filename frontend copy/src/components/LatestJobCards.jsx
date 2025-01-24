import React from 'react'

function LatestJobCards({item}) {
  return (
    <div className='text-sm border shadow-lg px-4 py-2'>
      <div>
        <h1 className='font-semibold text-lg'>{item.company?.name}</h1>
        <p className='text-slate-500 font-semibold'>{item.location}</p>
        <h2 className='font-bold text-lg'>{item.title}</h2>
        <p className='text-slate-500 mt-2 mb-4'>{item.description}</p>
      </div>
       <div className='text-[11px] flex gap-3'>
       <div className='bg-gray-100 font-semibold text-blue-600 p-[1px] px-2'>{item.position}</div>
       <div className='bg-gray-100 font-semibold text-red-600 p-[1px] px-2'>{item.jobType}</div>
       <div className='bg-gray-100 font-semibold text-purple-600 p-[1px] px-2'>{item.salary} LPA</div>
       </div>
    </div>
  )
}

export default LatestJobCards