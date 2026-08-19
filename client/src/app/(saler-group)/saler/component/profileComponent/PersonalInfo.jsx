import React from 'react'

export default function PersonalInfo({ changePasswordDiv, setChangePasswordDiv, setprofileUpdateDiv, profileUpdateDiv, user }) {
    return (
        <div  >

            {/* personal information */}
            <div className=' flex gap-4 ' >
                <div className=' flex flex-col gap-3 ' >
                    <h2 className=' font-semibold  ' >
                        Phone
                    </h2>
                    <h2 className=' font-semibold  ' >
                        Email
                    </h2>
                    <h2 className=' font-semibold  ' >
                        Address
                    </h2>
                </div>

                <div className=' flex flex-col gap-3  ' >
                    <p className='  ' >
                        {user.phone ? user.phone : ' not provided'}
                    </p>
                    <p className='  ' >
                        {user.email ? user.email : ' not provided'}
                    </p>
                    <p className=' flex flex-wrap  ' >
                        not provided
                    </p>
                </div>
            </div>



            <div className=' flex items-center gap-2 text-[14px] '>
                <button onClick={() => {
                    setprofileUpdateDiv(true)
                    setChangePasswordDiv(false)
                }} className=' font-semibold py-2 px-2 w-fit hover:bg-indigo-500 rounded bg-indigo-600 text-white mt-4 cursor-pointer ' >
                    Update Profile
                </button>

                <button onClick={() => {
                    setChangePasswordDiv(true)
                    setprofileUpdateDiv(false)
                }} className=' font-semibold py-2 px-2 w-fit hover:bg-indigo-500 rounded bg-indigo-600 text-white mt-4 cursor-pointer ' >
                    change password
                </button>
            </div>

        </div>
    )
}
