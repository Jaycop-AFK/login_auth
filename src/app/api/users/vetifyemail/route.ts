import {connect} from "@/config/database";
import {NextRequest, NextResponse} from "next/server";
import UserModel from "@/app/api/models/user.model";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        const user = await UserModel.findOne({
            vetifyToken: token,
            vetifyTokenExpire: {$gt: Date.now()},
        });
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        
        user.isVertify = true;
        user.vetifyToken = undefined;
        user.vetifyTokenExpire = undefined;
        await user.save();
        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
       
    } catch (error) {
       return NextResponse.json({ error }, { status: 500 });

    }
}