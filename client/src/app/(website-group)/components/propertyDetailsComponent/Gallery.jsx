import React from 'react'

export default function Gallery({ images }) {

    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

    return (
        <>
            <div className=' flex flex-col p-2 h-full  ' >

                <div className=' w-full ' >
                    <img src={`${apiBaseUrl}${images[0]}`} className={`
                    w-[100%] lg:h-[400px] md:h-[300px] h-[200px] `} alt="" />
                </div>


                {/* moltiple images  */}
                <div className=' grid md:grid-cols-6 grid-cols-4 pt-2 gap-2 ' >
                    {
                        images.length >= 1 ?
                            images.map((src, index) => {

                                return (
                                    <div key={index} >
                                        <img src={`${apiBaseUrl}${src}`}
                                            className=' md:h-[150px] sm:h-[90px]
                                         h-[70px]  '
                                            alt="" />
                                    </div>
                                )
                            })
                            :
                            <div>
                                no images uploaded this property
                            </div>
                    }
                </div>
            </div>
        </>
    )
}
