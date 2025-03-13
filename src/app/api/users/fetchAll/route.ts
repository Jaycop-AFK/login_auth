import {connect} from "@/config/database";
import { NextResponse} from "next/server";
import UserModel from "@/app/api/models/user.model";

connect();

export async function GET() {
   try {
    const users = await UserModel.find();
    return NextResponse.json({ users }, { status: 200 });
   } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
   }
}
