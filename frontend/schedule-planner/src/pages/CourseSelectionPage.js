import { useState } from 'react'
import React from 'react'

function CourseSelectionPage() {
    const [course, setCourse] = useState("");       //keeps track of inputed course
    const [val, setVal] = useState([]);

    const click = () => {       //handles when submit button pressed, adds course to box underneath
        const courseElement=[...val,[]];
        setVal(courseElement);
    }
    const courseInput = event => {   //handle when course input is changing (allows user to type in input)
        setCourse(event.target.value);
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
                <button onClick = {click} className="w-32 ml-8 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-800 text-white font-semibold">Search</button>
                </div>
            </div>
            <div className="flex flex-row gap-20">
                <div className="h-80 w-1/2 flex flex-wrap flex-col rounded-3xl border-2 border-gray-400 mt-10">
                    {val.map(() => {
                        return(
                            <div>
                                {course}
                                <button className=''>X</button>
                            </div>
                        )
                    })}
                </div>
                <div className="h-80 w-64 flex flex-wrap flex-col justify-center items-center rounded-3xl border-2 border-gray-400 mt-10"></div>
            </div>
        </div>
    )
}

export default CourseSelectionPage;