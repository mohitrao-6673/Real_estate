

import Link from 'next/link';
import React from 'react'
import { RiMenuFold4Fill } from "react-icons/ri";
import { RiMenuFold3Fill } from "react-icons/ri";

export default function Header({ setDashboardSideBaar }) {

    return (
        <header className='flex  md:hidden block  bg-white z-1  justify-between px-2 sticky top-0 shadow-2xl items-center ' suppressHydrationWarning >
            {/* form mobile tablet */}
            <div className=' text-[25px] font-semibold py-2 ' >
                <Link href={'/'} >
                    Real_Estate
                </Link>
            </div>
            <div className='  ' >

                <RiMenuFold4Fill className='text-[25px]'
                    onClick={() => setDashboardSideBaar(true)} />
            </div>

        </header>
    )
}
