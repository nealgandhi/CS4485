import React from 'react';


function Home() {
    return (
        <div>
            <div
            style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/UTD.jpg')",
                height: "100vh",
                width: "100vw",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                overflow: "hidden"
            }} 
            >
                <div className="flex flex-row min-h-screen justify-center items-center">
                <a href="/login" class="text-center w-1/6 h-18 text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-800 dark:hover:bg-blue-900 focus:outline-none dark:focus:ring-blue-800">Login / Sign Up</a>
                </div>
            </div>
        </div>
    );
}

export default Home;