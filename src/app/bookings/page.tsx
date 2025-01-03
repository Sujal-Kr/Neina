'use client'
import Button from '@/components/modal/Button'
import BookingCard from '@/components/specific/BookingCard'
import { BookingType } from '@/types/Booking'
import axios from 'axios'
import { Home, Search } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Bookings = () => {
    const [bookings, setBookings] = useState<BookingType[]>([])

    const handleDelete = async (_id: string) => {
        try {
            setBookings((prev) => prev.filter((booking) => booking._id !== _id))
            const { data } = await axios.delete(`/api/booking/${_id}`)
            if (data.success) {
                toast.success("Booking deleted successfully")
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || err.message)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const formdata = new FormData(e.target as HTMLFormElement)
            const email = formdata.get('email') as string
            
            if (email.trim() === "") {
                toast.error("Please enter your email address")
                return
            }

            const { data } = await axios.post('/api/me', { email })
            const form = e.target as HTMLFormElement
            form.reset()

            if (data.success) {
                setBookings(data.bookings)
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || err.message)
        }
    }

    return (
        <div className='min-h-dvh p-3 '>
            <h3 className='text-2xl font-semibold mb-5 text-center'>My Bookings</h3>
            <form onSubmit={handleSubmit} className='py-10 flex justify-center '>
                <div className='border-2  rounded-xl p-2 max-w-md flex items-center gap-3 justify-between'>
                    <input 
                        type="email" 
                        name='email' 
                        className='pl-1 outline-none rounded-xl w-full' 
                        placeholder='Enter your email to get your bookings' 
                    />
                    <button 
                        type='submit' 
                        className='rounded-lg bg-indigo-500 p-2 text-white hover:bg-indigo-600 transition'>
                        <Search />
                    </button>
                </div>
            </form>

            {bookings?.length === 0 ? (
                <div className='text-gray-500 text-center'>No Booking Found</div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {bookings.map((booking: any) => (
                        <BookingCard key={booking._id} booking={booking} onDelete={handleDelete} />
                    ))}
                </div>
            )}
            
            <Button icon={Home} />
        </div>
    )
}

export default Bookings
