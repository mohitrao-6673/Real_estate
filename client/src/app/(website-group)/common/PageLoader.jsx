import React from 'react'

export default function PageLoader() {
    return (
        <>

            <BlankBox />
            <BlankBox />
            <BlankBox />
            <BlankBox />
            <BlankBox />
            <BlankBox />
            <BlankBox />
            <BlankBox />
            <BlankBox />
            <BlankBox />
            <BlankBox />
            <BlankBox />
            <BlankBox />

        </>



    )
}


function BlankBox() {
    return (
        <div className="bg-white dark:bg-zinc-800 p-4 ring-1 ring-zinc-900/5 rounded-lg shadow-lg w-full">
            <div className="flex-col space-y-4 animate-pulse">
                <div className="rounded bg-zinc-200 dark:bg-zinc-700 w-1/4 aspect-square mx-auto"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-700 w-3/4 rounded"></div>
                    <div className="h-6 bg-zinc-200 dark:bg-zinc-700 w-20 mx-auto rounded"></div>
                </div>
            </div>
        </div>
    )
}