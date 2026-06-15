import { Registertype } from "@/types/register.type";
import { toast } from "sonner";

export const register = async (data: Registertype) => {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    const finalData = await res.json()
    if (!res.ok) {
      toast.error(finalData.message, { position: "top-center" });
      throw new Error(finalData.message)
    }
    toast.success("User Added successfuly", { position: "top-center" });
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};