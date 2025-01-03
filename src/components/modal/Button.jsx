import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Button = ({url="/" ,icon:Icon}) => {
  return (
    <Link href={url} className='absolute bottom-10 right-10 shadow-xl rounded-full grid place-items-center h-16 w-16 bg-indigo-600'>
        <Icon size={32} color='white'/>
    </Link>
  )
}

export default Button