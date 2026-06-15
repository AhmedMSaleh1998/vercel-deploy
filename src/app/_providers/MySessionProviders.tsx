"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import CartContextProvider from '../_context/CartContext'

export default function MySessionProviders({children}: {children:React.ReactNode}) {
  return <SessionProvider>
<CartContextProvider>

  {children}

</CartContextProvider>
  </SessionProvider>
}
