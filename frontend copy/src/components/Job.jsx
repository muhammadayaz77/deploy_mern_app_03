import React from 'react'
import { useNavigate } from 'react-router-dom'

function Job({item}) {
  let navigate = useNavigate();
  let daysAgoFtn = (mongodbTime) => {
    let time = new Date(mongodbTime);
    let currentTime = new Date();
    let timeDiff = currentTime - time;
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60))
  }
  return (
    <div className="text-sm border shadow-lg px-4 py-2">
    <div className="flex justify-between items-center">
      <p>{daysAgoFtn(item.createdAt) == 0 ? "Today" : `${daysAgoFtn(item.createdAt)} days ago`}</p>
    </div>
    <div className="flex my-3 items-center">
      <div>
        <img
          className="w-14 h-14"
          src="data:image/jpeg;base64,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"
          alt="company image"
        />
      </div>
      <div>
        <h1 className="font-semibold text-lg">{item.company.name}</h1>
        <p className="text-slate-500 font-semibold">{item.location}</p>
      </div>
    </div>
    <h2 className="font-bold text-lg">{item.title}</h2>
    <p className="text-slate-500 mt-2 mb-4">
    {item.description}
    </p>
    <div className="text-[11px] flex gap-3">
      <div className="bg-gray-100 font-semibold text-blue-600 p-[1px] px-2">
        {item.position}
      </div>
      <div className="bg-gray-100 font-semibold text-red-600 p-[1px] px-2">
        {item.jobType}
      </div>
      <div className="bg-gray-100 font-semibold text-purple-600 p-[1px] px-2">
        {item.salary} LPA
      </div>
    </div>
    <div className="text-sm my-3">
      <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-semibold mr-2"
      onClick={() => navigate(`/description/${item._id}`)}
      >Details</button>
      <button className="bg-[#6A38C2] hover:bg-[#6435b6] text-white px-4 py-2 rounded-lg font-semibold">Save For Laters</button>
    </div>
  </div>
  )
}

export default Job