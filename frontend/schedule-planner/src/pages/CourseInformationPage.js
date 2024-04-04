import React, {useState} from 'react'

function CourseInformationPage() {
    const [prefix, setPre] = useState('')
    const [number, setNum] = useState('')
    const [course, setCourse] = useState()
    
    const preInput = event => {   //handle when course input is changing (allows user to type in input)
        setPre(event.target.value);
    }
    const numInput = event => {   //handle when course input is changing (allows user to type in input)
        setNum(event.target.value);
    }
    
    const getInfo = async() => {
        try {
            const r = await fetch("http://localhost:8080/get/course/" + prefix + "/" + number + "/info");
            if(!r.ok) {
                throw new Error('class not found')
            }
            const m = await r.json();
            setCourse(m.info)            
        }
        catch(error) {
            alert("Class not found. Please enter another.")
        }
    }

    return (
        <div className='flex flex-col h-screen ml-10'>
            <div className='flex flex-col mb-40 mt-40 w-screen'>
                <input
                    className='w-1/2 border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                    placeholder='Enter the course prefix' 
                    value={prefix}
                    name='prefix'
                    onChange={preInput}
                />
                <input
                    className='w-1/2 border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                    placeholder='Enter the course number' 
                    value={number}
                    name='number'
                    onChange={numInput}
                />
                <button title='get' onClick={() => getInfo()} className=''>Press</button>
            </div>
            <div className='flex border-2'>
                {course.name}
            </div>
        </div>
    )
};

export default CourseInformationPage;