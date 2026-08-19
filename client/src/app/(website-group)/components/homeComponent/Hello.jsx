"use client"

import React, { useEffect, useRef, useState } from 'react'

export default function Hello() {



    return (
        <>
  <div className="min-h-screen flex items-center justify-center">

  {/* <!-- card goes here --> */}
  <div className="relative w-3/4 lg:w-1/2 bg-gray-800 p-16 pb-32 rounded text-white space-y-6 overflow-hidden">

    <h2 className="text-red-500 text-5xl font-extrabold">
      Laravel Jobs
    </h2>

    <p className="text-2xl">The official Laravel job board connecting the best jobs with top talent.</p>

    <a href="" className="inline-block bg-red-500 text-xl py-4 px-6 rounded text-red-50">View all jobs</a>ggg

    {/* <!-- scrolling list goes here --> */}
    <div className="absolute bottom-4 left-0 right-0 space-y-1">
      <div className="scroller flex space-x-1 whitespace-nowrap text-xs text-gray-300">
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
      </div>
      <div className="scroller flex space-x-1 whitespace-nowrap text-xs text-gray-300">
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
      </div>
      <div className="scroller flex space-x-1 whitespace-nowrap text-xs text-gray-300">
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
        <a className="bg-gray-600 py-1 px-3 rounded">scrolling list here</a>
      </div>
    </div>
  </div>

</div>

        </>
    )
}
