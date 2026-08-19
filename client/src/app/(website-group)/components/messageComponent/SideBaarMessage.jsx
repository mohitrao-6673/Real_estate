"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

    export default function SideBaarMessage({ setChatIsOpen,conversation, setActiveChat,    getChatPartner }) {

    const {  activeChat, messages,isConnected,  } = useSelector(
        (store) => store.chat
    );
    
          
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
                   
                   {
                    conversation.length >= 1 ?
                    conversation.map((chat) => {
                       
                      return(
                       <div key={chat._id} onClick={() => {
                        setChatIsOpen(true)
                        setActiveChat(chat)
                       }} className="p-4 flex gap-3 bg-blue-50/60 border-l-4 border-blue-600 cursor-pointer transition">
                <div className="relative flex items-center justify-center text-[18px] font-semibold uppercase w-12 h-12 rounded-full bg-slate-200 shrink-0">
               {
                       getChatPartner(chat)?.profilePic ? (
                      <img src={getChatPartner(chat).profilePic} alt="Client" className="w-full h-full object-cover rounded-full" />
                                 
                )
                :
                   getChatPartner(chat).firstName.charAt(0)
                 }
                       
                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span> 
                 </div>

                    <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                        <h2 className="text-sm font-semibold text-slate-900 truncate"
                    > {getChatPartner(chat).firstName}
                        </h2>
                        <span className="text-xs text-blue-600 font-medium">10m ago</span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 truncate mb-1">Grandview Luxury Penthouse</p>
                    <p className="text-xs text-slate-500 truncate">
                        {chat.messages.at(-1)?.text || 'started a conversation'}
                        </p>
                      </div>
                       </div>
                      )
                    })

                    :

                    'not conversation found yet'
                   }
                    

                </div>
            </section>

        </>

    )
}


// function CharCard({ setChatIsOpen ,chat,setActiveChat,getChatPartner}) {
//      console.log(chat)
//     return (
//         <>

//             {/* <!-- Lead Card Active --> */}
           

//         </>
//     )
// }



