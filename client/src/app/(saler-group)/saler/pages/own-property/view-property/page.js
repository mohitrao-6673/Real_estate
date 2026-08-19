"use client"
import React, { useEffect, useState } from 'react'

import { MdOutlineMyLocation } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PageLoader from '@/app/(website-group)/common/PageLoader';
import { SlSizeFullscreen } from "react-icons/sl";
import { MdOutlineBedroomChild } from "react-icons/md";
import { Flip, toast, ToastContainer } from 'react-toastify';
import { MdVerified } from "react-icons/md";







export default function page() {
    let router = useRouter()
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let [propertyView, setPropertyView] = useState([''])
    let [pageLoader, setPageLoader] = useState(true)

    let propertyDisplay = () => {

        axios.get(`${apiBaseUrl}admin/property/view`)
            .then((res) => res.data)
            .then((finalRes) => {
                setPropertyView(finalRes.data)
                setPageLoader(false)
            })

    }

    useEffect(() => {
        propertyDisplay()
    }, [])



    //  multiple Delete idsCheks
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
        axios.post(`${apiBaseUrl}admin/property/muldelete`, obj)
            .then((res) => {

                propertyDisplay()
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
        <>
            <ToastContainer />
            <section className=' lg:px-6 px-4 py-2 ' suppressHydrationWarning >

                {/* propety -header */}
                <header className='flex  items-center justify-between  sticky
                 top-[53.6px] md:top-0  z-1 text-black bg-indigo-50 ' >
                    <div className=' text-[25px] font-semibold  ' >
                        View Property
                    </div>
                </header>


                <button onClick={multipleDelete} className={`text-[18px] font-semibold
                     bg-gradient-to-r from-[#392BFB] to-[#0F056E] text-white 
                  rounded-[10px] px-3 text-center cursor-pointer duration-300 mt-2 
                         ${allIds == '' ? 'hidden' : 'block'}     
                  ` } suppressHydrationWarning >
                    Delete
                </button>

                <div className='grid  grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5  py-4 ' >

                    {
                        pageLoader ?

                            <PageLoader />

                            :

                            propertyView.length >= 1 ?

                                propertyView.map((items, index) => {
                                    return (

                                        <PropetyCard key={index} items={items} apiBaseUrl={apiBaseUrl} propertyDisplay={propertyDisplay} router={router} IdCheck={IdCheck} />
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



function PropetyCard({ items, apiBaseUrl, propertyDisplay, IdCheck }) {


    // property deleted
    let propertyDelete = (delId) => {
        axios.delete(`${apiBaseUrl}admin/property/delete/${delId}`)
            .then((res) => res.data)
            .then((finalRes) => {
                //console.log(finalRes)
                propertyDisplay()
                toast.success(finalRes.message, {
                    position: "top-right",
                    autoClose: 1000,
                    transition: Flip,
                });
            })
    }


    // property status changed
    let [status, setStatus] = useState(items.status)
    let propertyStatusChange = (event) => {
        event.preventDefault()
        let status = { status: event.target.value }
        axios.post(`${apiBaseUrl}admin/property/change-status/${items._id}`, status)
            .then((res) => res.data)
            .then((finalRes) => {
                setStatus(event.target.value)
            })
    }


    return (
        <div className='bg-white rounded-[18px] relative    '  >
            <div className='relative overflow-hidden  ' >
                <Link href={`/pages/property-details/${items._id}`}  >

                    <div className='z-1 absolute top-2 left-2 flex items-center gap-3 ' >
                        <span className={`  text-white font-bold  py-[1px] text-[13px] rounded-full tracking-[1px] px-2
                     ${status == 'Sale' ? 'bg-[green]' : 'bg-red-600'}
                    
                    `} >
                            {status}
                        </span>
                        <span className=' bg-[green] text-white font-bold  py-[1px] text-[13px] rounded-full tracking-[1px] flex items-center gap-1  px-2  ' >
                            <MdVerified />
                            <span>Verified</span>
                        </span>
                    </div>



                    {/* price tag */}
                    <div className='z-1 absolute bottom-2 px-3 flex justify-between items-center w-full ' >
                        <h2 className=' sm:text-[20px] text-[12px] font-semibold text-white   ' >
                            $   {items.price}
                        </h2>

                        <div className=' flex items-center font-semibold gap-1 text-white ' >

                            <FaEye className='text-[18px]  ' />
                            <span className='text-[12px] mt-[1px] ' >
                                2
                            </span>
                        </div>

                    </div>


                    <img src={`${apiBaseUrl}${items.images[0]}`} alt="" className=' h-full w-full rounded-[8px_8px_0px_0px] hover:scale-110 duration-300 cursor-pointer ' />
                </Link>
            </div>



            <div className=' p-2  ' >

                <h2 className='font-semibold sm:text-[16px] text-[13px] ' >
                    {items.title}
                </h2>
                <div className='flex items-center gap-2 mt-1 ' >
                    <span className='text-[14px] mt-[1px] ' >
                        <MdOutlineMyLocation />
                    </span>
                    <p className='sm:text-[13px] text-gray-800 text-[10px] ' >
                        {items.city} {items.area}
                    </p>
                </div>


                <div className=' grid grid-cols-3 text-center items-center mt-5  ' >

                    <div className='flex flex-col gap-1 items-center   ' >
                        <div className=' text-center flex justify-center ' >
                            <MdOutlineBedroomChild />
                        </div>
                        <div className=' text-center flex justify-center font-semibold text-[15px] mt-1  ' >
                            {items.bhk}
                        </div>
                        <div className=' text-center flex justify-center text-[13px]
                             text-[#aca090] font-semibold ' >
                            BEDS
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 items-center border-x-[0.2px] border-[#aca090]   ' >
                        <div className=' text-center flex justify-center ' >
                            <IoHomeOutline />
                        </div>
                        <div className=' text-center flex justify-center font-semibold text-[15px] mt-1  ' >
                            {items.bathrooms}
                        </div>
                        <div className=' text-center flex justify-center text-[13px] text-[#aca090] font-semibold ' >
                            BATH
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 items-center   ' >
                        <div className=' text-center flex justify-center ' >
                            <SlSizeFullscreen />
                        </div>
                        <div className=' text-center flex justify-center font-semibold text-[15px] mt-1  ' >
                            {items.areaSize}
                        </div>
                        <div className=' text-center flex justify-center text-[13px] text-[#aca090] font-semibold ' >
                            SQ FT
                        </div>
                    </div>

                </div>


                <div className=' grid grid-cols-[60%_auto] gap-2 mt-2 ' >


                    <div className=' w-full border border-indigo-500 rounded  flex items-center   ' >
                        <select onChange={propertyStatusChange} className=' w-full h-full outline-none cursor-pointer' name='status'  >
                            <option value={''} > Select  </option>
                            <option value={'Sold'} > Sold </option>
                            <option value={'Sale'} > Sale </option>
                        </select>
                    </div>


                    {/* delte and edit buttons */}
                    <div className=' flex items-center justify-between text-white ' >
                        {/* edit button */}
                        <Link href={`/admin/pages/own-property/add-property/${items._id}`} className=' bg-[green] p-2 rounded-[100%] h-[30px] w-[30px] flex items-center justify-center cursor-pointer ' >
                            <FaEdit />
                        </Link>

                        <div className={`
                        `}  >
                            <input type='checkbox' className='scale-125 rounded focus:ring-indigo-500 accent-blue-600 cursor-pointer '
                                onChange={IdCheck} value={items._id} />

                        </div>
                        {/* delete button */}
                        <div onClick={() => propertyDelete(items._id)} className=' bg-[red] p-2 rounded-[100%] h-[30px] w-[30px] flex items-center justify-center cursor-pointer ' >
                            <RiDeleteBin5Fill />
                        </div>
                    </div>
                </div>



            </div>

        </div>
    )
}





