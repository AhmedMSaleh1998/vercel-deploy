"use server"

import axios from "axios";
import { GetMyToken } from "./GetMyToken";

export async function getUserCart() {

    const token = await GetMyToken()

    if (!token) {
        return null;
    }

    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
            token: token
        }
    })

    return data

}