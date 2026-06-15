"use server"

import axios from "axios"
import { GetMyToken } from "../api/_actions/GetMyToken"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
    id: string;
    [key: string]: any;
}

export async function getUserOrders() {
    const token = await GetMyToken();
    if (!token || typeof token !== 'string') {
        throw new Error("Token is invalid or not a string");
    }
    const userData = jwtDecode<DecodedToken>(token);

    console.log(userData);

    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`);

    return data;
}