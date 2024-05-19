import React, { useEffect, useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import ToDoList from '@/components/ToDoList'
import AdvanceToDoList from '@/components/AdvanceToDoList'
import Modetoggle from '@/components/mode-toggle' 
import Calendar from '@/components/Calendar'
import Display from '@/components/ui/calendar'
import { ScrollArea } from "@/components/ui/scroll-area"
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
import { auth } from '@/firebase'
import { getDocs, collection } from 'firebase/firestore' 

const Utility = () => {
  const [show, setShow] = useState(false);
  const currentUser = auth.user

  return (
    <>
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

        {!currentUser ? (
          <Link to=""><img src={User}/></Link>
        ) : (
          <div className='flex gap-2'>
          <Link to="/login"><Button className='h-7'>Login</Button></Link>
          <Link to="/register"><Button className='h-7 border-[1px] bg-transparent border-white text-white'>Sign-up</Button></Link>
          </div>
        )}
   
      </nav>
    </header>




    <main className='h-[83vh] mx-8 border-slate-500 border-[1px] rounded-2xl'>
      <ResizablePanelGroup direction="horizontal" className="rounded-2xl overflow-y-scroll">
        
        {!show ? (
          <>
          <ResizablePanel defaultSize={20} minSize={20} maxSize={50} className='bg-zinc-900'>
          <ScrollArea className="h-full">
            <div className='flex justify-between m-5 text-3xl font-bold text-wrap'>
              Welcome, User
              <Modetoggle/>
            </div>
            <div className='flex justify-center'><Display className='border-[1px rounded-xl'/></div>
            <ToDoList/>
            <AdvanceToDoList/>
          </ScrollArea>  
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-neutral-500"/>
          </>
          ) : (
          ""
          ) 
        }
        
        <ResizablePanel defaultSize={78} className='bg-gradient-to-br from-neutral-950 from-10% dark:bg-white via-indigo-950 via-70% to-indigo-800 to-100% overflow-y-scroll'>
          <Calendar/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
    <p className='mt-3 mx-7 text-right'>/ 2024</p>
    
    </>
  )
  
}
export default Utility