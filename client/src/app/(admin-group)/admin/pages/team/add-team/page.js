"use client"


import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ImUpload } from "react-icons/im";
import { Flip, toast, ToastContainer } from 'react-toastify';



export default function page() {
    let [loader, setLoader] = useState(false)
    let router = useRouter()
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    // insert-work
    let teamInsert = (event) => {
        event.preventDefault()
        setLoader(true)
        let formData = new FormData(event.target)
        axios.post(`${apiBaseUrl}admin/team/insert`, formData)
            .then((res) => {
                if (res.data.status) {
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
                    setTimeout(() => {
                        router.push('/pages/team/view-team')
                    }, 1000);
                }
                else {
                    console.log(res.data.message)
                }
                 setLoader(false)
            })
    }



    //  image preview
    let [previewImage, setPreviewImage] = useState('/image-preview.svg')
    let imagePreview = (event) => {
        try {
            let imageUrl = URL.createObjectURL(event.target.files[0])
            setPreviewImage(imageUrl)
        }
        catch {
            setPreviewImage('/image-preview.svg')
        }

    }





    return (
        <>
            <ToastContainer />
            <section className=' ' >
                {/* Team -header */}
                <header className='flex  items-center justify-between px-2 sticky
                 top-[53.6px] md:top-0  z-1 text-black bg-indigo-50 ' >
                    <div className=' text-[25px] font-semibold lg:px-6 px-4 py-2  ' >
                        Add Team
                    </div>
                </header>

                {/* form-body */}
                <form onSubmit={teamInsert} className=' flex flex-col gap-6 lg:px-6 px-4 py-4'  >

                    {/*team  name & Description */}
                    <div className='flex flex-col  rounded-[18px] bg-white  p-4  ' >
                        <h2 className='text-[18px] w-fit font-bold px-3 border-s-[5px] rounded-[5px] mb-3 ' >
                            Name & Category
                        </h2>

                        {/* Member Name */}

                        <div className=' flex flex-col gap-2 ' >

                            <div className='flex flex-col gap-2 '>
                                <label className=' text-[16px] font-semibold '>   Name </label>
                                <input
                                    type="text"
                                    name="memberName"
                                    placeholder='name' className='input ' fdprocessedid="1zckvr" />
                            </div>


                            {/*memberCategory */}
                            <div className='flex flex-col gap-2 '>
                                <label className=' text-[16px] font-semibold '>  Category     </label>
                                <input
                                    type="text"
                                    name="memberCategory"
                                    placeholder='category ' className=' input ' fdprocessedid="dpz6na" />
                            </div>

                        </div>

                    </div>




                    {/* image upload*/}
                    <div className='flex flex-col gap-4 ' >
                        {/* file-input */}
                        <label
                            className="inputfile">
                            <span className='text-[25px] ' >
                                <ImUpload />
                            </span>
                            <span>
                                Upload File Here
                            </span>
                            <input
                                onChange={imagePreview}
                                type="file"
                                name='memberImage'
                                id='uploadFile1' className="hidden" />
                        </label>

                        {/* image-upload */}
                        <img src={previewImage} alt="" className='rounded-[18px]
                         h-[200px] w-[200px] ' />
                    </div>







                    {/* Team status */}
                    <div className='flex flex-col gap-2 bg-white rounded-[18px] p-4 '>
                        <h2 className='text-[18px] w-fit font-bold px-3 border-s-[5px] rounded-[5px] mb-3 ' >Member Status :</h2>

                        <div className='flex items-center gap-4' >

                            <div className='flex items-center gap-3 cursor-pointer'>
                                <input
                                    type="radio"
                                    className='cursor-pointer'
                                    name='status'
                                    value={1}

                                />
                                <span className=' text-[16px] font-semibold ' >Active</span>
                            </div>

                            <div className='flex items-center gap-3 cursor-pointer'>
                                <input type="radio"
                                    className='cursor-pointer '
                                    name='status'
                                    value={0}
                                />
                                <span className=' text-[16px] font-semibold ' >Deactive</span>
                            </div>

                        </div>
                    </div>


                    {/* Buttons */}
                    <div className='flex gap-10 mt-[40px] items-center font-semibold ' >
                        <div className='button' >
                            {
                                loader ?
                                    <button type="button" className="cursor-pointer flex items-center justify-center gap-2   " >
                                        <span className='spinner' >
                                        </span>
                                        <span>
                                            Processing…
                                        </span>
                                    </button>
                                    :
                                    <button type='submit' className=' cursor-pointer  ' fdprocessedid="9aljcb" >
                                        Submit
                                    </button>
                            }
                        </div>
                        <button type='reset' className='button ' fdprocessedid="2fqn2">
                            Cancel
                        </button>

                    </div>

                </form>

            </section>
        </>
    )
}
