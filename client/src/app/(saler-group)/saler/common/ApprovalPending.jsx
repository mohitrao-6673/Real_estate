import React from 'react'

export default function ApprovalPending() {
    return (
        <div>
            <div class="flex items-center justify-center min-h-screen bg-slate-50">
                <div class="max-w-md w-full bg-white border border-amber-200 shadow-sm rounded-xl p-6 relative overflow-hidden">
                    {/* <!-- Top Accent Bar --> */}
                    <div class="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>

                    <div class="flex items-start space-x-4">
                        {/* <!-- Icon --> */}
                        <div class="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        {/* <!-- Content --> */}
                        <div class="flex-1">
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold text-slate-900">Approval Pending</h3>
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                    <span class="w-1.5 h-1.5 mr-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                                    Reviewing
                                </span>
                            </div>
                            <p class="mt-1 text-sm text-slate-500">
                                Your submission has been received and is currently under review by our admin team. This usually takes 24-48 hours.
                            </p>

                            {/* <!-- Action / Detail info --> */}
                            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                <span>Reference ID: #REQ-84920</span>
                                <button class="font-medium text-amber-600 hover:text-amber-700 transition-colors">View Status</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
