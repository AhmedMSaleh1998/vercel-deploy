import z from "zod";

export const registerSchema = z.object({
    name: z.string().nonempty("Name is required").min(3),
    email: z.string().nonempty("Email is required").email(),
    password: z.string().nonempty("password is required").min(8),
    rePassword: z.string().nonempty("rePassword is required").min(8),
    phone: z.string().nonempty("phone is required"),
})
    .refine(
        (data) => {
            return data.password === data.rePassword;
        },
        {
            message: "Pasword do not match",
            path: ["rePasword"],

        },
    )


export const loginSchema = z.object ({
    email : z.email(),
    password : z.string().nonempty().min(8),
})






















