import React, { useReducer, useCallback } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function eventReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), ...action.payload }];
    case 'UPDATE':
      return state.map(evt => evt.id === action.payload.id ? { ...evt, ...action.payload } : evt);
    case 'DELETE':
      return state.filter(evt => evt.id !== action.payload.id);
    default:
      return state;
  }
}

function Schedule() {
  const [events, dispatch] = useReducer(eventReducer, []);

  const handleSelectSlot = useCallback(({ start, end }) => {
    const title = window.prompt('New Event name'); 
    if (title) {
      dispatch({ type: 'ADD', payload: { title, start, end } });
    }
  }, []);

  const handleSelectEvent = useCallback((event) => {
    const title = window.prompt('Edit Event name', event.title); 
    if (title) {
      dispatch({ type: 'UPDATE', payload: { ...event, title } });
    }
  }, []);

  const handleDeleteEvent = useCallback((eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) { 
      dispatch({ type: 'DELETE', payload: { id: eventId } });
    }
  }, []);

  const handleEventChange = useCallback(({ event, start, end }) => {
    dispatch({ type: 'UPDATE', payload: { id: event.id, start, end } });
  }, []);

  
  const eventPropGetter = (event, start, end, isSelected) => ({
    onDoubleClick: () => handleSelectEvent(event),

  });

  return (
    <div style={{ padding: "8vh 8vw" }}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        defaultDate={new Date()}
        defaultView={Views.WEEK}
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onEventDrop={handleEventChange}
        onEventResize={handleEventChange}
        eventPropGetter={eventPropGetter}
        resizable
        selectable
        style={{ height: "80vh" }}
      />
      
    </div>
  );
}

export default Schedule;
