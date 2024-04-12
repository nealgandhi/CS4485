import React, { useState } from 'react'
import { Navigate } from "react-router-dom"

function SignupForm() {
    // const [netID, setNetID] = useState("")
    // const [fName, setFName] = useState("")
    // const [lName, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [degreeID, setDegreeID] = useState()
    const [goToLogin, setGoToLogin] = useState(false)

    // const idInput = event => {   //handle when input is changing (allows user to type in input)
    //     setNetID(event.target.value);
    // }
    // const fNameInput = event => { 
    //     setFName(event.target.value);
    // }
    // const lNameInput = event => { 
    //     setLName(event.target.value);
    // }
    const emailInput = event => { 
        setEmail(event.target.value);
    }
    const passInput = event => { 
        setPass(event.target.value);
    }
    const confirmPassInput = event => { 
        setConfirmPass(event.target.value);
    }
    const degreeInput = event => { 
        setDegreeID(event.target.value);
    }
    
    const handleSubmitClick = async() => {       //handles when submit button pressed, adds user to DB
        var id = 0
        if(confirmPass !== pass) {
            alert("Passwords do not match. Please type them in again.")
            return
        }
        if(degreeID === "compSci") {
            id = 1
        }
        const target = "http://localhost:8080/post/user/" + email + "/degree/" + id + "/password/" + pass

        try {
            const r = await fetch(target, {
                method: "POST"
            });
            if(!r.ok) {
                throw new Error('newUserDenied')
            }
            setGoToLogin(true)
            alert("User has been added, please input login information below.")
        }
        catch(error) {
            alert("User could not be added.")
        }
    }

    if(goToLogin) {
        return <Navigate to="/login" />
    }
    
    return (
        <div className='w-3/4 lg:w-3/4 bg-white px-10 py-5 rounded-3xl border-2 border-blue-800'>
            <h1 className='text-5xl font-semibold'>Sign up</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Welcome! Please enter your details.</p>
            <div className='mt-8'>
                {/* <div className='flex flex-row items-center gap-4'>
                    <label className='w-32 text-lg font-medium'>NetID</label>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Enter your NetID'
                        value={netID}
                        onChange={idInput}
                     />
                </div>
                <div className='flex flex-row items-center gap-4'>
                    <label className='flex w-32 text-lg font-medium'>First Name</label>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Enter your first name'
                        value={fName}
                        onChange={fNameInput}
                     />
                </div>
                <div className='flex flex-row items-center gap-4'>
                    <label className='flex w-32 text-lg font-medium'>Last Name</label>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Enter your last name'
                        value={lName}
                        onChange={lNameInput}
                     />
                </div> */}
                <div className='flex flex-row items-center gap-4'>
                    <label className='flex w-32 text-lg font-medium'>Email</label>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Enter a valid email address'
                        value={email}
                        onChange={emailInput}
                     />
                </div>
                <div className='flex flex-row items-center gap-4'>
                    <label className='flex w-32 text-lg font-medium'>Major</label>
                    <select onChange={degreeInput} className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'>
                        <option value="null">Choose a major</option>
                        <option value="compSci">Computer Science</option>
                    </select>
                </div>
                <div className='flex flex-col items-center mt-4'>
                    <label className='w-32 text-lg font-medium'>Password</label>
                    <text>*Must be longer than 6 characters and contain a special character</text>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Create your password'
                        type="password"
                        value={pass}
                        onChange={passInput}
                     />
                </div>
                <div className='flex flex-col items-center mt-2'>
                    <label className='text-lg font-medium'>Confirm Password</label>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Retype your password'
                        type="password"
                        value={confirmPass}
                        onChange={confirmPassInput}
                     />
                </div>
                <div className='mt-6 flex flex-col gap-y-4'>
                    <button onClick={ handleSubmitClick } className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-800 text-white text-lg font-bold'>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;