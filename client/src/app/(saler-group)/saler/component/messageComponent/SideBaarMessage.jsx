import React from 'react'

export default function SideBaarMessage({ setChatIsOpen }) {
    return (
        <>
            {/* <!-- Search Bar & Filters Frame --> */}
            <div suppressHydrationWarning className=" sticky w-full border-2 top-0 p-4 bg-white z-1 border-b border-slate-100
             flex flex-col gap-3  ">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Client Inquiries</h1>
                    <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full">3 New</span>
                </div>
                {/* <!-- Interactive Inputs Setup --> */}
                <div className="relative">
                    <input type="text" placeholder="Search clients, properties..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition" />
                    <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>


            <section suppressHydrationWarning className="h-[100vh] w-full  bg-white border-r border-slate-200 
            flex flex-col shrink-0">
                {/* <!-- Scrollable Client Lead Cards container --> */}

                <div className="flex-1 divide-slate-100 ">

                    <CharCard setChatIsOpen={setChatIsOpen} />
                    <CharCard setChatIsOpen={setChatIsOpen} />
                    <CharCard setChatIsOpen={setChatIsOpen} />
                    <CharCard setChatIsOpen={setChatIsOpen} />

                </div>
            </section>

        </>

    )
}


function CharCard({ setChatIsOpen }) {
    return (
        <>

            {/* <!-- Lead Card Active --> */}
            <div onClick={() => setChatIsOpen(true)} className="p-4 flex gap-3 bg-blue-50/60 border-l-4 border-blue-600 cursor-pointer transition">
                <div className="relative w-12 h-12 rounded-full bg-slate-200 shrink-0">
                    <img src="https://unsplash.com" alt="Client" className="w-full h-full object-cover rounded-full" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                        <h2 className="text-sm font-semibold text-slate-900 truncate">Marcus Vance</h2>
                        <span className="text-xs text-blue-600 font-medium">10m ago</span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 truncate mb-1">Grandview Luxury Penthouse</p>
                    <p className="text-xs text-slate-500 truncate">Is the parking space included in the current listing lease terms?</p>
                </div>
            </div>

        </>
    )
}