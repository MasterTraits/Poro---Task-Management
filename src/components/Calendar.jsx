import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button'
import Notification from '@/assets/notification.wav'

const events = [
  { title: 'Meeting', start: new Date() }
]

export default function Calendar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogDescription, setDialogDescription] = useState("<>")

  const handleDateClick = (arg) => {
    setDialogDescription(`${arg.dateStr}`);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setDialogDescription("<>")
  };
  
  const transferData = () => {
    toast.success("It works?")
    const [play] = useSound(Notification);
    setIsDialogOpen(false);
  }

  return (
    <div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
        <form onSubmit={transferData}>
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center">Set your Schedule</DialogTitle>
            <p className='text-center'>Today is {dialogDescription}</p>
            <DialogDescription className="py-5 text-sm">
              <Label htmlFor="task" className="text-lg">Task Name:</Label>
              <Input            
                className="mt-2 text-[16px]"   
                id="task"
                type="text"
                required
                placeholder="Enter Task Name"
              />
                <div className='grid grid-cols-2 gap-3 mt-4'>
                  <div>
                    <Label htmlFor="task" className="text-lg">Hour</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="5">5 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="7">7 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="9">9 hours</SelectItem>
                        <SelectItem value="10">10 hours</SelectItem>
                        <SelectItem value="11">11 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="task" className="text-lg">Minute</Label>
                    <Input            
                      className="mt-2 text-[16px]"   
                      id="task"
                      type="minutes"
                      placeholder="2 digits only"
                    />
                  </div>
                  <div>
                    <Label htmlFor="task" className="text-lg">Hour</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="5">5 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="7">7 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="9">9 hours</SelectItem>
                        <SelectItem value="10">10 hours</SelectItem>
                        <SelectItem value="11">11 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="task" className="text-lg">Minute</Label>
                    <Input            
                      className="mt-2 mb-4 text-[16px]"   
                      id="task"
                      type="minutes"
                      placeholder="2 digits only"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="repeat" className="text-lg">Repeat</Label>
                  <Select required id="">
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Repeat all day</SelectItem>
                      <SelectItem value="dark">Repeat by week</SelectItem>
                      <SelectItem value="system">Repeat by month</SelectItem>
                    </SelectContent>
                  </Select>
                  </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex mt-3">
          <Button className="w-20" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
          <Button 
              type="submit"
              className="w-20" 
              onClick={transferData}>Save</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin ,interactionPlugin]}
        initialView='dayGridMonth'
        dateClick={handleDateClick}
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        // eventClick={}
        headerToolbar = {{
          start: "prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        height = {'83vh'}
        allDaySlot = {false}
      />
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
