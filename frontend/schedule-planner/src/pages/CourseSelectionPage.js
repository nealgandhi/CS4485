import React, { useState } from 'react'

function CourseSelectionPage() {
    const [course, setCourse] = useState("");       //keeps track of inputed course
    const [courseList, setCourseList] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);

    const handleSubmitClick = (e) => {       //handles when submit button pressed, adds course to box underneath
        const currentCourse={course}
        if(course){
            setCourseList((ls)=>[...ls,currentCourse])
            setCourse("")
        }
        else{
            alert("Input box is empty. Please enter the course number you wish to search.")
        }
    }
    const courseInput = event => {   //handle when course input is changing (allows user to type in input)
        setCourse(event.target.value);
    }
    const handleRemoveClick = (c) => {       //handle X button when removing inputted course
        const newList = courseList.filter((l)=>l.course !== c);
        setCourseList(newList);
    }

    const handleDrag = (e, c) => {             //handles dragging from available courses to selected courses to the right
        e.dataTransfer.setData("courseID", c)
    }

    const handleRemoveSelected = (c) => {
        const newCourseList = selectedCourses.filter((l)=>l !== c)
        setSelectedCourses(newCourseList)
    }

    const handleDragOver = (e) => {  
        e.preventDefault();
    }

    const handleDrop = (e) => {         //handles dropping course into selected box
        const courseID = e.dataTransfer.getData("courseID")
        setSelectedCourses((id)=>[...id, courseID])
    }
    
    return (
        <div className="flex flex-col h-screen ml-10">
            <div className="mt-16 w-3/4">
                <h1 className="text-3xl font-semibold">Select your courses</h1>
                <p className="mt-4">Type in the courses that you would like to add to your schedule below. You can add onto these later if you wish.</p>
            </div>
            <div className='flex flex-col w-4/5 mt-12'>
                <label className='text-lg font-medium'>Course Number</label>
                <div>
                <input
                    className='w-1/2 border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                    placeholder='Enter the course number' 
                    value={course}
                    onChange={courseInput}
                />
                <button onClick = {handleSubmitClick} className="w-32 ml-8 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-800 text-white font-semibold">Search</button>
                </div>
            </div>
            <div className="flex flex-row justify-between gap-20">
                <div className="h-80 flex flex-wrap flex-col mt-10 ml-1">
                    {courseList.map((a)=>           //Creates list of inputed courses
                        <div draggable onDragStart={(e)=>handleDrag(e, a.course)} className='flex flex-row w-max justify-between gap-4 py-1 rounded-xl bg-theme-orange text-theme-navy font-semibold border-2 border-theme-navy mb-2'>
                            <div className='ml-4 cursor-pointer'>{a.course}</div>
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
        </div>
    )
}

export default CourseSelectionPage;