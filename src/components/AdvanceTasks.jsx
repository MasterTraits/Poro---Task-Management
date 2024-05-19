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

const AdvanceTasks = ({task, time}) => {
  return (
    <div className='max-h-64 bg-stone-900 rounded-2xl overflow-y-auto overflow-x-hidden'>
        {/* Put a map here to repeat */}
        <div className='group flex items-center justify-between px-3 min-h-15 mx-2 my-3 bg-stone-800 hover:bg-indigo-800 rounded-xl'>
          <div className='flex flex-col'>
            <p className='w-40 truncate'>{task}</p>
            <p className='w-40 truncate'>{time}</p>
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
}

export default AdvanceTasks