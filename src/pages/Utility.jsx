import React, { useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import ToDoList from '@/components/ToDoList'
import Modetoggle from '@/components/mode-toggle' 
import UtitlityNav from '@/components/UtilityNav'

const Utility = () => {
  const [show, setShow] = useState(false);

  return (
    <>
    <UtitlityNav/>
    <main className='h-[83vh]  mx-7 border-white border-[1px] rounded-2xl'>
      <ResizablePanelGroup direction="horizontal" className="rounded-2xl">
        {!show ? (
          <>
          <ResizablePanel defaultSize={22} minSize={22} maxSize={50}>
            <div className='flex justify-between m-5 text-3xl font-bold text-wrap'>
              Welcome, User
              <Modetoggle/>
            </div>
            <ToDoList name="Today's To-do List:"/>
            <ToDoList name="Future Work:"/>
            
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-neutral-600"/>
          </>
          ) : (
          ""
          ) 
        }
        <ResizablePanel defaultSize={78} className='bg-neutral-950'>
          <div className=''>

          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
    <p className='mt-3 mx-7 text-right'>/ 2024</p>
    </>
  )
}

export default Utility