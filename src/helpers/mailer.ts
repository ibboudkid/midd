import nodemailer from "nodemailer"
import User from "@/models/userModle"
import bcryptjs from "bcryptjs"



export const sendEmail=async ({email,emailType,userId}:any)=>{

try {

    /// created hash token

   const hashedtoken=await bcryptjs.hash(userId.toString(),10)


   if (emailType==="VERIFY") {

    await User.findByIdAndUpdate(userId,{
        verifyToken:hashedtoken,
        verifyTokenExpiry:Date.now()+3600000
       })
    
   }
   else if(emailType === "RESET"){
    await User.findByIdAndUpdate(userId,{
        forgotPassword:hashedtoken,
        forgotPassworTokenExpiry:Date.now()+3600000
       })

   }

   var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f70f616d7a6372",
      pass: "d6d7173f324398"
    }
  });

  const mailOptions={
    from:'king@gmail.com',
    to :email,
    subject:emailType === "VERIFY" ? "VERIFY YOURC EMAIL" : "RESET YOU PASSWORD ",
    html:`<p>click<a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here</a>
    to ${emailType === "VERIFY" ? "VERIFY YOURC EMAIL" : "RESET YOU PASSWORD "} or copy and paste
    the link below in your browser <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedtoken}
    </p>`

  }

  const mailres= await transport.sendMail(mailOptions)

  return mailres;



    
} catch (error:any) {
    throw new Error(error.mesaaage)
    
}

}