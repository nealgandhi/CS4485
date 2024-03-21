import React from 'react';

function Footer() {
    return (
        <div
            style={{
                color: "white",
                padding: "5px",
                position: "flex",
                width: "100%",
                bottom: 0,
            }}
            className='text-center bg-theme-navy'
        >
            <p>This is our UTD CS4485 Senior Design Project. More info about us will go here</p>
        </div>
    );
}

export default Footer;