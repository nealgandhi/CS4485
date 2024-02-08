import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

function Schedule() {
    const localizer = momentLocalizer(moment)
    const myEventsList = []
    return (
        <div>
            <Calendar 
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{
                    height:500
                }}
            />
        </div>
    );
}

export default Schedule;