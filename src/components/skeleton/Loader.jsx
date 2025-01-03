import React from 'react'

const SlotLoader = () => {
    return (
        <div className='flex flex-wrap gap-3 justify-start'>
            {
                Array.from({ length: 7 }).map((_, index) => (
                    <div 
                        key={index} 
                        className='text-xs py-3 px-6 rounded-full animate-pulse bg-gray-200'
                    ></div>
                ))
            }
        </div>
    )
}

export { SlotLoader }
