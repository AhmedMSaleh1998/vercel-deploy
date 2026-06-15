"use client"

import { cartContext } from '@/app/_context/CartContext'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext } from 'react'

export default function Navbar() {

let session = useSession()


function handelLogout (){
  signOut ({redirect:true , callbackUrl:"/login"})
}

const {numOfCartItems}= useContext(cartContext)


  return <>
  <nav>
    <div className="container flex justify-between items-center py-4 w-full md:w-[80%] mx-auto">
      <div className="left">
        <ul className='flex gap-x-4 items-center'>
          <li><Link href="/" className='font-bold text-2xl'><i className="fa-solid text-green-500 fa-cart-arrow-down "></i>FreshCart</Link></li>
          <li><Link href="/">Home</Link></li>

          <li className='relative'>
            <span className='bg-amber-200 text-white text-sm p-1 rounded-2xl absolute -top-5 -right-2'>{numOfCartItems}</span>
            <Link href="/cart">Carts</Link>
            
            </li>

          <li><Link href="/products">Products</Link></li>
          <li><Link href="/categories">Categories</Link></li>
          <li><Link href="/brands">Brands</Link></li>
        </ul>
      </div>
      <div className="right">
        <ul className='flex gap-x-4'>
          <li><i className="fa-brands fa-facebook"></i></li>
          <li><i className="fa-brands fa-square-instagram"></i></li>
          <li><i className="fa-brands fa-youtube"></i></li>
          <li><i className="fa-brands fa-square-linkedin"></i></li>

          {session.data?  <li><Button onClick={handelLogout} >SignOut</Button></li> : <>
          
          <li><Link href="/login">Login</Link></li>
          <li><Link href="register">Register</Link></li>
          </> }

          
        </ul>
      </div>


    </div>
  </nav>


        </>
}
