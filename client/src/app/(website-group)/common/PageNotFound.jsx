"use client"


import Link from 'next/link'
import React from 'react'

export default function PageNotFound() {
    return (
        <>
            <section className={`bg-mesh min-h-screen flex items-center justify-center p-4`}>
                <div className="glass p-12 max-w-2xl w-full mx-4 glow">
                    <div className="text-center">
                        <div className="mb-8 float-animation">
                            <h1 className="font-lexend text-8xl font-bold text-gray-100 mb-2 tracking-tight">404</h1>
                            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mb-8"></div>
                            <h2 className="font-fredoka text-3xl font-medium text-gradient mb-4">Lost in Digital Space</h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                The page you looking for has drifted into another dimension. Dont worry, our team of space explorers is on it!
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link href={'/'} className="glass-button px-8 py-4 rounded-2xl text-gray-100 font-fredoka text-lg inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/20">
                                    <i className="fas fa-home"></i>
                                    Return Home
                                </Link>
                                <Link href={'/'} className="glass-button px-8 py-4 rounded-2xl text-gray-100 font-fredoka text-lg inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/20">
                                    <i className="fas fa-headset"></i>
                                    Contact Support
                                </Link>
                            </div>

                            {/* <div className="pt-8 border-t border-gray-700/30">
                                <p className="text-gray-400 text-sm">
                                    Need help? Check our
                                    <a href="#" className="text-indigo-300 highlight">documentation</a>
                                    or
                                    <a href="#" className="text-purple-300 highlight">system status</a>
                                </p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
