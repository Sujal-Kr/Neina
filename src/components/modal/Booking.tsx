'use client'
import { AlarmClock, Calendar, Trash, X } from 'lucide-react'
import React from 'react'

const Booking = ({ booking, handler }: any) => {
    return (
        <div className='min-h-dvh w-full absolute top-0 right-0 grid place-content-center bg-gray-900/80 '>
            <div className='bg-white p-4 rounded-xl shadow-2xl w-80 '>
                <div className='flex flex-col space-y-4'>
                    <div className='flex justify-end text-red-500'>

                        <X size={32} onClick={handler} className='hover:bg-red-400 hover:text-white rounded-lg  transition-all duration-200 p-2' />
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold text-gray-800'>{booking?.name}</h3>
                        <p className='text-sm text-gray-500'>{booking?.email}</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-2 text-xs'>
                            <Calendar size={20} />
                            <p>{booking?.date && new Date(booking?.date).toDateString()}</p>
                        </div>
                        <div className='flex items-center gap-2 text-xs'>
                            <AlarmClock size={20} />
                            <p>{booking?.time}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Booking