import React from 'react'

export default function page() {
    return (
        <div>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

                    <div className="relative h-64 sm:h-80 bg-gray-900">
                        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750" alt="Luxury Villa" className="w-full h-full object-cover opacity-85" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                            <span className="bg-indigo-600 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">Featured Villa</span>
                            <h1 className="text-2xl sm:text-3xl font-bold mt-2">Modern Luxury Smart Villa</h1>
                            <p className="text-gray-200 text-sm mt-1">Beverly Hills, California • $2,500 / night</p>
                        </div>
                    </div>


                    <div className="p-6 sm:p-10 grid grid-cols-1 gap-8">


                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="text-lg font-medium text-gray-900">Your Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" name='fullName' placeholder="Full Name" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                                <input type="email" name='email' placeholder="Email Address" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                                <input type="text" placeholder="Phone" name='phone' className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                            </div>
                        </div>

                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-md">
                            Confirm Reservation
                        </button>


                    </div>
                </div>
            </div>

        </div>
    )
}






// price summary
{/* <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 border-b pb-3">Price Summary</h3>
    <div className="flex justify-between text-gray-600 text-sm">
        <span>$2,500 × 5 nights</span>
        <span>$12,500</span>
    </div>
    <div className="flex justify-between text-gray-600 text-sm">
        <span>Cleaning fee</span>
        <span>$250</span>
    </div>
    <div className="flex justify-between text-gray-600 text-sm">
        <span>Service fee</span>
        <span>$150</span>
    </div>
    <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-lg">
        <span>Total</span>
        <span>$12,900</span>
    </div>
</div > */}