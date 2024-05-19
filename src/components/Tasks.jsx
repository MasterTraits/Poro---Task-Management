import React from 'react'
import Check from '@/assets/Check_fill.png'
import Delete from '@/assets/Dell_fill.svg'
import { useState } from 'react' 
import { auth, db } from '@/firebase'
import { addDoc, collection } from 'firebase/firestore'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

const Tasks = ({task, hour, minute}) => {
  const hasHour = hour && hour.trim().length > 0;
  console.log(task)
  const hasMinute = minute && minute.trim().length > 0;

  const displayTimeWithHour = (hour) => {
    if (hour > 0) {
      return `${hour} hr`;
    } else {
      return;
    }
  };

  const displayTimeWithMinute = (minute) => {
    if (minute > 0) {
      return `${minute} min`;
    } else {
      return;
    }
  };


  return (
    <div className='max-h-64 bg-stone-900 rounded-2xl overflow-y-auto overflow-x-hidden'>
        {/* Put a map here to repeat */}
        <div className='group flex items-center justify-between px-3 py-2 min-h-15 mx-2 my-3 bg-stone-800 hover:bg-indigo-800 rounded-xl'>
          <div className='flex flex-col'>
            <p className='w-40 truncate font-semibold'>{task}</p>
            <div className='flex gap-1 mt-1'>
              <p className={`max-w-20 px-2 rounded-xl truncate ${hasHour ? 'bg-indigo-600 group-hover:bg-indigo-200 group-hover:text-black' : ""}`}>{displayTimeWithHour(hour)}</p>
              <p className={`max-w-20 px-2 rounded-xl truncate ${hasMinute ? 'bg-indigo-600 group-hover:bg-indigo-200 group-hover:text-black' : ""}`}>{displayTimeWithMinute(minute)}</p>
            </div>
          </div>

          <div className='flex gap-1'>
          <img src={Check} alt='Check' className='invisible group-hover:visible hover:[filter:_invert(53%)_sepia(79%)_saturate(2470%)_hue-rotate(94deg)_brightness(103%)_contrast(106%)]'/>
          
          <Dialog>
            <DialogTrigger><img src={Delete} alt='delete' className='invisible group-hover:visible hover:[filter:_invert(13%)_sepia(65%)_saturate(3066%)_hue-rotate(351deg)_brightness(93%)_contrast(93%)]'/></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          </div>
        </div>
      </div>
  )
};

export default Tasks