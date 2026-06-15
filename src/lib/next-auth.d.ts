import "next-auth";
import { DefaultSession } from "next-auth"; 
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        realTokenFromBackEnd?: string;
    }

    interface Session {
        user: {
            realTokenFromBackEnd?: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        realTokenFromBackEnd?: string;
    }
}