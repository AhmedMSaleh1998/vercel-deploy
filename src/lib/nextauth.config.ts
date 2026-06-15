import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthConfig: NextAuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "enter your email" },
                password: { label: "password", type: "password", placeholder: "enter your password" },
            },
            authorize: async function (credentials) {
                const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-type": "application/json" }
                });

                const finalRes = await res.json();

                if (finalRes.message === "success") {
                    return {
                        ...finalRes.user,
                        realTokenFromBackEnd: finalRes.token
                    };
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            // عند تسجيل الدخول لأول مرة، نضيف التوكن إلى JWT
            if (user) {
                token.realTokenFromBackEnd = user.realTokenFromBackEnd;
            }
            return token;
        },
        session({ session, token }) {
            // تمرير التوكن إلى الـ Session ليتم استخدامه في الكلينت
            if (session.user) {
                session.user.realTokenFromBackEnd = token.realTokenFromBackEnd;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login"
    }
};