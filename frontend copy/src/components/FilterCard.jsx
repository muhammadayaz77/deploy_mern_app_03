import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const filter = [
  {
    filterType : 'country',
    array : ["india","pakistan","bangladesh","nepal"]
  },
  {
    filterType : 'Industry',
    array : ["Frontend Developer","Backend Developer","Data science","FullStack Developer"]
  },
  {
    filterType : 'salary',
    array : ["0-40k","20-30k","100k","200k"]
  }
]

function FilterCard() {
  return (
    <div>
      <h1 className='text-xl font-semibold text-gray-500 mt-10'>Filter Jobs</h1>
      {
        filter.map((item,i)=>(
        <>
        <h1 className='mt-3 font-semibold text-lg'>{item.filterType}</h1>
        {
          item.array.map(arr => (
            <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2 mb-1 mt-1">
              <RadioGroupItem value={arr} id="r1" />
              <Label htmlFor="r1">{arr}</Label>
            </div>
          </RadioGroup>
          ))
        }
   
    </>

        ))
      }
    </div>
  )
}

export default FilterCard