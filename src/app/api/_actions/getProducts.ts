import { product } from "@/types/product.type";
import { GetMyToken } from "./GetMyToken";

export default async function GetAllProducts(): Promise<product[]> {
    GetMyToken ()
 let response = await  fetch (`https://ecommerce.routemisr.com/api/v1/products` , {method:"Get", next:{revalidate:30}});
 let {data} = await response.json()
console.log(data);

return data

}