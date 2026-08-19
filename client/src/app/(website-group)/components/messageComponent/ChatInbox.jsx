"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoSend } from "react-icons/io5";



export default function ChatInbox({ setChatIsOpen ,handleSendMessage, conversation }) {

    
    const {  activeChat, messages,isConnected,  } = useSelector(
        (store) => store.chat
    );
   
    return (
        < >
            {/* chat-boxt-panel-headr */}
            <header className="sticky w-full border-2 top-0 py-4  h-20 bg-white border-b border-slate-200 px-6  shadow-sm " >

                <div className='flex gap-4 items-center ' >
                    <span
                        onClick={() => setChatIsOpen(false)}
                        className='text-[24px] font-bold md:hidden block ' >
                        <AiOutlineArrowLeft />
                    </span>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200">
                            <img src="https://unsplash.com" alt="Marcus Vance" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-slate-900">Marcus Vance</h2>
                            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span> Active Lead
                            </p>
                        </div>
                    </div>

                    {/* <div class="flex items-center gap-3">
                        <button class="px-4 py-2 border border-slate-200 text-slate-700 font-medium text-xs rounded-lg bg-white hover:bg-slate-50 transition shadow-sm">
                            Schedule Tour
                        </button>
                        <button class="px-4 py-2 bg-blue-600 text-white font-semibold text-xs rounded-lg hover:bg-blue-700 transition shadow-sm">
                            Send Offer Paperwork
                        </button>
                    </div> */}
                </div>



            </header>

            <div className={`  w-full  `}  >

                {/* <!-- Chat Flow Thread Panel Screen Area --> */}
                <div className="w-full flex-1 overflow-y-auto p-6 flex flex-col gap-6">

                    <Timestamp />

                    {
                        messages.length >= 1 ? 
                        messages.map((message,index)=>{
                            console.log(message.createdAt)
                        return(
                          <div key={index} >
                             
                        <      div className="flex items-end gap-3 max-w-xl">
                         <div className='flex flex-col gap-2' >
                            <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm">
                             <p className="text-sm text-slate-800 leading-relaxed">
                          {message.text}
                            </p>
                         </div>
                         <div className="text-[10px] text-slate-400 font-medium">
                            {message.createdAt}
                         </div>
                         </div>
                        </div>
                          </div>
                           )
                        })
                        :

                        'no message yet'
                    }
                 

                </div>


            </div>




            {/* chat-send-form-bottom */}
            <form onSubmit={handleSendMessage} className="sticky w-full  sm:bottom-0 bottom-[55px] py-4  h-20 bg-white
             border-y border-slate-200 md:px-6 px-2  shadow-sm " suppressHydrationWarning >

                <div className='flex h-full md:gap-2  items-center justify-between w-full
                
                ' suppressHydrationWarning>
                    <div className="md:w-[95%] w-[80%] h-full ">
                        <input type="text" placeholder="Search clients, properties..." className="w-full h-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition" name='text' />
                    </div>

                    <button type='submit' className=' h-[50px] w-[50px] rounded-full bg-[blue] text-white flex items-center justify-center ' >
                        <IoSend />
                    </button>

                </div>



            </form>
        </>
    )
}


{/* <!-- Timestamp Overlay Splitter --> */ }
function Timestamp() {
    return (
        <>
            <div className=" flex items-center justify-center my-2">
                <span className="bg-slate-200 text-slate-600 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">Today</span>
            </div>
        </>
    )
}

{/* <!-- Inbound Chat Message Component Block --> */ }
function InboundChat({message}) {

  
    return (
        <>

        </>
    )
}
{/* <!-- Outbound Chat Message Component Block --> */ }
function OutboundChat() {
    return (
        <>

            <div className="flex items-end gap-3 max-w-xl self-end flex-row-reverse">
                <div className='flex flex-col gap-2' >
                    <div className="bg-blue-600 p-4 rounded-2xl rounded-br-none text-white shadow-md shadow-blue-600/10">
                        <p className="text-sm leading-relaxed">Hi Marcus! Yes, the Grandview Luxury Penthouse lease agreement encompasses two secure subterranean parking spaces equipped with personal EV charging hookups.</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium  block text-right">10:18 AM</span>
                </div>
            </div>
        </>
    )
}