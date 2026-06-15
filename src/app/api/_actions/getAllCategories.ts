import { Category } from "@/types/product.type";

export default async function GetAllCategories():Promise<Category[]>{

 let response = await  fetch (`https://ecommerce.routemisr.com/api/v1/categories` , {method:"Get", next:{revalidate:30}});
 let {data} = await response.json()
console.log(data);

return data

}