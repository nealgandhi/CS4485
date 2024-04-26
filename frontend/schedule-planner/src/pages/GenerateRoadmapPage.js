import React, { useState, useEffect } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

function GenerateRoadmapPage () {
    let navigate = useNavigate();
    const location = useLocation()
    const [user, setUser] = useState()
    const token = location.state.passToken
    const [currentSemester, setCurrentSemester] = useState();
    const [schedule, setSchedule] = useState([])
    const [sem0, setSem0] = useState([])
    const [sem1, setSem1] = useState([])
    const [sem2, setSem2] = useState([])
    const [sem3, setSem3] = useState([])
    const [sem4, setSem4] = useState([])
    const [sem5, setSem5] = useState([])
    const [sem6, setSem6] = useState([])

    useEffect(() => {
        (async() => {
            try {
                const r = await fetch("http://143.198.48.114:8080/validate/" + token);
                if(!r.ok) {
                    throw new Error('token not passed')
                }
                const m = await r.json();
                // console.log(m)
                setUser(m.email)
            }
            catch(error) {
                alert("Token not found. Please check the login.")
                navigate('/login')
            }
    })()
}, [])

    const handleGenerate = async() => {
        const target = "http://143.198.48.114:8080/post/user/" + user + "/currentsemester"
        var cS = currentSemester;
        setSchedule([])
        while(cS !== 8) {
            const semesterBody = "currentsemester=" + cS
            try {
                const r = await fetch(target, {
                    method: "POST",
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    body: semesterBody
                });
                if(!r.ok) {
                    throw new Error('semesterNotSet')
                }
                generateSchedule(cS)
                cS++;
            }
            catch(error) {
                alert("User could not set semester.")
                console.log(error)
                return
            }
        }
        formatSchedule()
    }

    const generateSchedule = async(cS) => {
        try {
            const r = await fetch("http://143.198.48.114:8080/get/user/" + user + "/semester/2024.1/generateverify");
            if(!r.ok) {
                throw new Error('scheduleNotGenerated')
            }
            const m = await r.json();
            {m.courses.map((a)=>           //Creates list of inputed courses
                {var c = a.courseID.String
                const currentValue = {semester: cS, courseId: c}
                setSchedule((ls) => [...ls, currentValue]) 
                }
            )}
        }
        catch(error) {
            alert("Could not generate schedule")
        }
    }

    const formatSchedule = () => {
        console.log(currentSemester, schedule)
        setSem0([]); setSem1([]); setSem2([]); setSem3([]); setSem4([]); setSem5([]); setSem6([])

        {schedule?.map((a)=>           //Creates list of inputed courses
                {
                    if(currentSemester==7) {
                        setSem0((ls) => [...ls, a.courseId])
                    }
                    else if(currentSemester==6) {
                        if(a.semester=="6") {
                            setSem0((ls) => [...ls, a.courseId])
                        }
                        else {
                            setSem1((ls) => [...ls, a.courseId])
                        }
                    }
                    else if(currentSemester==5) {
                        if(a.semester=="5") {
                            setSem0((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="6") {
                            setSem1((ls) => [...ls, a.courseId])
                        }
                        else {
                            setSem2((ls) => [...ls, a.courseId])
                        }
                    }
                    else if(currentSemester==4) {
                        if(a.semester=="4") {
                            setSem0((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="5") {
                            setSem1((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="6"){
                            setSem2((ls) => [...ls, a.courseId])
                        }
                        else {
                            setSem3((ls) => [...ls, a.courseId])
                        }
                    }
                    else if(currentSemester==3) {
                        if(a.semester=="3") {
                            setSem0((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="4") {
                            setSem1((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="5"){
                            setSem2((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="6"){
                            setSem3((ls) => [...ls, a.courseId])
                        }
                        else {
                            setSem4((ls) => [...ls, a.courseId])
                        }
                    }
                    else if(currentSemester==2) {
                        if(a.semester=="2") {
                            setSem0((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="3") {
                            setSem1((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="4"){
                            setSem2((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="5"){
                            setSem3((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="6"){
                            setSem4((ls) => [...ls, a.courseId])
                        }
                        else {
                            setSem5((ls) => [...ls, a.courseId])
                        }
                    }
                    else {
                        if(a.semester=="1") {
                            setSem0((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="2") {
                            setSem1((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="3"){
                            setSem2((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="4"){
                            setSem3((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="5"){
                            setSem4((ls) => [...ls, a.courseId])
                        }
                        else if(a.semester=="6"){
                            setSem5((ls) => [...ls, a.courseId])
                        }
                        else {
                            setSem6((ls) => [...ls, a.courseId])
                        }
                    }
                }
            )}
            console.log("0", sem0)
            console.log("1", sem1)
            console.log("2", sem2)
            console.log("3", sem3)
            console.log("4", sem4)
            console.log("5", sem5)
            console.log("6", sem6)
    }

    const semesterInput = event => {   //handle when course input is changing (allows user to type in input)
        setCurrentSemester(event.target.value);
    }
    
    return (
        <div className='flex flex-col h-auto ml-10 mb-10'>
            <div className="mt-16 w-3/4">
                <h1 className="text-3xl font-semibold">Course Generation</h1>
                <p className="mt-4">Hello {user}, this page will generate the courses that you should take. Enter the amount of semesters you have been at school.
                For example, if this is your very first semester in college, you're in semester 1.</p>
            </div>
            <div className='flex flex-col mt-12'>
                <div className='w-3/4'>
                    <div>
                        <label className='mr-8'>Current Semester</label>
                        <select onChange={semesterInput} className='w-1/2 border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'>
                            <option value="null">Choose a semester</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                </div>
            </div>
            <button onClick={handleGenerate} className="w-64 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-red-800 text-white font-semibold mt-8">Generate your Roadmap</button>
            <div className='flex flex-row flex-wrap'>
                <div className='mt-8 w-1/2 lg:w-1/3'>
                    <label className='text-xl font-semibold'>
                        Next Semester:
                    </label>
                    {sem0.map((a)=>           //Creates list of inputed courses
                        <div className='flex flex-row w-max py-1 rounded-xl bg-theme-orange text-theme-navy font-semibold border-2 border-theme-navy mb-2 px-2'>
                            <div className=''>{a} </div>
                        </div>
                    )}
                </div>
                <div className='mt-8 w-1/2 lg:w-1/3'>
                    <label className='text-xl font-semibold'>
                        Second Semester:
                    </label>
                    {sem1.map((a)=>           //Creates list of inputed courses
                        <div className='flex flex-row w-max py-1 rounded-xl bg-theme-orange text-theme-navy font-semibold border-2 border-theme-navy mb-2 px-2'>
                            <div className=''>{a} </div>
                        </div>
                    )}
                </div>
                <div className='mt-8 w-1/2 lg:w-1/3'>
                    <label className='text-xl font-semibold'>
                        Third Semester:
                    </label>
                    {sem2.map((a)=>           //Creates list of inputed courses
                        <div className='flex flex-row w-max py-1 rounded-xl bg-theme-orange text-theme-navy font-semibold border-2 border-theme-navy mb-2 px-2'>
                            <div className=''>{a} </div>
                        </div>
                    )}
                </div>
                <div className='mt-8 w-1/2 lg:w-1/3'>
                    <label className='text-xl font-semibold'>
                        Fourth Semester:
                    </label>
                    {sem3.map((a)=>           //Creates list of inputed courses
                        <div className='flex flex-row w-max py-1 rounded-xl bg-theme-orange text-theme-navy font-semibold border-2 border-theme-navy mb-2 px-2'>
                            <div className=''>{a} </div>
                        </div>
                    )}
                </div>
                <div className='mt-8 w-1/2 lg:w-1/3'>
                    <label className='text-xl font-semibold'>
                        Fifth Semester:
                    </label>
                    {sem4.map((a)=>           //Creates list of inputed courses
                        <div className='flex flex-row w-max py-1 rounded-xl bg-theme-orange text-theme-navy font-semibold border-2 border-theme-navy mb-2 px-2'>
                            <div className=''>{a} </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GenerateRoadmapPage