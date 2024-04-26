import React, { useState, useCallback, useMemo } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// Enhanced Calendar with Drag and Drop functionality
const DnDCalendar = withDragAndDrop(Calendar);

function Schedule() {
  const [events, setEvents] = useState([]);

  const handleSelectSlot = useCallback(({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { id: Date.now(), title, start, end } // Using current timestamp as unique id
      ]);
    }
  }, []);

  const handleSelectEvent = useCallback(
    (event) => {
      window.alert(event.title);
    },
    []
  );

  const moveEvent = useCallback(({ event, start, end }) => {
    setEvents((prevEvents) => prevEvents.map((evt) =>
      evt.id === event.id ? { ...evt, start, end } : evt
    ));
  }, []);

  const localizer = momentLocalizer(moment);
  const defaultDate = useMemo(() => new Date(), []);
  const scrollToTime = new Date(1970, 1, 1, 6);

  return (
    <div style={{ padding: "8vh 8vw" }}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onEventDrop={moveEvent}
        onEventResize={moveEvent}
        resizable
        selectable
        scrollToTime={scrollToTime}
        style={{ height: "80vh" }} // Make sure the calendar has enough space to display properly
      />
    </div>
  );
}

export default Schedule;
