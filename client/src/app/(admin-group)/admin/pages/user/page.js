"use client"

import React, { useEffect, useState } from 'react'
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Flip, toast, ToastContainer } from 'react-toastify';






export default function user() {
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store) => store.userStore.token)
    let [loader, setLoader] = useState(true)
    let [user, setUser] = useState([])



    let getAllUser = () => {
        setLoader(true)
        axios.get(`${apiBaseUrl}admin/user/view`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                setUser(finalRes.data)
                setLoader(false)
            })
    }
    useEffect(() => {
        setLoader(true)
        getAllUser()
    }, [token])



    return (
        <section className='flex flex-col lg:px-6 px-4  gap-5 ' >
            <ToastContainer />
            {/* Team -header */}
            <header className='flex  justify-between px-2 text-black sticky top-[52px]
             md:top-[0px] bg-indigo-50 py-4 ' >

                <div className='  flex flex-col  ' >
                    <h2 className='md:text-[25px] text-[20px] font-semibold ' >
                        User Management
                    </h2>
                    <p className='text-gray-600 ' >
                        Manage Platform Users and Access
                    </p>
                    <span className=' mt-2   ' >
                        All Users
                    </span>
                </div>

                {/* refresh Button */}
                <button className=' px-2 py-1   border border-indigo-600 flex items-center justify-center gap-2 h-fit  rounded cursor-pointer hover:bg-indigo-600 hover:text-white '   >
                    <span className='' >Filter</span>
                    <CiFilter className='text-[19px]' />
                </button>
            </header>


            <div className=' w-full bg-white border rounded ' >

                <div className="  shadow w-full overflow-auto scrollbar-hide  ">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r text-white from-[#392BFB] to-[#0F056E] border-b whitespace-nowrap">
                            <tr>
                                <th className="p-4 text-left">User Info</th>
                                <th className="p-4 text-left">Role</th>
                                <th className="p-4 text-left">Contact</th>
                                <th className="p-4 text-left ">Account Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">

                            {/* {
                                loader ?
                                    // user loading card
                                    <tr>
                                        <td className="p-4 text-center " colSpan={5} >
                                            User Fetching...
                                        </td>
                                    </tr>
                                    :

                                    // all the users
                                  
                            } */}


                            {/* // all the users */}

                            {
                                user.length >= 1 ?
                                    user.map((user, index) => {
                                        return (
                                            <UsersRow key={index} user={user} getAllUser={getAllUser} apiBaseUrl={apiBaseUrl} token={token} />
                                        )
                                    })
                                    :
                                    <tr>
                                        <td className="p-4 text-center " colSpan={5} >
                                            No User Found
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>

            </div>


        </section>
    )
}


function UsersRow({ user, getAllUser, apiBaseUrl, token }) {


    console.log(user)

    // delete a particular user
    let userDelete = (userId) => {
        axios.delete(`${apiBaseUrl}admin/user/delete/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    toast.success(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        transition: Flip,
                    });
                    getAllUser()
                }
                else {
                    toast.error(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        transition: Flip,
                    });
                }
            })
    }

    // block a particular user
    let userBlock = (event) => {
        event.preventDefault()
        axios.post(`${apiBaseUrl}admin/user/block/${user._id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    toast.success(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        transition: Flip,
                    });
                    console.log(finalRes.data)
                    getAllUser()
                }
                else {
                    toast.error(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        transition: Flip,
                    });
                }
            })
    }

    return (
        <tr className=' whitespace-nowrap ' >
            <td className="p-4 flex items-center gap-2 ">
                <span className={`flex text-white items-center justify-center h-[45px] w-[45px] rounded-full ${user.role == 'buyer' ? 'bg-indigo-600' : 'bg-green-600'} `}  >
                    {user.firstName.charAt(0).toUpperCase()}
                </span>
                <span className='flex flex-col leading-[18px] ' >
                    <span className=' font-semibold '  >
                        {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}   {user.lastName}
                    </span>
                    <span className='text-[13px] tracking-[1px] ' >
                        ID: {user._id}
                    </span>
                </span>
            </td>
            <td className="p-4 ">
                <span className={` px-2 py-1 rounded-md text-xs  ${user.role == 'buyer' ? 'bg-indigo-100' : 'bg-green-100'}`} >
                    {user.role}
                </span>
            </td>

            <td className="p-4 "><span className="  py-1  flex items-center gap-2  ">
                <span className=' text-red-600  '  >
                    <MdOutlineMail />
                </span>
                <span  >
                    {user.email}
                </span>
            </span>
            </td>


            <td className="p-4 "><span className={`  px-2 py-1 rounded-md text-xs flex items-center gap-2 w-fit 
            ${user.isBlocked ? 'text-red-700 bg-red-100 ' : 'text-green-700 bg-green-100'}`}
            >
                {user.isBlocked ? <CiLock /> : <CiUnlock />}
                <span>
                    {user.isBlocked ? 'Inactive ' : 'Active'}
                </span>
            </span></td>


            <td className="p-4 text-right "><span className="  py-1  flex items-center gap-2 justify-end  ">
                <span
                    onClick={userBlock}
                    className={`p-2 rounded-md font-bold cursor-pointer ${user.isBlocked ? 'text-red-700 bg-red-100 ' : 'text-green-700 bg-green-100'} `}  >
                    {user.isBlocked ? <CiLock /> : <CiUnlock />}

                </span>
                <span
                    onClick={() => userDelete(user._id)}
                    className='cursor-pointer p-2 rounded-md bg-red-100  text-black' >
                    <RiDeleteBin4Fill />
                </span>
            </span>
            </td>

        </tr >
    )
}