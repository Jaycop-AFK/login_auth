import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/api/models/user.model";

import { connect } from "@/config/database";
import { getDateFromToken } from "@/helpers/getDateFromToken";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDateFromToken(request);
        const user = await UserModel.findById(userId).select("-username")
        
        return NextResponse.json({ user }, { status: 200 });
       
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}