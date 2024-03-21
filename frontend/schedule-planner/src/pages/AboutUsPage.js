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
                    <div className="font-medium text-lg text-black">
                        Our team
                    </div>
                    <div className="flex justify-center items-center">
                        Our team consists of a group of University of Texas at Dallas students developing a senior capstone project.
                        We aim to provide students with a comprehensive tool for managing their academic schedules efficiently. 
                        Key features include user registration/login, schedule management for classes and assignments, exam scheduling, resource management and customizing options.
                    </div>
                </div>
            </div>
            <div className="flex flex-row mt-32 mb-60 ml-10 mr-10">
                <div className="flex flex-col ml-10 mr-10 justify-center items-center">
                    <div className="font-medium text-lg text-black">
                        Our mission
                    </div>
                    <div>
                        The UTD Degree Roadmap will overcome the hassle of spending hours every semester figuring out your schedule. 
                        This application will allow you to input your degree and will come up with a plan that will work for your entire degree. 
                        The roadmap will also allow you to custom pick classes that you wish to take, allowing you to include electives that are not specific to your degrees. 
                    </div>
                </div>
                <img src="homepage.png" alt="homepage" className="w-4/12 lg:w-5/12"/>
            </div>
            <div className='flex flex-row w-auto justify-between ml-20 mr-20 mb-10'>
                <Blurb 
                    className=""
                    name={"Neal Gandhi"}
                    responsibility={"Full Stack Developer"}
                    img={""}
                />
                <Blurb 
                    className=""
                    name={"Kirin Chhikara"}
                    responsibility={"API Developer"}
                    img={""}
                />
                <Blurb 
                    className=""
                    name={"Reese Hoffart"}
                    responsibility={"Database Admin"}
                    img={""}
                />
                <Blurb 
                    className=""
                    name={"Ahmed Sheikh"}
                    responsibility={"Frontend Developer"}
                    img={""}
                />
                <Blurb 
                    className=""
                    name={"Yara Jandal"}
                    responsibility={"Full Stack Developer"}
                    img={""}
                />
            </div>
        </div>
    )
}


export default AboutUs;