import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


export const sendEmail = async({email,emailType, userId}:any) =>{
  try {
    //create a hashedtoken
    const hashedToken = await bcryptjs.hash(userId.toString(),10)

    if(emailType === "VERIFY"){
      await User.findByIdAndUpdate(userId,
      {verifyToken: hashedToken, verifyTokenExpiry: Date.now()+3600000})
    }else if(emailType === "RESET"){
      await User.findByIdAndUpdate(userId,
      {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now()+3600000})
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    });

    const isVerify = emailType === "VERIFY";

    const path = isVerify ? "/verifyemail" : "/resetpassword";
    const link = `${process.env.DOMAIN}${path}?token=${hashedToken}`;
    const mailOptions = {
      from: "rahul@gmail.com",
      to: email,
      subject: isVerify ? "Verify Email" : "Reset Password",
      html: `<p>Click <a href= "${link}">here</a> to ${isVerify ? "verify your email" : "reset your password"}
      or copy and paste the link below in browser.<br> ${link}
      </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse;
  } catch (error:any) {
    throw new Error(error.message);
  }
}