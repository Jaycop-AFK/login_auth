import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: string;
    // Add other properties if needed
}

export const getDateFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken: DecodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        
        return decodedToken.id;

    } catch (error) {
        console.log(error);
        throw new Error("Invalid token");
    }
};