import React from 'react'
import { MdOutlineMail } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";



export default function page() {
    return (
        <section className='flex flex-col  lg:px-6 px-4 gap-3 ' >
            {/* Team -header */}
            <header className='flex px-2 text-black sticky top-[52px] md:top-[0px] bg-indigo-50 py-4 ' >

                <div className='  flex flex-col  ' >
                    <h2 className='text-[25px]  font-semibold ' >
                        Sller Verification
                    </h2>
                    <p className='text-gray-600 ' >
                        Review and Approve New Seller Registraion Request
                    </p>
                    <span className=' mt-4 text-[18px] font-semibold   ' >
                        Pending Request
                    </span>
                </div>

            </header>



            <div className='   ' >

                <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 ' >

                    <SellerCard />
                    <SellerCard />
                    <SellerCard />
                    <SellerCard />
                    <SellerCard />

                </div>

            </div>


        </section>
    )
}

// SellerCard request card
function SellerCard() {
    return (

        <div className="p-4 bg-white rounded-xl overflow-hidden transition-shadow duration-300 flex flex-col gap-3 hover:shadow-2xl   border-indigo-600  cursor-pointer border ">


            <div className=" flex items-center gap-4 ">
                <span className='flex items-center justify-center h-[45px] w-[45px] rounded-full text-white bg-indigo-600 ' >
                    h
                </span>
                <span className='flex flex-col gap-1 leading-[16px] ' >
                    <span className=' font-semibold '  >
                        abc
                    </span>
                    <div className=" flex items-center gap-1 text-[14px] ">
                        <MdAccessTime className=' text-indigo-600 ' />
                        <span className='' >
                            11/22/33
                        </span>
                    </div>
                </span>
            </div>

            <div className=" flex items-center gap-2 ">
                <MdOutlineMail className='text-[18px] text-indigo-600 ' />
                <span className='ext-[15px]' >
                    fffff33
                </span>
            </div>


            <button className='flex items-center justify-center bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-[10px] text-white  p-2 text-center gap-2  ' >
                <IoIosCheckmarkCircleOutline />
                <span>
                    Approve Seller
                </span>
            </button>
        </div>
    )
}