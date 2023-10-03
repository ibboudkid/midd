import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModle"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

connect()
export async function POST(request:NextRequest) {
    try {
        const reqbody=await request.json()
        const{username,email,password}=reqbody;

        //check if user already exists
        const user =await User.findOne({email})
        if(user){
            return NextResponse.json({error:"user already exists"})
        }
        
        ///hashPassword

        const salt= await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hash(password,salt)



        //create user 

        const newUser= new User({
            username,
            email,
            password:hashedPassword
        })

        //saved user

        const savedUser=await newUser.save()

        console.log(savedUser);
         
        ///send verification email 
         
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        

        return NextResponse.json({
            message:"user created successfully",
            success:true,
            savedUser

            })

        
    } catch (error:any) {

        return NextResponse.json({error:error.message},{status:500})
        
    }
    
}