'use client'
import { BookingType } from '@/types/Booking';
import { AlarmClock, Calendar, Clock1, Trash } from 'lucide-react';

const BookingCard = ({ booking, onDelete }:{
    booking: BookingType,
    onDelete:(id:string)=>void
}) => {
  return (
    <div className='bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-2xl transition-all max-w-sm'>
      <div className='flex flex-col space-y-4'>
        <div>
          <h3 className='text-xl font-semibold text-gray-800'>{booking.name}</h3>
          <p className='text-sm text-gray-500'>{booking.email}</p>
        </div>

        <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2 text-xs'>
                <Calendar size={20}/>
                <p>{new Date(booking.date).toDateString()}</p>
            </div>
            <div className='flex items-center gap-2 text-xs'>
                <AlarmClock size={20}/>
                <p>{booking.time}</p>
            </div>
            <div className='flex justify-end text-red-500'>
                
                <Trash size={32} onClick={()=>onDelete(booking._id!)} className='hover:bg-red-400 hover:text-white rounded-lg  transition-all duration-200 p-2'/>
            </div>
        </div>
      </div>

      
    </div>
  );
};

export default BookingCard;
