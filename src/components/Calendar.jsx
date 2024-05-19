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
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button'

import { addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/firebase'
import { format } from 'date-fns'

// const events = [
//   { title: 'Meeting', start: new Date() },
// ]

export default function Calendar() {
  const [dialogDescription, setDialogDescription] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [breakHours, setBreakHours] = useState("");
  const [breakMinutes, setBreakMinutes] = useState("");
  const [repeat, setRepeat] = useState("");
  const [date, setDate] = useState("");

  // Show scheduler
  const handleDateClick = (arg) => {
    setDate(arg.dateStr)
    const date = format(new Date(arg.dateStr), "MMM dd, yyyy");
    setDialogDescription(date);
    setIsDialogOpen(true);
  };

  // Close scheduler
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const [selectedRange, setSelectedRange] = useState(null);
  const [isStart, setIsStart] = useState("");
  const [isEnd, setIsEnd] = useState("");

  const handleDateSelect = (info) => {
    setSelectedRange({
      start: info.startStr,
      end: info.endStr,
    });
    const startz = format(new Date(info.startStr), "MMM dd, yyyy")
    const endz = format(new Date(info.endStr), "MMM dd, yyyy")
    setIsStart(info.startStr) 
    setIsEnd(info.endStr)
    setIsDialogOpen(true);
    setDialogDescription(startz + " - " +endz)  
  };

  // Submit button
  const transferData = async () => {
    event.preventDefault();
    toast.success("Success")
    setIsDialogOpen(false);
    
    const currentUser = auth.currentUser;
    const userUID = currentUser.uid
    if (!currentUser) { 
      await addDoc(collection(db, "Anonymous", userUID, "facets"), {
        title: taskName,
        hour: hours,
        minute: minutes,
        breakHour: breakHours,
        breakMinute: breakMinutes,  
        repeat: repeat,
        date: date,
        start: isStart,
        end: isEnd
      });
    }
    try {
      // Save the input values to Firestore
      // use getDoc to retrieve data with docref.id or doc.id shit
      await addDoc(collection(db, "Poro-work-database", userUID, "facets"), {
        title: taskName,
        hour: hours,
        minute: minutes,
        breakHour: breakHours,
        breakMinute: breakMinutes,  
        repeat: repeat,
        date: date,
        start: isStart,
        end: isEnd
      }); 

      setTaskName('');
      setHours('');
      setMinutes('');
      setBreakHours('');
      setBreakMinutes('');
      setRepeat('');
    } catch (error) {
      alert.error('Error saving data to Firestore:', error);
    }
  }

  // validates form
  const isFormValid =
    taskName.trim().length >= 3 ||
    hours.trim().length >= 1 ||
    minutes.trim().length >= 1 ||
    breakHours.trim().length >= 1 ||
    breakMinutes.trim().length >= 1 ||
    repeat.trim().length >= 1;

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEventFromFirestore = async () => {
      const userUID = auth.currentUser.uid;
      const docRef = await getDocs(collection(db, "Poro-work-database", userUID, "facets")); 
      const subDocRef = docRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(subDocRef)
    } 
    fetchEventFromFirestore()
    
  }, []);

    return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
        <form onSubmit={transferData}>
          <DialogHeader>
            <div className='flex flex-col items-center'>
              <DialogTitle className="text-3xl font-bold">Set your Schedule</DialogTitle>
              <p className='bg-slate-700 py-1 px-3 rounded-2xl text-md mt-2'>Today is {dialogDescription}</p>
            </div>
            <DialogDescription className="py-5 text-sm">
              <Label htmlFor="task" className="text-lg">Task Name:</Label>  
              <Input            
                className="mt-2 text-[16px]"   
                id="task"
                type="text"
                required
                placeholder="Enter Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
                <div className='grid grid-cols-2 gap-3 mt-4'>
                  <div>
                    <Label htmlFor="hours" className="text-lg">Hours</Label>
                    <Input          
                      className="mt-2 text-[16px]"   
                      id="hours"
                      type="number"
                      min="1"
                      max="12"
                      placeholder="Enter hours"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}/>
                  </div> 
                  <div>
                    <Label htmlFor="minutes" className="text-lg">Minute</Label>
                    <Input          
                      className="mt-2 text-[16px]"   
                      id="minutes"
                      type="number"
                      min="1"
                      max="59"
                      placeholder="Enter minutes"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="breakHour" className="text-lg">Break Hour</Label>
                    <Input         
                      className="mt-2 text-[16px]"   
                      id="breakHour"
                      type="number"
                      min="1"
                      max="12"
                      placeholder="Enter break"
                      value={breakHours}
                      onChange={(e) => setBreakHours(e.target.value)} 
                      />
                  </div> 
                  <div>
                    <Label htmlFor="breakMinutes" className="text-lg">Break Minutes</Label>
                    <Input        
                      className="mt-2 mb-4 text-[16px] [-moz-appearance: textfield]"   
                      id="breakMinutes"
                      type="number"
                      min="1"
                      max="59"
                      placeholder="Enter break"
                      value={breakMinutes}
                      onChange={(e) => setBreakMinutes(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="repeat" className="text-lg">Repeat</Label>
                  <Select id="">
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
                onClick={transferData}
                disabled={!isFormValid}
                >Save</Button>
          </DialogFooter>
        </form>
        </DialogContent>
      </Dialog>

      <FullCalendar
        eventColor='#4338ca'
        selectable={true}
        selectOverlap={true}
        plugins={[ dayGridPlugin, timeGridPlugin ,interactionPlugin]}
        initialView={`dayGridMonth`}
        dateClick={handleDateClick}
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        select={handleDateSelect}
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
