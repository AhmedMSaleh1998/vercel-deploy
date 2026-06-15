"use server"

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function GetMyToken(): Promise<string | null> {
    const MyCookies = await cookies();
    // اسم الكوكي يختلف بين التطوير (http) والإنتاج (https)
    const TokenFromCookies =
        MyCookies.get("next-auth.session-token")?.value ??
        MyCookies.get("__Secure-next-auth.session-token")?.value;

    if (!TokenFromCookies) {
        return null;
    }

    try {
        const decodedToken = await decode({
            token: TokenFromCookies,
            secret: process.env.NEXTAUTH_SECRET!
        });

        if (!decodedToken) {
            return null;
        }

        const customToken = decodedToken.realTokenFromBackEnd;

        console.log("decodedToken", customToken);

        return customToken || null;

    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}