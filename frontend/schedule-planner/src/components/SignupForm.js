import * as React from 'react';

function SignupForm() {
    return (
        <div className='w-3/4 lg:w-3/4 bg-white px-10 py-5 rounded-3xl border-2 border-blue-800'>
            <h1 className='text-5xl font-semibold'>Sign up</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Welcome! Please enter your details.</p>
            <div className='mt-8'>
                <div className='flex flex-row items-center gap-4'>
                    <label className='w-32 text-lg font-medium'>NetID</label>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Enter your NetID'
                     />
                </div>
                <div className='flex flex-row items-center gap-4'>
                    <label className='flex w-32 text-lg font-medium'>First Name</label>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Enter your first name'
                     />
                </div>
                <div className='flex flex-row items-center gap-4'>
                    <label className='flex w-32 text-lg font-medium'>Last Name</label>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Enter your last name'
                     />
                </div>
                <div className='flex flex-row items-center gap-4'>
                    <label className='flex w-32 text-lg font-medium'>Email</label>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Enter a valid email address'
                     />
                </div>
                <div className='flex flex-col items-center mt-4'>
                    <label className='w-32 text-lg font-medium'>Password</label>
                    <text>*Must be longer than 6 characters and contain a special character</text>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Create your password'
                        type="password"
                     />
                </div>
                <div className='flex flex-col items-center mt-2'>
                    <label className='text-lg font-medium'>Confirm Password</label>
                    <input
                        className='w-full border-2 border-blue-100 rounded-xl p-3 mt-1 bg-transparent'
                        placeholder='Retype your password'
                        type="password"
                     />
                </div>
                <div className='mt-6 flex flex-col gap-y-4'>
                    <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-800 text-white text-lg font-bold'>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;