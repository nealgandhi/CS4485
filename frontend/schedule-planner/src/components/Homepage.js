import React from 'react';

function Homepage() {
    return (
        <div>
            <div
            style={{
                backgroundImage: "url('/UTD.jpg')",
                width: "100%",
                paddingTop: '100%',
                paddingBottom: '100%',
                color: 'white',
                backdropFilter: 'brightness(150%)'
            }}
            ></div>
            {/* <p>This is the home page where everything cool will go</p> */}
            <button type='button' class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={console.log("This is working")}>Login/Sign Up</button>
        </div>
    );
}

export default Homepage;