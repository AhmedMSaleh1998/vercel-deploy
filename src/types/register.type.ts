import { registerSchema } from "@/schemas/auth.schemas";
import z from "zod";

export type Registertype = z.infer<typeof registerSchema>