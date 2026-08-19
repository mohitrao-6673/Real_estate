import React from 'react'

export default function SmallSide() {
    return (
        <div>
            {/* <!-- Sidebar Navigation Menu --> */}
            <aside class="hidden md:flex flex-col items-center w-20 bg-slate-900 text-white py-6 justify-between">
                <div class="flex flex-col items-center gap-8 w-full">
                    {/* <!-- Brand Logo Indicator --> */}
                    <div class="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-lg tracking-wider shadow-lg shadow-blue-600/30">
                        H
                    </div>
                    {/* <!-- Primary Nav Icons --> */}
                    <nav class="flex flex-col gap-6 w-full px-2">
                        <a href="#" class="p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition flex justify-center">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        </a>
                        <a href="#" class="p-3 text-blue-400 bg-slate-800 rounded-xl transition flex justify-center relative">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            <span class="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-slate-800"></span>
                        </a>
                        <a href="#" class="p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition flex justify-center">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </a>
                    </nav>
                </div>
                {/* <!-- User Settings Avatar Placeholder --> */}
                <div class="h-10 w-10 rounded-full bg-slate-700 ring-2 ring-slate-800 overflow-hidden cursor-pointer">
                    <img src="https://unsplash.com" alt="Agent profile" class="w-full h-full object-cover" />
                </div>
            </aside>
        </div>
    )
}
