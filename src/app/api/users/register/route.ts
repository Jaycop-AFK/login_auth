import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import dotenv from "dotenv";

import { connect } from "@/config/database";

import UserModel from "@/app/api/models/user.model";
import { sendEmail } from "@/mailer";



dotenv.config();

connect();



export async function POST(request: Request) {

  try {

    const reqBody = await request.json();

    const { username, email, password } = reqBody;



    const user = await UserModel.findOne({ email });

    if (user) {

      return NextResponse.json(

        { error: "User with this email already exists" },

        { status: 400 }

      );

    }



    const hashedPassword = await bcrypt.hash(password, 10);



    const newUser = new UserModel({

      username,

      email,

      password: hashedPassword,

    });



    const savedUser = await newUser.save();

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json(

      { message: "User registered successfully" },

      { status: 201 }

 

    );

  } catch (error) {

    console.error("Error registering user:", error);

    return NextResponse.json(

      { error: "Failed to register user" },

      { status: 500 }

    );

  }

}

