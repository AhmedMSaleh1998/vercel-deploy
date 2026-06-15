import { loginSchema } from "@/schemas/auth.schemas";
import z from "zod";


export type LoginDataType = z.infer< typeof loginSchema >