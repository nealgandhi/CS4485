import React from 'react';


function Home() {
    return (
    <div>
        <div class="canvas-paper">
            <div class="bg-white pt-16 pr-4 pb-16 pl-4 md:px-24 lg:px-8 lg:py-20">
            <div class="mr-auto ml-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
                <div class="mr-auto mb-10 ml-auto md:mx-auto sm:text-center lg:max-w-2xl md:mb-12 flex flex-col max-w-xl">
                    <div class="mt-6 mr-auto mb-6 ml-auto text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl
                        max-w-lg font-sans">
                        <div class="inline relative">
                        <span class="items-center justify-center w-32 text-blue-300 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block flex
                            absolute top-0 left-0 z-0 hidden -mt-8 -ml-20">
                            <svg viewbox="0 0 52 24" fill="currentColor" class="w-full h-full"><defs><pattern
                                id="9ef1ff62-feb2-41fe-8163-772b4c79de7b" x="0" y="0" width=".135" height=".30"><circle cx="1"
                                cy="1" r=".7"/></pattern></defs><rect fill="url(#9ef1ff62-feb2-41fe-8163-772b4c79de7b)" width="52"
                                height="24"/></svg>
                        </span>
                        <p class="font-bold text-3xl tracking-tight sm:text-4xl sm:leading-none inline font-sans">UTD Degree Planner</p>
                        </div>

                    </div>
                    <p class="pb-8 text-base text-center text-gray-700 md:text-lg">A tool to improve your college experience by streamlining the degree planning process. Sign Up or Log in Today. </p>
                    <div>
                        <a href="/login" class="text-center w-1/6 h-18 text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 focus:outline-none">Login / Sign Up</a>
                    </div>
                </div>
                <div>
                    <div class="duration-300 hover:shadow-xl">
                        <img style={{width: "100vw", height: "100%"}}src="./UTD.jpg"/>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
}

export default Home;