import React, { useState } from 'react'

function RoadmapPage() {

    const [prefix, setPrefix] = useState(""); 
    const [number, setNumber] = useState("");
    const [semester, setSemester] = useState()
    const [coursesTakenList, setCoursesTakenList] = useState([]);   //keeps track of all entered courses
    
    const handleSubmitClick = async() => {       //handles when submit button pressed, adds course to box underneath
        try {
            // const r = await fetch("http://127.0.0.1:8080/get/course/" + prefix + "/" + number + "/info");
            // if(!r.ok) {
            //     throw new Error('class not found')
            // }
            // const m = await r.json();
            // const currentCourse = m.info.id
            // setCoursesTakenList((ls)=>[...ls,currentCourse])
            var userInfo = require('../userInfo')

            var semesterId = ""
            switch (semester) {
                case "24s": semesterId = "2024.1"; break;
                case "23f": semesterId = "2023.3"; break;
                case "23s": semesterId = "2023.1"; break;
                case "22f": semesterId = "2022.3"; break;
                case "22s": semesterId = "2022.1"; break;
                case "21f": semesterId = "2021.3"; break;
                case "21s": semesterId = "2021.1"; break;
                case "20f": semesterId = "2020.3"; break;
                default: break;
            }

            const r = await fetch("http://127.0.0.1:8080/post/user/" + userInfo.email + "/semester/" + semesterId + "/courses", {
                method:'POST',
                body:'courses='+prefix+number,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
            if(!r.ok) {
                throw new Error('class not found')
            }
            //const m = await r.json();
            //const currentCourse = m.info.id
            //setCoursesTakenList((ls)=>[...ls,currentCourse])
        }
        catch(error) {
            alert("Class not found. Please check the class prefix and number again.")
        }
    }

    const prefixInput = event => {   //handle when course input is changing (allows user to type in input)
        setPrefix(event.target.value);
    }
    const numberInput = event => {   //handle when course input is changing (allows user to type in input)
        setNumber(event.target.value);
    }
    const semesterInput = event => { 
        setSemester(event.target.value);
    }

    return (
        <div className="flex flex-col h-screen ml-10 mb-10">
            <div className="mt-16 w-3/4">
                <h1 className="text-3xl font-semibold">Plan out your degree</h1>
                <p className="mt-4">Type in the courses that you have already taken below. You can add onto these later if needed.</p>
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
                        <label className='mr-4'>Course Semester</label>
                        <select
                            className='w-1/2 border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                            placeholder='Enter the course semester' 
                            onChange={semesterInput}
                        >
                            <option value="24s">24 Spring</option>
                            <option value="23f">23 Fall</option>
                            <option value="23s">23 Spring</option>
                            <option value="22f">22 Fall</option>
                            <option value="22s">22 Spring</option>
                            <option value="21f">21 Fall</option>
                            <option value="21s">21 Spring</option>
                            <option value="20f">20 Fall</option>
                        </select>
                    </div>
                    <button onClick = {handleSubmitClick} className="w-32 mt-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-800 text-white font-semibold">Add Course</button>
                </div>
            </div>
            <div>
                <ul>

                </ul>
            </div>
        </div>
    )
}


export default RoadmapPage