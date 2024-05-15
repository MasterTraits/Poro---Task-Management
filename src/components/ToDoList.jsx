import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import Delete from '@/assets/Dell_fill.svg'
import Add from '@/assets/Add_ring_fill.png'
import Check from '@/assets/Check_fill.png'
import ExpandDown from '@/assets/Expand_down.png'
import ExpandUp from '@/assets/Expand_up.png'

const ToDoList = ({name, task}) => {
  const [show, setShow] = useState(false)

  return (
    <div className='m-5 rounded-2xl'>
      <div onClick={()=> setShow(!show)} className='flex justify-between gap-2 h-10 px-4 mb-3 bg-stone-[#101000] rounded-2xl items-center'>
        <span className='font-semibold'>{name}</span>
        <div className='flex'>
          {!show ? (
            <img src={Add} className='[filter:brightness(30%)] hover:[filter:brightness(100%)]'/>
            ) : (
            ""
            )
          }
          <img src={!show ? (ExpandUp) : (ExpandDown)} onClick={()=> setShow(!show)} className='[filter:brightness(300%)]'/>
        </div> 
      </div>
      {!show ? (
      <div className='max-h-64 bg-stone-900 rounded-2xl overflow-y-auto overflow-x-hidden'>
        {/* Put a map here to repeat */}
        <div className='group flex items-center justify-between px-3 h-10 mx-2 my-3 bg-stone-800 hover:bg-indigo-800 rounded-xl'>
          <p className='w-40 truncate'>Task name</p>
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
      ) : (
        ""
      )
      }
    </div>
  )
}

export default ToDoList