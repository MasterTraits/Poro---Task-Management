import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

const events = [
  { title: 'Meeting', start: new Date() }
]

export default function Calendar() {
  const handleDateClick = (arg) => {
    alert(arg.dateStr)
  }
  
  return (
    <div>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin ,interactionPlugin]}
        initialView='dayGridMonth'
        dateClick={handleDateClick}
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        headerToolbar = {{
          start: "prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        height = {'83vh'}
        allDaySlot = {false}
        
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
