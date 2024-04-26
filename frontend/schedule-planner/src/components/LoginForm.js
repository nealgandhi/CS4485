import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [rememberBox, setRememberBox] = useState(false)
    // const [goToRoadmap, setGoToRoadmap] = useState(false)
    let navigate = useNavigate();

    const emailInput = event => {   //handle when input is changing (allows user to type in input)
        setEmail(event.target.value);
    }
    const passInput = event => { 
        setPass(event.target.value);
    }
    const boxCheck = () => {
        if(!rememberBox) {
            setRememberBox(true)
        }
        else {
            setRememberBox(false)
        }
    }

    const handleSignin = async() => {
        try {
            const r = await fetch("http://143.198.48.114:8080/get/user/" + email + "/password/" + pass);
            if(!r.ok) {
                throw new Error(r.statusText)
            }
            const m = await r.json();
            // console.log(m.token)
            routeChange(m.token)
        }
        catch(error) {
            alert(error)
        }
    }

    const routeChange = (passTokenArg) =>{
        // console.log("THis is the token", passTokenArg)
        navigate('/roadmap', {state:{passToken:passTokenArg}})
    }


    return (
        <div className='content-center w-2/5 lg:w-2/5 bg-white px-10 py-5 rounded-3xl border-2 border-gray-800 mr-auto ml-auto'>
            <div fontfamily="Arial" class="pt-0 pr-3 pb-0 pl-3 mr-auto ml-auto sm:px-5 lg:px-12 max-w-7xl">
                <div class="bg-white rounded-xl sm:p-10">
                    <div class="pt-8 pr-8 pb-8 pl-8 lg:col-span-7">
                        <p fontsize="2xl" class="text-gray-900 text-left font-extrabold leading-snug tracking-tight mb-4
                            md:text-4xl">Welcome Back!</p>
                        <div>
                        <div class="w-full mt-3 mr-auto mb-3 ml-auto">
                            <label class="text-sm font-medium text-gray-700 block">Email</label>
                            <input
                                className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                                placeholder='example@utdallas.edu'
                                value={email}
                                type="email"
                                onChange={emailInput}
                             />
                            </div>
                        </div>
                
                        <div class="w-full mt-0 mr-auto mb-3 ml-auto">
                            <label class="text-sm font-medium text-gray-700 block">Password</label>
                            <div class="mt-1 mr-0 mb-0 ml-0">
                            <input
                                className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                                placeholder='password123'
                                type="password"
                                value={pass}
                                onChange={passInput}
                            />
                            </div>
                        </div>
                        <div className='mt-8 mb-4 flex justify-between items-center'>
                            <div>
                                <input 
                                    type="checkbox"
                                    id='remember'
                                    value={rememberBox}
                                    onChange={boxCheck}
                                />
                                <label className='ml-1 font-medium text-base' for='remember'>Remember me for 30 days</label>
                            </div>
                            <button href="/aboutus" className='font-medium text-base text-blue-800'>Forgot password</button>
                        </div>
                        <button fontfamily="Arial" type="submit" class="hover:bg-gray-600 rounded-md text-xl pt-3 pr-3 pb-3 pl-3
                            bg-gray-800 font-semibold text-white w-full text-center" onClick={handleSignin}>Log In</button>
                        <div class="items-center justify-start mt-6 mr-0 mb-0 ml-0 pt-6 pr-0 pb-0 pl-0 flex border-t-2
                            border-gray-100">
                        </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default LoginForm;