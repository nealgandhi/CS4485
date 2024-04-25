import React, {useState, useCallback, useMemo} from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'


function Schedule() {
    const [myEvents, setEvents] = useState([""])

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title) {
            setEvents((prev) => [...prev, { start, end, title }])
        }
        },
        [setEvents]
    )

    const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
        []
    )

    const { defaultDate, scrollToTime, dayLayoutAlgorithm } = useMemo(
        () => ({
        defaultDate: new Date(new Date(Date.now())),
        scrollToTime: new Date(1970, 1, 1, 6),
        dayLayoutAlgorithm: "no-overlap"
        }),
        []
    )
    const localizer = momentLocalizer(moment)
    return (
        <div style={{
            paddingTop: "8vh",
            paddingBottom: "8vh",
            paddingRight: "8vw",
            paddingLeft: "8vw"
            }}>
            <div style={{
                paddingTop: "4vh",
                paddingBottom: "4vh"
            }}>
                <Calendar
                defaultDate={defaultDate}
                defaultView={Views.WEEK}
                dayLayoutAlgorithm={dayLayoutAlgorithm}
                events={myEvents}
                date={new Date(Date.now())}
                toolbar
                localizer={localizer}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                scrollToTime={scrollToTime}
                />
        </div>
      </div>
    );
}

export default Schedule;