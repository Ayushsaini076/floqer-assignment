import React, { useState } from 'react'
import { ListCollapse } from 'lucide-react';

const Card = ({jcount,year,jobs,avg}) => {
  const [second,setSecond]=useState(false);
  // console.log('hello')
  const handleClick = (e)=>{
    // console.log('hello')
    setSecond(!second);
  }
    
    avg = parseInt(avg,10);
  return (
    <>
    <div  className='w-[90%] h-auto grid grid-cols-4 gap-[5rem] items-center place-items-center text-[1.2rem] mt-[1rem] rounded-[1rem] p-[1rem] bg-white '>
        <span>{year}</span>
        <span>{jobs}</span>
        <span>{avg}</span>
        <ListCollapse onClick={handleClick} className='cursor-pointer' />
    </div>
    {second==true && <div className='ml-[35%]'>
      <div className='w-[50%] h-auto grid grid-cols-2 gap-[5rem] items-center place-items-center text-[1.4rem] mt-[2rem] rounded-[1rem] p-[0.5rem] bg-[#0360D9] text-white'>
        <span>Job titles</span>
        <span>Number of jobs per title</span>
      </div>
      {Array.from(jcount.entries()).map(([key, value]) => (
        <div className='w-[50%] h-auto grid grid-cols-2 gap-[5rem] items-center place-items-center text-[1rem] mt-[1rem] rounded-[1rem] p-[0.5rem] bg-white'>
          <span>{key}</span>
          <span>{value}</span>
        </div>
      ))}
      
      </div>}
    </>
    
  )
}

export default Card

