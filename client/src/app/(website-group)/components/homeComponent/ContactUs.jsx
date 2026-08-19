import Link from 'next/link'
import React from 'react'

export default function ContactUs() {
    return (
        <>

            <section className=' px-2 py-8   ' >


                <div className=' max-w-[1140px] mx-auto ' >

                    <div className='grid md:grid-cols-2 grid-cols-1 gap-[50px] md:p-0 p-4 ' suppressHydrationWarning={true} >

                        <div >
                            <img src="/contactUs.png" className='h-full' alt="" />
                        </div>

                        <div className='border-2 p-5 flex flex-col gap-8  ' >
                            <h1 className='text-[30px] font-semibold ' >
                                Your One-Stop Shop for Rental
                                Homes
                            </h1>

                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque minus odio quas autem amet similique reiciendis nihil inventore aut sint. Mollitia totam placeat veritatis vitae quidem, provident eveniet tenetur ullam.
                            </p>

                            <div className='grid grid-cols-4 gap-4 ' >
                                <div>
                                    <img src="/Rectangle 108.png" alt="" />
                                </div>
                                <div>
                                    <img src="/Rectangle 108.png" alt="" />
                                </div><div>
                                    <img src="/Rectangle 108.png" alt="" />
                                </div><div>
                                    <img src="/Rectangle 108.png" alt="" />
                                </div>
                            </div>

                            <Link href={'/pages/properties'} className='bg-[url(/background.png)] bg-cover rounded-[8px_0px_8px_0px] text-white p-2 w-[180px] cursor-pointer text-center ' >
                                Get Latest Update
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

        </>
    )
}
// fdprocessedid = "jgonxg"