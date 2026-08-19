"use client"


import axios, { all } from 'axios'
import Link from 'next/link'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { HiOutlineCheck } from "react-icons/hi";



import React, { useEffect, useState } from 'react'
import { Bounce, Flip, toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import PageLoader from '@/app/(website-group)/common/PageLoader';

export default function page() {

    let router = useRouter()
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let [teamView, setTeamView] = useState([])
    let [staticPath, setStaticPath] = useState('')
    let [pageLoader, setPageLoader] = useState(true)

    let teamDisplay = () => {
        axios.get(`${apiBaseUrl}admin/team/view`)
            .then((res) => res.data)
            .then((finalRes) => {
                setTeamView(finalRes.data)
                setStaticPath(finalRes.staticPath)
                setPageLoader(false)
            })
    }


    useEffect(() => {
        teamDisplay()
    }, [])



    //  multiple Delete
    let [allIds, setAllIds] = useState([])
    let IdCheck = (event) => {
        if (event.target.checked) {
            if (!allIds.includes(event.target.value)) {
                setAllIds([...allIds, event.target.value])
            }
        }
        else {
            let restId = allIds.filter((id) => id != event.target.value)
            setAllIds(restId)
        }
    }



    let multipleDelete = () => {
        let obj = {
            allIds
        }
        axios.post(`${apiBaseUrl}admin/team/muldelete`, obj)
            .then((res) => {

                teamDisplay()
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                });
            })
    }



    return (
        <>  <ToastContainer />
            <section className='   ' >
                {/* Team -header */}
                <header className='flex  items-center justify-between px-2 sticky
                 top-[53.6px] md:top-0  z-1 text-black bg-indigo-50 ' >
                    <div className=' text-[25px] font-semibold lg:px-6 px-4 py-2  ' >
                        View Team
                    </div>
                </header>


                <button onClick={multipleDelete} className={`text-[18px] font-semibold
                     bg-gradient-to-r from-[#392BFB] to-[#0F056E] text-white 
                  rounded-[10px] px-3 text-center cursor-pointer duration-300 mt-2 
                         ${allIds == '' ? 'hidden' : 'block'}     
                  ` } suppressHydrationWarning >
                    Delete
                </button>


                <div className='lg:px-6 px-4 py-4 mt-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 ' >

                    {
                        pageLoader ?

                            <PageLoader />

                            :

                            teamView.length >= 1 ?

                                teamView.map((items, index) => {
                                    return (

                                        <ViewItemCard key={index} index={index} items={items} staticPath={staticPath} apiBaseUrl={apiBaseUrl} teamDisplay={teamDisplay} router={router} IdCheck={IdCheck} />
                                    )
                                })

                                :

                                <NoDataFound />
                    }

                </div>
            </section>
        </>
    )
}

// no data found card
function NoDataFound() {
    return (

        <div className='w-[1100px] mx-auto h-[200px] bg-white flex items-center justify-center text-[22px] rounded-[18px] font-semibold ' >
            <h1  >
                No Property Added
            </h1>
        </div>
    )
}



// display item card
function ViewItemCard({ items, index, staticPath, apiBaseUrl, teamDisplay, checkAllIds, router, IdCheck }) {


    let memberDelete = (delId) => {
        axios.post(`${apiBaseUrl}admin/team/delete/${delId}`)
            .then((res) => {

                teamDisplay()
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                });


            })
    }


    let [multipleDelete, setMultipleDelete] = useState(false)

    return (
        <div className=' text-center  rounded-[18px] bg-white    ' >
            <img src={` ${apiBaseUrl}${staticPath}${items.memberImage} `} className=' rounded-[18px_18px_0px_0px] h-[200px] w-full   ' />

            <div className='flex flex-col gap-2 p-4    ' >



                <h2 className='font-semibold sm:text-[16px] text-[13px]  ' >
                    {items.memberName}
                </h2>

                <p className=' text-gray-800 text-[14px] ' >
                    {items.memberCategory}
                </p>



                <div className='w-full px-2  flex items-center justify-between text-white  ' >
                    <Link href={`/pages/team/add-team/${items._id}`} className=' bg-[green] p-2 rounded-[100%] h-[40px] w-[40px] flex items-center justify-center hover:bg-green-600 duration-300 ' >
                        <FaEdit />
                    </Link>


                    <div className={`
                        `}  >
                        <input type='checkbox' className='scale-200 rounded focus:ring-indigo-500 accent-blue-600 cursor-pointer '
                            onChange={IdCheck} value={items._id} />

                    </div>


                    <div onClick={() => memberDelete(items._id)} className=' bg-red-600 p-2 rounded-[100%] h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-[red] duration-300  ' >
                        <RiDeleteBin5Fill />
                    </div>


                </div>

            </div>

        </div>
    )
}
