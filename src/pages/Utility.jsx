import React, { useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import ToDoList from '@/components/ToDoList'
import Modetoggle from '@/components/mode-toggle' 
import UtitlityNav from '@/components/UtilityNav'
import Calendar from '@/components/Calendar'
import Display from '@/components/ui/calendar'

const Utility = () => {
  const [show, setShow] = useState(false);

  return (
    <>
    <UtitlityNav/>
    <main className='h-[83vh] mx-8 border-slate-500 border-[1px] rounded-2xl'>
      <ResizablePanelGroup direction="horizontal" className="rounded-2xl overflow-y-scroll">
        {!show ? (
          <>
          <ResizablePanel defaultSize={20} minSize={20} maxSize={50} className='bg-zinc-900'>
            <div className='flex justify-between m-5 text-3xl font-bold text-wrap'>
              Welcome, User
              <Modetoggle/>
            </div>
            <div className='flex justify-center'><Display className='border-[1px rounded-xl'/></div>
            <ToDoList name="Today's To-do List:"/>
            <ToDoList name="Future Work:"/>
            
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