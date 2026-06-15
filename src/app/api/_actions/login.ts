"use server"

import { LoginDataType } from "@/types/login.type";
export async function MyLogin (values : LoginDataType)  {
let res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",{
    body: JSON.stringify(values),
    method : "POST",
    headers: {
      "Content-Type" : "application/json"
    } 
  })

  let finalRes = await res.json()

  console.log(finalRes);
  
}

