import {connect} from "@/config/database";
import {NextRequest, NextResponse} from "next/server";
import UserModel from "@/app/api/models/user.model";

connect();

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "id is required" }, { status: 400 });
        }

        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
       
    } catch (error) {
       return NextResponse.json({ error }, { status: 500 });

    }
}