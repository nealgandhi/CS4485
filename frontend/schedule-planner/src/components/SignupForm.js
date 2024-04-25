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
        //error checking of fields
        if(!email.includes("@") || !email.includes(".")) {
            alert("Please enter valid email address.")
            return
        }
        if(email.indexOf("@")+1 === email.indexOf(".")) {
            alert("Please enter valid email address.")
            return
        }
        if(pass.length < 6) {
            alert("Password is too short. Please enter a longer password.")
            return
        }
        if(!pass.includes("!") && !pass.includes("_") && !pass.includes("@") && !pass.includes("#") && !pass.includes("$")  && !pass.includes("*") && !pass.includes("?")) {
            alert("Password does not contain one of the following special characters: !,_,@,#,$,*,?")
            return
        }
        if(confirmPass !== pass) {
            alert("Passwords do not match. Please type them in again.")
            return
        }

        //sets the degree id for the database
        if(degreeID === "compSci") {
            id = 1
        }
        const target = "http://143.198.48.114:8080/post/user/" + email + "/degree/" + id + "/password/" + pass

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
            console.log(error)
        }
    }

    if(goToLogin) {
        return <Navigate to="/login" />
    }
    
    return (
        <div className='w-1/2 lg:w-1/2 bg-white px-5 py-5 rounded-3xl border-2 border-blue-800'>
            <div fontfamily="Arial" class="pt-0 pr-3 pb-0 pl-3 mr-auto ml-auto sm:px-5 lg:px-12 max-w-7xl">
                <div class="bg-white rounded-xl sm:p-10">
                    <div class="pt-8 pr-8 pb-8 pl-8 lg:col-span-7">
                        <p fontsize="2xl" class="text-gray-900 text-left font-extrabold leading-snug tracking-tight mb-4
                            md:text-4xl">Create an Account</p>
                        <div>
                        <div class="w-full mt-3 mr-auto mb-3 ml-auto">
                            <label class="text-sm font-medium text-gray-700 block">Your Email</label>
                            <div class="mt-1 mr-0 mb-0 ml-0">
                                <input
                                className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                                placeholder='Enter a valid email address'
                                value={email}
                                onChange={emailInput}
                            />
                            </div>
                        </div>
                        <div class="w-full mt-0 mr-auto mb-4 ml-auto">
                            <label class="text-sm font-medium text-gray-700 block">Major</label>
                            <div class="mt-1 mr-0 mb-0 ml-0">
                                <select onChange={degreeInput} className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'>
                                    <option value="null">Choose a major</option>
                                    <option value="compSci">Computer Science</option>
                                </select>
                            </div>
                        </div>
                        <div class="w-full mt-0 mr-auto mb-3 ml-auto">
                            <label class="text-sm font-medium text-gray-700 block">Your Password</label>
                            <div class="mt-1 mr-0 mb-0 ml-0">
                            <input
                                className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                                placeholder='*************'
                                type="password"
                                value={pass}
                                onChange={passInput}
                            />
                            </div>
                        </div>
                        <div class="w-full mt-0 mr-auto mb-3 ml-auto">
                            <label class="text-sm font-medium text-gray-700 block">Confirm Password</label>
                            <div class="mt-1 mr-0 mb-0 ml-0">
                            <input
                                className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                                placeholder='Retype your password'
                                type="password"
                                value={confirmPass}
                                onChange={confirmPassInput}
                            />
                            </div>
                        </div>
                        <button fontfamily="Arial" type="submit" class="hover:bg-gray-600 rounded-md text-xl mt-3 pt-3 pr-3 pb-3 pl-3
                            bg-gray-800 font-semibold text-white w-full text-center" onClick={handleSubmitClick}>Submit</button>
                        <div class="items-center justify-start mt-6 mr-0 mb-0 ml-0 pt-6 pr-0 pb-0 pl-0 flex border-t-2
                            border-gray-100">
                            <p class="text-sm text-gray-800">Already have an account?</p>
                            <a href="/login"class="text-sm text-blue-500 mt-0 mr-0 mb-0 ml-2">Sign In</a>
                        </div>
                        </div>
                    </div>
                    <div class="lg:gap-x-10 lg:grid-cols-12 lg:gap-y-8 grid grid-cols-1">
                        <div class="lg:col-span-5 lg:block hidden"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;