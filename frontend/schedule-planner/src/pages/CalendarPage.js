import React, { useReducer, useCallback } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function useEventScheduler(initialEvents = []) {
  const eventReducer = (state, action) => {
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
  };

  const [events, dispatch] = useReducer(eventReducer, initialEvents);

  const addEvent = useCallback((start, end, title) => {
    dispatch({ type: 'ADD', payload: { start, end, title } });
  }, []);

  const updateEvent = useCallback((event) => {
    dispatch({ type: 'UPDATE', payload: event });
  }, []);

  const deleteEvent = useCallback((eventId) => {
    dispatch({ type: 'DELETE', payload: { id: eventId } });
  }, []);

  return { events, addEvent, updateEvent, deleteEvent };
}

function Schedule() {
  const { events, addEvent, updateEvent, deleteEvent } = useEventScheduler();

  const handleSelectSlot = useCallback(({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      addEvent(start, end, title);
    }
  }, [addEvent]);

  const handleSelectEvent = useCallback((event) => {
    const title = window.prompt('Edit Event name', event.title);
    if (title) {
      updateEvent({ ...event, title });
    }
  }, [updateEvent]);

  const handleEventChange = useCallback(({ event, start, end }) => {
    updateEvent({ id: event.id, start, end });
  }, [updateEvent]);

  const eventPropGetter = (event) => ({
    style: {
      backgroundColor: '#3174ad'
    },
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
