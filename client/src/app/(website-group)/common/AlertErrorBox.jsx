import React from 'react'
import { MdErrorOutline } from "react-icons/md";
import { VscError } from "react-icons/vsc";


export default function AlertErrorBox({ error, status }) {
    return (

        <div className={`  border border-red-500/30 p-4 rounded-2xl shadow-2xl shadow-red-500/10  w-full transform animate-bounce-short transition-all relative
        `}>

            {/* <!-- Glowing Pulsing Icon Background --> */}
            <div className="relative top-2    ">
                <div className="absolute left-[50%] translate-x-[-50%]   w-15 h-15 bg-red-900 rounded-full animate-ping inset-0"></div>
                <div className="relative flex items-center justify-center w-15 h-15 bg-red-600 text-white rounded-full shadow-lg shadow-red-600/50 text-3xl left-[50%] translate-x-[-50%]">

                    <VscError className=" w-10 h-10 " />
                </div>
            </div>


            {/* <!-- Content Area --> */}
            <div className="text-center flex flex-col gap-2">

                <h1 className="text-2xl font-bold text-white mt-6">
                    Error

                </h1>

                <p className="text-xs font-semibold tracking-widest text-red-400 uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/25">
                    {error}
                </p>




            </div>
        </div>



    )
}
