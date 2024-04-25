import React, { useState } from 'react'

function CourseSelectionPage() {
    // const [course, setCourse] = useState();       //keeps track of inputed course
    const [prefix, setPrefix] = useState(""); 
    const [number, setNumber] = useState(""); 
    const [courseList, setCourseList] = useState([]);   //keeps track of all entered courses
    const [selectedCourses, setSelectedCourses] = useState([]);     //keeps track of all selected courses

    const handleSubmitClick = async() => {       //handles when submit button pressed, adds course to box underneath
        try {
            const r = await fetch("http://localhost:8080/get/course/" + prefix + "/" + number + "/info");
            if(!r.ok) {
                throw new Error('class not found')
            }
            const m = await r.json();
            // setCourse(m.info.id)
            const currentCourse = m.info.id
            setCourseList((ls)=>[...ls,currentCourse])
        }
        catch(error) {
            alert("Class not found. Please check the class prefix and number again.")
        }
    }
    const handleGenerateClick = async() => {        //sends data to api to generate schedule

    }

    const prefixInput = event => {   //handle when course input is changing (allows user to type in input)
        setPrefix(event.target.value);
    }
    const numberInput = event => {   //handle when course input is changing (allows user to type in input)
        setNumber(event.target.value);
    }
    const handleRemoveClick = (c) => {       //handle X button when removing inputted course
        const newList = courseList.filter((l)=>l.course !== c);
        setCourseList(newList);
    }

    const handleDrag = (e, c) => {             //handles dragging from available courses to selected courses to the right
        e.dataTransfer.setData("courseID", c)
    }

    const handleRemoveSelected = (c) => {       //handle removing course from selected list
        const newCourseList = selectedCourses.filter((l)=>l !== c)
        setSelectedCourses(newCourseList)
    }

    const handleDragOver = (e) => {         //prevents default when dragging over
        e.preventDefault();
    }

    const handleDrop = (e) => {         //handles dropping course into selected box
        const courseID = e.dataTransfer.getData("courseID")
        setSelectedCourses((id)=>[...id, courseID])
    }
    
    return (
        <div className="flex flex-col h-auto ml-10 mb-10">
            <div className="mt-16 w-3/4">
                <h1 className="text-3xl font-semibold">Select your courses</h1>
                <p className="mt-4">Type in the courses that you would like to add to your schedule below. You can add onto these later if you wish.</p>
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
                    <button onClick = {handleSubmitClick} className="w-32 mt-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-700 text-white font-semibold">Search</button>
                </div>
            </div>
            <div className="flex flex-row justify-between gap-20">
                <div className="h-80 flex flex-wrap flex-col mt-10 ml-1">
                    {courseList.map((a)=>           //Creates list of inputed courses
                        <div draggable onDragStart={(e)=>handleDrag(e, a)} className='flex flex-row w-max justify-between gap-4 py-1 rounded-xl bg-theme-orange text-theme-navy font-semibold border-2 border-theme-navy mb-2'>
                            <div className='ml-4 cursor-pointer'>{a}</div>
                            <button onClick={()=>handleRemoveClick(a.course)} className='flex-row text-red-700 mr-4'>X</button>
                        </div>
                    )}
                </div>
                <div droppable onDragOver={(e)=>handleDragOver(e)} onDrop={(e)=>handleDrop(e)} className="h-80 w-1/2 flex flex-wrap flex-col items-center rounded-3xl border-2 border-gray-400 mt-10 mr-20">
                    {selectedCourses.map((c, index) => 
                        <div className='flex justify-between w-full rounded-3xl bg-theme-orange text-theme-navy font-semibold border-2 border-theme-navy mb-2 text-center' key={index}>
                            <div className='ml-4'>{c}</div>
                            <button onClick={()=>handleRemoveSelected(c)} className='flex-row text-red-700 mr-4'>X</button>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-row w-full '>
                <button onclick={handleGenerateClick} className='w-32 mt-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-700 text-white font-semibold'>Generate Schedule</button>
            </div>
        </div>
    )
}

export default CourseSelectionPage;