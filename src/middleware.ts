import React from 'react'
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req : NextRequest ) {

 const jwt = await getToken({req})
console.log(jwt);

 if (jwt != null){
      return NextResponse.next()
 }
return NextResponse.redirect("http://localhost:3000/login")
}
export const config = {
    
matcher : ["/cart" , "/order"]

}

 