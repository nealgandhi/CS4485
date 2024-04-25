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
                    <div className='pb-16'>
                        <div class="duration-300 hover:shadow-xl">
                            <img style={{width: "100vw", height: "100%"}}src="./UTD.jpg" alt="The UTD mall with a student walking by"/>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-0 text-center'>
                    <div class="mr-24 mb-10 ">
                        <div className="font-medium text-xl text-black font-semibold">
                                Our Mission
                        </div>
                        <p class="pb-8 text-base text-center text-gray-700 md:text-lg">Our team consists of dedicated students from the University of Texas at Dallas who are actively involved in the development of a senior capstone project. Our primary aim is to create a robust tool that significantly improves the efficiency of academic scheduling for students. This endeavor entails the integration of various sophisticated functionalities to streamline the scheduling process effectively. At the core of our project lies a commitment to addressing the complex scheduling needs of university students. With a focus on enhancing academic productivity and organization, our tool offers a comprehensive suite of features. These include but are not limited to user authentication protocols to ensure data security, intuitive schedule organization capabilities for both classes and assignments, seamless integration of exam timetables, efficient resource coordination functionalities, and customizable settings to cater to individual preferences and requirements. Through meticulous research and development, we are dedicated to delivering a solution that not only meets but exceeds the expectations of our users. By leveraging our collective expertise and leveraging the latest technological advancements, we aim to revolutionize the way students manage their academic schedules, ultimately empowering them to achieve their academic goals with greater ease and efficiency.</p>
                    </div>
                    <div class="ml-24 mb-10">
                        <div className="font-medium text-xl text-black font-semibold">
                                Our team
                        </div>
                        <p class="pb-8 text-base text-center text-gray-700 md:text-lg"> The UTD Degree Roadmap serves as an indispensable tool for students seeking to optimize their academic journey at the University of Texas at Dallas. By offering a streamlined approach to schedule planning, it significantly reduces the time and effort traditionally required for semester-by-semester scheduling tasks. This innovative application simplifies the process by allowing users to input their degree requirements, subsequently generating a meticulously crafted plan tailored to their individual academic pathways. Beyond its fundamental role in guiding students through their required coursework, the UTD Degree Roadmap introduces a new level of versatility and adaptability to the scheduling process. One notable feature is its capability to accommodate elective courses outside of the primary degree program. This functionality empowers users with the freedom to explore additional areas of interest, thereby enriching their educational experience and fostering a more well-rounded academic profile. Moreover, the UTD Degree Roadmap remains responsive to the evolving needs and preferences of its users. Through ongoing updates and enhancements, it continues to provide an intuitive and user-friendly interface that ensures ease of navigation and accessibility for all students. By leveraging technology to streamline the scheduling process and enhance customization options, this application exemplifies the university's commitment to fostering academic success and empowering students to achieve their educational goals with confidence and efficiency.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Home;