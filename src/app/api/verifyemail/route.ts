import { connect } from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModle";


export async function POST(request:NextRequest) {
    try {

        const reqbody= await request.json()
        const{token}=reqbody
        console.log(token);


        const user= await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
        if(!user){
            return NextResponse.json({error:"invaild token"},{status:400})
        }
        console.log(user);
        user.isVerfied=true
        user.verifyToken=undefined
        user.verifyTokenExpiry=undefined
        await  user.save();
        
        return NextResponse.json({
            message:"Email is verifyed",
            success:true
        })
        
        
    } catch (error:any) {

        return NextResponse.json({error:error.mesaaage},{status:500})
        
    }
    
}