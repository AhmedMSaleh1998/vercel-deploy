"use server"

import axios from "axios"
import { GetMyToken } from "./GetMyToken"

export async function addItemToCart(productId:string) {
    
 const token =   await GetMyToken()

 const {data} =  await axios.post("https://ecommerce.routemisr.com/api/v1/cart" , {

        productId : productId 
    } , {
        headers : {
            token : token as string
        }
    })

    return data
}