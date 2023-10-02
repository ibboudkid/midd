import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModle"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from"jsonwebtoken"

connect()
export async function POST(request:NextRequest) {
    try { 
        
    const reqbody=await request.json()
    const {email,password}=reqbody
    console.log(reqbody);


    /// check if user exist 
    const user =await User.findOne({email})


    if(!user){
        return NextResponse.json({error:"user already exist"},{status:400})
    }
    
    /// check if password is correct

    const validpassword=await bcryptjs.compare(password,user.password)
    if (!validpassword ){
        return NextResponse.json({error:"invaild password"},{status:400})
    }
    
    /// create token data
    const tokenData ={
        id:user._id,
        username:user.username,
        email:user.email

    }
    //creat token
    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"}) 


    const res= NextResponse.json({
    message:"login successfully",
    success:true
 })

/// seting token
  res.cookies.set("token",token,{httpOnly:true})
 
 
 
  return res





   
        
    }catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
    
}