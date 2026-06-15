"use server"
import axios from "axios";
import { GetMyToken } from "../api/_actions/GetMyToken";

export async function deleteItem(productId:string) {

    const token = await GetMyToken()

    const{data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers : {
            token : token as string
        }
    })
    
     return data
}
export async function clearCart() {

    const token = await GetMyToken()

    const{data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers : {
            token : token as string
        }
    })
    
     return data
}