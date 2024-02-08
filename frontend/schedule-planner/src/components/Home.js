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
                <div className="flex flex-col min-h-screen justify-center items-center">
                    <h1 className='text-theme-orange text-5xl font-semibold mb-8'>UTD Schedule Planner</h1>
                    <a href="/login" class="text-center w-1/6 h-18 text-white bg-theme-navy hover:bg-navy-dark focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-theme-blue dark:hover:bg-navy-dark focus:outline-none dark:focus:ring-theme-navy">Login / Sign Up</a>
                </div>
            </div>
        </div>
    );
}

export default Home;