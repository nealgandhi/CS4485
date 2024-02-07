import React from 'react';

function Header() {
    return (
        <div
            style={{
                color: "white",
                padding: "5px",
                position: "absolute",
                width: "100vw"
            }}
            className='bg-blue-800 grid-rows-4 gap-4'
        >
            <div className='grid grid-cols-4 gap-4'>
                <a href="/">Home</a>
                <a href="/calendar">Calendar</a>
            </div>
        </div>
    );
}

export default Header;