import React from 'react';


function Header() {
    return (
        <div class="bg-white pt-4 pr-8 pb-4 pl-8 ">
            <nav class="w-full">
                <ul>
                    <div class="flex w-full justify-between max-w-screen-2xl md:flex-row mt-auto mr-auto mb-auto ml-auto ">
                        <div class="flex flex-row bg-white justify-center items-center mt-2 mb-2 md:m-0 hidden md:flex">
                            <a href="/calendar" fontfamily="Raleway" class="text-gray-600 text-center mr-6 font-medium text-base">Calendar</a>
                            <a href="/prerequisites" fontfamily="Raleway" class="text-gray-600 text-center mr-6 font-medium text-base">Prereq Chart</a>
                            <a href="/courseSelection" fontfamily="Raleway" class="text-gray-600 text-center font-medium text-base">Course Selection</a>
                        </div>
                        <div class="flex flex-row items-center content-center">
                            <a href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 md:w-16">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                </svg>
                            </a>
                        </div>
                        <div class="flex flex-row bg-white justify-center items-center md:m-0 hidden md:flex">
                            <a href="/roadmap" fontfamily="Raleway" class="text-gray-600 text-center mr-6 font-medium text-base">Roadmap</a>
                            <a href="/login" fontfamily="Raleway" class="text-gray-600 text-center mr-6 font-medium text-lg">Log In</a>
                            <a href="/signup" fontfamily="Raleway" class="text-gray-600 text-center font-medium text-lg">Sign Up</a>
                        </div>
                    </div>
                </ul>
            </nav>
        </div>
    );
}

export default Header;