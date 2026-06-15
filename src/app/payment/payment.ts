"use server"

import axios from "axios"
import { GetMyToken } from "../api/_actions/GetMyToken"


export type shippingAddressType = {
    shippingAddress: {
        details: string,
        phone: string,
        city: string,
    }
}

export async function CreateCashOrder(cartId: string, shippingAddress: shippingAddressType) {

    const token = await GetMyToken()

    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, shippingAddress, {
        headers: {
            token: token as string
        }
    })
    return data
}

export async function CreateVisaOrder(cartId: string, shippingAddress: shippingAddressType) {

    const token = await GetMyToken()



    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, shippingAddress, {
        headers: {
            token: token as string
        }
    })
    return data
}