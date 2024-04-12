import Blurb from '../components/AboutBlurb'
import * as React from 'react'

function AboutUs() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div className="absolute w-full text-center text-5xl font-semibold mt-40">
                    About Us
                </div>
                <img src="upperRightDec.png" alt="decoration" className="flex ms-auto w-1/2 lg:w-4/12"/>
            </div>
            <div className="flex flex-row mb-32 ml-10 mr-10">
                <img src="utdBanner.jpg" alt='UTD banner' className="w-80 lg:w-5/12"/>
                <div className="flex flex-col ml-10 justify-center items-center">
                    <div className="font-medium text-lg text-black font-semibold">
                        Our team
                    </div>
                    <div className="flex justify-center items-center">
                    Our team consists of dedicated students from the University of Texas at Dallas who are actively involved in the development of a senior capstone project. Our primary aim is to create a robust tool that significantly improves the efficiency of academic scheduling for students. This endeavor entails the integration of various sophisticated functionalities to streamline the scheduling process effectively. At the core of our project lies a commitment to addressing the complex scheduling needs of university students. With a focus on enhancing academic productivity and organization, our tool offers a comprehensive suite of features. These include but are not limited to user authentication protocols to ensure data security, intuitive schedule organization capabilities for both classes and assignments, seamless integration of exam timetables, efficient resource coordination functionalities, and customizable settings to cater to individual preferences and requirements. Through meticulous research and development, we are dedicated to delivering a solution that not only meets but exceeds the expectations of our users. By leveraging our collective expertise and leveraging the latest technological advancements, we aim to revolutionize the way students manage their academic schedules, ultimately empowering them to achieve their academic goals with greater ease and efficiency.                    </div>
                </div>
            </div>
            <div className="flex flex-row mt-32 mb-60 ml-10 mr-10">
                <div className="flex flex-col ml-10 mr-10 justify-center items-center">
                    <div className="font-medium text-lg text-black font-semibold">
                        Our mission
                    </div>
                    <div>
                    The UTD Degree Roadmap serves as an indispensable tool for students seeking to optimize their academic journey at the University of Texas at Dallas. By offering a streamlined approach to schedule planning, it significantly reduces the time and effort traditionally required for semester-by-semester scheduling tasks. This innovative application simplifies the process by allowing users to input their degree requirements, subsequently generating a meticulously crafted plan tailored to their individual academic pathways. Beyond its fundamental role in guiding students through their required coursework, the UTD Degree Roadmap introduces a new level of versatility and adaptability to the scheduling process. One notable feature is its capability to accommodate elective courses outside of the primary degree program. This functionality empowers users with the freedom to explore additional areas of interest, thereby enriching their educational experience and fostering a more well-rounded academic profile. Moreover, the UTD Degree Roadmap remains responsive to the evolving needs and preferences of its users. Through ongoing updates and enhancements, it continues to provide an intuitive and user-friendly interface that ensures ease of navigation and accessibility for all students. By leveraging technology to streamline the scheduling process and enhance customization options, this application exemplifies the university's commitment to fostering academic success and empowering students to achieve their educational goals with confidence and efficiency.
                    </div>
                </div>
                <img src="homepage.png" alt="homepage" className="w-4/12 lg:w-5/12"/>
            </div>
            <div className='flex flex-row w-auto justify-between ml-4 lg:ml-20 mr-20 mb-10'>
                <Blurb 
                    className=""
                    name={"Neal Gandhi"}
                    responsibility={"Full Stack Developer"}
                    img={"neal_about.png"}
                />
                <Blurb 
                    className=""
                    name={"Kirin Chhikara"}
                    responsibility={"API Developer"}
                    img={"kirin_about.png"}
                />
                <Blurb 
                    className=""
                    name={"Reese Hoffart"}
                    responsibility={"Database Admin"}
                    img={"reese_about.png"}
                />
                <Blurb 
                    className=""
                    name={"Ahmed Sheikh"}
                    responsibility={"Frontend Developer"}
                    img={"ahmed_about.jpg"}
                />
                <Blurb 
                    className=""
                    name={"Yara Jandal"}
                    responsibility={"Full Stack Developer"}
                    img={"yara_about.png"}
                />
            </div>
        </div>
    )
}


export default AboutUs;