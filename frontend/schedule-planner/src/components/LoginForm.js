import * as React from 'react';

function LoginForm() {
    return (
        <div className='w-3/4 lg:w-1/2 bg-white px-10 py-5 rounded-3xl border-2 border-blue-800'>
            <h1 className='text-5xl font-semibold'>Login</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your details.</p>
            <div className='mt-8'>
                <div className='flex flex-col'>
                    <label className='text-lg font-medium'>NetID</label>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Enter your NetID'
                     />
                </div>
                <div className='flex flex-col'>
                    <label className='text-lg font-medium'>Password</label>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Enter your password'
                        type="password"
                     />
                </div>
                <div className='mt-8 flex justify-between items-center'>
                    <div>
                        <input 
                            type="checkbox"
                            id='remember'
                        />
                        <label className='ml-1 font-medium text-base' for='remember'>Remember me for 30 days</label>
                    </div>
                    <button className='font-medium text-base text-blue-800'>Forgot password</button>
                </div>
                <div className='mt-6 flex flex-col gap-y-4'>
                    <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-800 text-white text-lg font-bold'>Sign in</button>
                </div>
                {/* <div className='mt-6 flex justify-center items-center'>
                    <p className='font-medium text-base'>Don't have an account?</p>
                    <a href="/signup" className='text-blue-800 text-medium ml-2'>Sign up</a>
                </div> */}
            </div>
        </div>
    )
}

export default LoginForm;