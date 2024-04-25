import React, { useState, useEffect } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

function RoadmapPage({token}) {

    const [prefix, setPrefix] = useState(""); 
    const [number, setNumber] = useState("");
    const [coursesTakenList, setCoursesTakenList] = useState([]);   //keeps track of all entered courses
    const location = useLocation()
    let navigate = useNavigate();
    const [user, setUser] = useState()
    const [semesterYear, setSemesterYear] = useState("")
    const [semesterNum, setSemesterNum] = useState()
    const [courseHistoryList, setCourseHistoryList] = useState([])

    useEffect(() => {
        (async() => {
            try {
                const token = location.state.passToken
                const r = await fetch("http://143.198.48.114:8080/validate/" + token);
                if(!r.ok) {
                    throw new Error('token not passed')
                }
                const m = await r.json();
                console.log(m)
                setUser(m.email)
            }
            catch(error) {
                alert("Token not found. Please check the login.")
                navigate('/login')
            }
    })()
}, [])
    
    const handleSubmitClick = async() => {       //handles when submit button pressed, adds course to box underneath
        if(!semesterYear) {
            alert("Please enter the year this course was taken")
            return
        }
        if(semesterNum === "null") {
            alert("Please enter the semester this course was taken")
            return
        }
        try {
            const r = await fetch("http://143.198.48.114:8080/get/course/" + prefix + "/" + number + "/info");
            if(!r.ok) {
                throw new Error('class not found')
            }
            const m = await r.json();
            const currentCourse = [m.info.id, semesterYear, semesterNum]
            console.log(currentCourse)
            setCoursesTakenList((ls)=>[...ls,currentCourse])
        }
        catch(error) {
            alert("Class not found. Please check the class prefix and number again.")
        }
    }

    const getCourseList = () => {
        var courses = "courses="
        {coursesTakenList.map((a)=>           //Creates list of inputed courses
            courses = courses + a[0] + ","
        )}
        courses = courses.substring(0, courses.length - 1)
        return courses
    }

    const handleConfirm = async() => {
        const target = "http://143.198.48.114:8080/post/user/" + user + "/semester/" + semesterYear + "." + semesterNum + "/courses"
        var courses = getCourseList()
        setCourseHistoryList([])
        try {
            const r = await fetch(target, {
                method: "POST",
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body: courses
            });
            if(!r.ok) {
                throw new Error('classNotAdded')
            }
            alert("Classes has been added.")
            handleHistory()
            setCoursesTakenList([])
        }
        catch(error) {
            alert("Classes could not be added.")
            console.log(error)
            handleHistory()
            setCoursesTakenList([])
        }
    }

    const handleHistory = async() => {
        // setCourseHistoryList([])
        try {
            const r = await fetch("http://143.198.48.114:8080/get/user/" + user + "/courses");
            if(!r.ok) {
                throw new Error(r.status)
            }
            const m = await r.json();
            console.log(m)
            if(m[2020.3] !== null) {
                {m[2020.3].map((a)=> {          //Creates list of inputed courses
                    const currentCourse = [a.courseID, "Fall 2020"]
                    setCourseHistoryList((ls) => [...ls, currentCourse])
                }
                )}
            }
            if(m[2021.1] !== null) {
                {m[2021.1].map((a)=> {          //Creates list of inputed courses
                    const currentCourse = [a.courseID, "Spring 2021"]
                    setCourseHistoryList((ls) => [...ls, currentCourse])
                }
                )}
            }
            if(m[2021.3] !== null) {
                {m[2021.3].map((a)=> {          //Creates list of inputed courses
                    const currentCourse = [a.courseID, "Fall 2021"]
                    setCourseHistoryList((ls) => [...ls, currentCourse])
                }
                )}
            }
            if(m[2022.1] !== null) {
                {m[2022.1].map((a)=> {          //Creates list of inputed courses
                    const currentCourse = [a.courseID, "Spring 2022"]
                    setCourseHistoryList((ls) => [...ls, currentCourse])
                }
                )}
            }
            if(m[2022.3] !== null) {
                {m[2022.3].map((a)=> {          //Creates list of inputed courses
                    const currentCourse = [a.courseID, "Fall 2022"]
                    setCourseHistoryList((ls) => [...ls, currentCourse])
                }
                )}
            }
            if(m[2023.1] !== null) {
                {m[2023.1].map((a)=> {          //Creates list of inputed courses
                    const currentCourse = [a.courseID, "Spring 2023"]
                    setCourseHistoryList((ls) => [...ls, currentCourse])
                }
                )}
            }
            if(m[2023.3] !== null) {
                {m[2023.3].map((a)=> {          //Creates list of inputed courses
                    const currentCourse = [a.courseID, "Fall 2023"]
                    setCourseHistoryList((ls) => [...ls, currentCourse])
                }
                )}
            }
            if(m[2024.1] !== null) {
                {m[2024.1].map((a)=> {          //Creates list of inputed courses
                    const currentCourse = [a.courseID, "Spring 2024"]
                    setCourseHistoryList((ls) => [...ls, currentCourse])
                }
                )}
            }
        }
        catch(error) {
            alert("Courses not found. Check request")
            console.log(error)
        }
    }

    const handleDrag = (e, c) => {             //handles dragging from available courses to selected courses to the right
        e.dataTransfer.setData("courseID", c)
    }

    const handleRemoveClick = (c) => {       //handle X button when removing inputted course
        const newList = coursesTakenList.filter((l)=>l !== c);
        setCoursesTakenList(newList);
    }

    const prefixInput = event => {   //handle when course input is changing (allows user to type in input)
        setPrefix(event.target.value);
    }
    const numberInput = event => {   //handle when course input is changing (allows user to type in input)
        setNumber(event.target.value);
    }
    const yearInput = event => {   //handle when course input is changing (allows user to type in input)
        setSemesterYear(event.target.value);
    }
    const semesterInput = event => {   //handle when course input is changing (allows user to type in input)
        setSemesterNum(event.target.value);
    }

    return (
        <div className="flex flex-col h-auto ml-10 mb-10">
            <div className="mt-16 w-3/4">
                <h1 className="text-3xl font-semibold">Plan out your degree</h1>
                <p className="mt-4">Hello {user}, type in the courses (one semester at a time) that you have already taken below. You can add onto these later if needed.</p>
            </div>
            <div className='flex flex-col mt-12'>
                <div className='w-3/4'>
                    <div>
                        <label className='mr-8'>Course Prefix</label>
                        <input
                            className='w-1/2 border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                            placeholder='Enter the course prefix' 
                            value={prefix}
                            onChange={prefixInput}
                        />
                    </div>
                    <div>
                        <label className='mr-4'>Course Number</label>
                        <input
                            className='w-1/2 border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                            placeholder='Enter the course number' 
                            value={number}
                            onChange={numberInput}
                        />
                    </div>
                    <div>
                        <label className='mr-14'>Year Taken</label>
                        <input
                            className='w-1/2 border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                            placeholder='Enter the year taken' 
                            value={semesterYear}
                            onChange={yearInput}
                        />
                    </div>
                    <div>
                        <label className='mr-4'>Semester Taken</label>
                        <select onChange={semesterInput} className='w-1/2 border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'>
                            <option value="null">Choose a semester</option>
                            <option value="1">Spring</option>
                            <option value="2">Summer</option>
                            <option value="3">Fall</option>
                        </select>
                    </div>
                    <button onClick = {handleSubmitClick} className="w-32 mt-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-700 text-white font-semibold">Add Course</button>
                </div>
                <div className="flex flex-row justify-between gap-20">
                    <div className="h-80 flex flex-wrap flex-col mt-10 ml-1">
                        <label className='text-xl font-semibold mb-4'>Courses Selected:</label>
                        {coursesTakenList.map((a)=>           //Creates list of inputed courses
                            <div draggable onDragStart={(e)=>handleDrag(e, a)} className='flex flex-row w-max justify-between gap-4 py-1 rounded-xl bg-theme-orange text-theme-navy font-semibold border-2 border-theme-navy mb-2'>
                                <div className='ml-4 cursor-pointer'>{a[0]}</div>
                                <button onClick={()=>handleRemoveClick(a)} className='flex-row text-red-700 mr-4'>X</button>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col h-auto w-1/2 mt-10'>
                        <label className='text-xl font-semibold mb-4'>Class history</label>
                        {courseHistoryList.map((a)=>           //Creates list of inputed courses
                            <div className='flex flex-row w-max py-1 rounded-xl bg-theme-orange text-theme-navy font-semibold border-2 border-theme-navy mb-2 px-2'>
                                <div className='ml-4'>{a[0]} Semester: {a[1]} </div>
                            </div>
                        )}
                    </div>
                </div>
                <button onClick={handleConfirm} className="w-32 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-800 text-white font-semibold">Confirm courses for semester {semesterYear}.{semesterNum}</button>
                {/* <button onClick={handleHistory} className="w-32 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-800 text-white font-semibold">Refresh</button> */}
            </div>
        </div>
    )
}


export default RoadmapPage