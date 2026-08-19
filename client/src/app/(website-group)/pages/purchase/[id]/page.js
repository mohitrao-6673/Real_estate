import React from 'react'

export default function page() {
    return (

        <section>



            <section className=' max-w-[1140px] mx-auto px-6 py-4 ' >
                <h3 className="text-[25px] font-semibold "  >
                    Add Property
                </h3>
                {/* form-body */}
                <div className="   ">
                    <form encType="multipart/form-data" className=' flex flex-col gap-6'  >

                        {/*Property Details */}
                        <div className=' flex flex-col bg-white rounded-[12px] p-4 ' >

                            <h2 className='text-[18px] w-fit font-bold px-3 border-s-[5px] rounded-[5px] mb-3 ' >
                                Property Details
                            </h2>

                            <div className='flex flex-col gap-2 ' >

                                <div className=' grid grid-cols-3 gap-6  ' >

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Property Type</label>
                                        <select
                                            className=' input '
                                            name="propertyType"
                                        >
                                            <option>Apartment/Flat </option>
                                            <option>commercial </option>
                                            <option>Penthouse </option>
                                            <option>bunglow </option>
                                        </select>

                                    </div>

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Furnishing </label>
                                        <select
                                            className=' input '
                                            name="furnishing"
                                        >
                                            <option> Furnished </option>
                                            <option>Semi Furnished </option>
                                            <option>Unfurnished </option>
                                        </select>

                                    </div>

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Listing Status </label>
                                        <select
                                            className=' input '
                                            name="status"
                                        >
                                            <option> Sale </option>
                                        </select>

                                    </div>

                                </div>


                                <div className=' grid grid-cols-4 gap-6 ' >

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>BHK</label>
                                        <input
                                            type="number"
                                            name="bhk"
                                            placeholder='bhk' className='input ' fdprocessedid="1zckvr" />

                                    </div>
                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Bathroom</label>
                                        <input
                                            type="number"
                                            name="bathrooms"
                                            placeholder='bathroom' className='input ' fdprocessedid="1zckvr" />

                                    </div>
                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Area (Sq.Ft) </label>
                                        <input
                                            type="number"
                                            name="areaSize"
                                            placeholder='area' className='input ' fdprocessedid="1zckvr" />

                                    </div>
                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '> Price </label>
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder='price' className='input ' fdprocessedid="1zckvr" />

                                    </div>

                                </div>



                                <div className=' grid grid-cols-3 gap-6  ' >

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>
                                            City </label>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder='city' className='input ' fdprocessedid="1zckvr" />

                                    </div>

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>
                                            Area </label>
                                        <input
                                            type="text"
                                            name="area"
                                            placeholder='area' className='input ' fdprocessedid="1zckvr" />

                                    </div>

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>
                                            Pincode </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            placeholder='pincode' className='input ' fdprocessedid="1zckvr" />

                                    </div>

                                </div>
                            </div>

                        </div>









                        {/* Buttons */}
                        <div className='flex gap-10 mt-[40px] items-center font-semibold ' >
                            <div className='button' >

                                <button type='submit' className=' cursor-pointer  ' fdprocessedid="9aljcb" >
                                    Submit
                                </button>
                            </div>

                            <button type='reset' className='button ' fdprocessedid="2fqn2">
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            </section>


        </section>


    )
}
