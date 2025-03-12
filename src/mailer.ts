import nodemailer from "nodemailer";
import UserModel from "./app/api/models/user.model";
import bcrypt from "bcrypt";


type IEmailType = {
    email: string;
    emailType: string;
    userId: string;
};

export const sendEmail = async ({email,emailType,userId}: IEmailType) => {

try {
    const hashedToken = await bcrypt.hashSync(userId.toString(), 10);
   if(emailType === "VERIFY") {
        await UserModel.findByIdAndUpdate(userId, {
            vetifyToken: hashedToken,
            vetifyTokenExpire: Date.now() + 3600000,
        });
    } else if (emailType === "RESET") {
        await UserModel.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpire: Date.now() + 3600000,
        });
    }

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7b21165c92ffe9",
          pass: "4c9eda5e4dd2ca"
        }
      });

    const mailOptions = {
        from: 'deexc@example.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="http://localhost:3000/vetifyEmail?token=${hashedToken}">here</a> to ${
            emailType === "VERIFY" ? "verify your email" : "reset your password"
          } or copy and paste the link below in your browser. <br> ${
            emailType === "VERIFY"
              ? `http://localhost:3000/vetifyEmail?token=${hashedToken}`
              : `http://localhost:3000/resetpassword?token=${hashedToken}`
          } </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
} catch (error) {
    console.error(error);
    throw new Error("Error in sending email");
}
}