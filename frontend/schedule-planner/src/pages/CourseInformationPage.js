import React, {useState} from 'react'

function CourseInformationPage() {
    const [prefix, setPre] = useState('')
    const [number, setNum] = useState('')
    
    const getInfo = async(p, n) => {
        const r = await fetch("http://localhost:8080/get/course/cs/2300/info");
        const m = await r.json();
        console.log(m);
    }

    const preInput = event => {   //handle when course input is changing (allows user to type in input)
        setPre(event.target.value);
    }
    const numInput = event => {   //handle when course input is changing (allows user to type in input)
        setNum(event.target.value);
    }

    return (
        <div className='flex flex-row h-screen ml-10'>
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
                <button title='get' onClick={() => getInfo(prefix, number)} className=''>Press</button>
            </div>
        </div>
    )
};

export default CourseInformationPage;