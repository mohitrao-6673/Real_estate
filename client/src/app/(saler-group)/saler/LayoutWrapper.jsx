"use client"

import React, { useState } from 'react'
import { Provider } from 'react-redux'
import SideBaar from './common/SideBaar'
import Footer from './common/Footer'
import { myStore } from '@/app/store/store'
import Header from './common/Header'

export default function LayoutWrapper({ children }) {

    let [dashboardSideBaar, setDashboardSideBaar] = useState(false)

    return (
        <Provider store={myStore} >
            <section className={` grid duration-400 lg:grid-cols-[18%_auto] md:grid-cols-[27%_auto] grid-cols-1 `} >


                {/* admin-side-baar */}
                <aside className={` z-2
                duration-500   bg-gradient-to-r from-[#392BFB] to-[#0F056E] h-screen  md:w-full w-[80%] sm:px-4 px-2  md:sticky fixed overflow-auto scrollbar-hide

                     ${dashboardSideBaar ?
                        " top-0 left-0 "
                        :
                        ' top-0 left-[-100%]'
                    }
                    `} >

                    <SideBaar setDashboardSideBaar={setDashboardSideBaar} />
                </aside>

                {/* admin-pages*/}
                <div className={`bg-indigo-50 w-full h-screen  md:sticky fixed overflow-auto scrollbar-hide   `}  >
                    <Header setDashboardSideBaar={setDashboardSideBaar} />
                    {children}
                    <Footer />
                </div>


            </section>
        </Provider>
    )
}
