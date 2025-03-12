import { IUser } from "@/interfaces/user.interface";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "user is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    isVertify: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
        default: null,
    },
    forgotPasswordTokenExpire: {

        type: Date,
        default: null,
    },
    vetifyToken: {
        type: String,
        default: null,
    },
    vetifyTokenExpire: {
        type: Date,
        default: null,
    },
});

// Avoid OverwriteModelError
const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
