import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful", success: true },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
