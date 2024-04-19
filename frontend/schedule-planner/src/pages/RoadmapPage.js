import React, { useState, useEffect } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

function RoadmapPage({token}) {

    const [prefix, setPrefix] = useState(""); 
    const [number, setNumber] = useState("");
    const [coursesTakenList, setCoursesTakenList] = useState([]);   //keeps track of all entered courses
    const location = useLocation()
    let navigate = useNavigate();
    const [user, setUser] = useState()

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
        try {
            const r = await fetch("http://143.198.48.114:8080/get/course/" + prefix + "/" + number + "/info");
            if(!r.ok) {
                throw new Error('class not found')
            }
            const m = await r.json();
            const currentCourse = m.info.id
            setCoursesTakenList((ls)=>[...ls,currentCourse])
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

    return (
        <div className="flex flex-col h-screen ml-10 mb-10">
            <div className="mt-16 w-3/4">
                <h1 className="text-3xl font-semibold">Plan out your degree</h1>
                <p className="mt-4">Hello {user}, Type in the courses that you have already taken below. You can add onto these later if needed.</p>
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
                    <button onClick = {handleSubmitClick} className="w-32 mt-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-800 text-white font-semibold">Add Course</button>
                </div>
            </div>
        </div>
    )
}


export default RoadmapPage