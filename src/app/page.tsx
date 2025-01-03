'use client'
import { Calendar1Icon, MailIcon, PhoneCall, ShoppingCart, User2Icon, UsersRound } from 'lucide-react'
import { useState } from 'react'
import { SlotLoader } from '@/components/skeleton/Loader'
import Button from '@/components/modal/Button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { BookingSchema, BookingType } from '@/types/Booking'
import Booking from '@/components/modal/Booking'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'


const Home = () => {

  const [slots, setSlots] = useState<string[]>([])
  const [slot, setSlot] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [item, setItem] = useState({})
  const [isModal, setIsModal] = useState(false)


  const handleCloseModal = () => {
    setIsModal(false)
    setItem({})
  }

  const handleSlot = (item: string) => {
    setSlot((prev) => prev === item ? "" : item)
    setError("")
  }
  const handleAvailableSlots = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/slot')
      console.log(data)
      if (data.success) {
        setSlots(data.slots)

      }
    } catch (err: any) {
      console.log("Error", err.response?.data.message)
    } finally {
      setLoading(false)
    }
  }
  const handleModal = (booking: BookingType) => {
    setItem(booking)
    setIsModal(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    try {
      
      setLoading(true)
      const formData = new FormData(e.target as HTMLFormElement)
      

      const booking={
        name: formData.get('name'),
        email: formData.get('email'),
        guest: formData.get('guest') , 
        contact: formData.get('contact') ,
        date:new Date(formData.get('date') as string) ,
        time:slot
      }

      const result = BookingSchema.safeParse(booking)
      if (!result.success) {
        const { message } = fromZodError(result.error).details[0]
        setError(message)
        setTimeout(() => setError(''), 10000)
        return
      }

      const { data } = await axios.post('/api/booking', booking)
      const form = e.target as HTMLFormElement
      form.reset()
      setSlot("")

      if (data.success) {
        handleModal(data.booking)
        toast(data.message)
      }


    } catch (err: any) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-dvh grid place-content-center '>
      <div className='max-w-sm shadow-xl py-12 px-10 rounded-2xl'>
        <h3 className='text-center text-xl py-4'>Booking | Restaurant</h3>
        {error && <p className='text-xs text-red-600 text-center pb-2'>{error}</p>}
        <div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className='border-2 rounded-xl flex items-center gap-2 px-3 text-gray-500'>
              <User2Icon size={20} />
              <input
                
                type="text"
                name='name'
                className='text-sm w-full p-2 outline-none rounded-xl'
                placeholder='Full Name'
                aria-label='Full Name'
              />
            </div>
            <div className='border-2 rounded-xl flex items-center gap-2 px-3 text-gray-500'>
              <MailIcon size={20} />
              <input
                
                type="email"
                name='email'
                className='text-sm w-full p-2 outline-none rounded-xl'
                placeholder='Email Address'
                aria-label='Email Address'
              />
            </div>
            <div className='border-2 rounded-xl flex items-center gap-2 px-3 text-gray-500'>
              <PhoneCall size={20} />
              <input
                
                type="text"
                name='contact'
                className='text-sm w-full p-2 outline-none rounded-xl'
                placeholder='Contact Number'
                aria-label='Contact Number'
              />
            </div>
            <div className='border-2 rounded-xl flex items-center gap-2 px-3 text-gray-500'>
              <UsersRound size={20} />
              <select  name='guest' className='p-2 outline-none w-full ' aria-label='Number of People'>
                {/* <option value="">Select Number of People</option> */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className='border-2 rounded-xl flex items-center gap-2 px-3 text-gray-500'>
              <Calendar1Icon size={20} />
              <input
                
                type="date"
                name='date'
                onChange={handleAvailableSlots}
                className='text-sm w-full p-2 outline-none rounded-xl'
                aria-label='Booking Date'
              />
            </div>
            <div>
              <h6 className='text-xs text-gray-400 pb-4'>Available Slots</h6>
              <div className='flex justify-start flex-wrap gap-2'>
                {loading ? <SlotLoader /> : slots?.map((time, index) => (
                  <div
                    key={index}
                    onClick={() => handleSlot(time)}
                    className={`px-3 bg-green-100 py-1 text-green-600 rounded-full text-xs border-2 cursor-pointer ${slot === time ? "border-green-800" : "border-white"}`}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
            <button
              type='submit'
              className='bg-indigo-500 p-3 rounded-xl text-white hover:bg-white hover:text-indigo-600 border-2 border-indigo-600 transition-all duration-500 shadow-lg'
              aria-label='Book Now'
            >
              {loading ? 'Booking...' : 'Book'}
            </button>
          </form>
        </div>
      </div>
      {isModal && <Booking booking={item} handler={handleCloseModal} />}
      <Button url='/bookings' icon={ShoppingCart} />
    </div>
  )
}

export default Home
