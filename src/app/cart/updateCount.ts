"use server"

import axios from "axios"
import { GetMyToken } from "../api/_actions/GetMyToken"

export async function updateCount(productId : string , count : number) {

    const token = await GetMyToken()

 const {data} =   await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    count
 } ,
  {
        headers : {
            token : token as string
        }
    })
    return data

}
