import { NextRequest, NextResponse } from "next/server";

import dotenv from "dotenv";

import { connect } from "@/config/database";

import UserModel from "@/app/api/models/user.model";


dotenv.config();

connect();

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "id is required" },
      { status: 400 }
    );
  }

  try {
    const reqBody = await request.json();
    const user = await UserModel.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
