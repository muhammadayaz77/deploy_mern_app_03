import React from 'react'
import { Badge } from "../../components/ui/badge"   
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
Table,
TableBody,
TableCaption,
TableCell,
TableFooter,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


function CompaniesTable() {
  const navigate = useNavigate();
  const {companies,searchCompanyByText} = useSelector(store => store.company)
  const [filterCompany,setFilterCompany] = useState(companies);
  useEffect(() => {
      const filteredCompany = companies.length >= 0 && companies.filter((company) => 
      {
        if(!searchCompanyByText)
        {
          return true;
        }
        return company?.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
      })  
      setFilterCompany(filteredCompany);
  },[companies,searchCompanyByText])
  return (
    <>
     <Table>
      <TableCaption>A list of your applied jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
        filterCompany.length <=0 ?
        <>
        <span>You haven't registered any company yet.</span>
        </>
        :
        filterCompany?.slice().reverse().map((company) => (
          <TableRow key={company._id}>
            <TableCell className="font-medium">
            <Avatar>
                      <AvatarImage
                        className="cursor-pointer w-10 h-10"
                        src={company.logo}
                        />
                      <AvatarFallback>CN</AvatarFallback>
          </Avatar>
            </TableCell>
            <TableCell>{company.name}</TableCell>
            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
            <TableCell className="text-right">
            <Popover>
      <PopoverTrigger asChild>
        <Button><MoreHorizontal /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 bg-white">
       <div
       onClick={() => navigate(`/admin/companies/${company._id}`)}
       className='flex items-center gap-2 cursor-pointer'>
       <Edit2 className='w-5' />
       <span className='text-base'>Edit</span>
       </div>
      </PopoverContent>
    </Popover>
            </TableCell>
          </TableRow>
        ))
        
        }
      </TableBody>
    </Table>
    </>
  )
}

export default CompaniesTable