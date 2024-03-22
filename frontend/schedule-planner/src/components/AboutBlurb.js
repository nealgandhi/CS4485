import * as React from 'react'

function AboutBlurb({ name, responsibility, img }) {
    return (
        <div classname="flex flex-row justify-center items-center gap-4">
            <img src={img} className='w-32 h-32 rounded-full ml-2' alt="team member headshot"/>
            <div className='flex flex-col w-36 h-20 items-center mt-4'>
                <div>
                    {name}
                </div>
                <div>
                    {responsibility}
                </div>
            </div>
        </div>
    )
}

export default AboutBlurb;