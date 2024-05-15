import React, {useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

import menu from '@/assets/menu.png'
import Home from '@/assets/Home_fill.png'
import Share from '@/assets/Send_fill.png'
import Settings from '@/assets/Setting_fill.png'
import User from '@/assets/User_circle.png'


const UtilityNav = ({timer}) => {
  return (
    <header className='flex items-center justify-between h-12 my-6 mx-7 px-5 border-white border-[1px] rounded-3xl '>
      <div className='flex items-center gap-5'>
        <img src={menu} onClick={()=> setShow(!show)} className='h-3.5 '/>
        <span>Poro</span>
        <Select>
          <SelectTrigger className="h-7 w-[150px]">
            <SelectValue placeholder="Current Session" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Session</SelectItem>
            <SelectItem value="dark">Session</SelectItem>
            <SelectItem value="system">Session</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="h-7 w-[150px]"> 
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Week</SelectItem>
            <SelectItem value="dark">Day</SelectItem>
            <SelectItem value="system">Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex gap-5 items-center'>
        <Button className="h-7 bg-indigo-600 text-white">Automate Tasks</Button>
        <Button className="h-7 ">(Timer is placed here)</Button>
      </div>
      <nav className='flex gap-3 items-center'>
        <Link to="/home"><img src={Home}/></Link>  
        <a><img src={Share}/></a>
        <Dialog>
        <DialogTrigger><a><img src={Settings}/></a></DialogTrigger>
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

        <Link to=""><img src={User}/></Link>
        <Link to="/login"><Button className='h-7'>Login</Button></Link>
        <Link to="/register"><Button className='h-7 border-[1px] bg-transparent border-white text-white'>Sign-up</Button></Link>
      </nav>
    </header>
  )
}

export default UtilityNav;
