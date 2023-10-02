"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from'axios'
import {toast} from "react-hot-toast";
import { error } from "console"





export default function LoginPage() {


const route =useRouter()

const [user, setUser]=React.useState({
  email:"",
  password:"",
})

const[buttonDisabled,setButtoDisabled]=React.useState(false)

const[loading,setLoading]=React.useState(false)


useEffect(()=>{
  if(user.email.length > 0 && user.password.length > 0){
    setButtoDisabled(false)
  }else{
    setButtoDisabled(true)
  }
},[user])







const onLogin= async ()=>{
  try {
    setLoading(true)
   const res= await axios.post('/api/users/login',user)
    console.log("login succes",res.data);
    toast.success("Login success")
    route.push('/profile')
 
  } catch (error:any){
    toast.error(error.message)
    console.log("signup failed",error.message);
    
    
  }finally{
    setLoading(false)
  }

}

  return (



    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <h1>{loading?"processing":"Login"}</h1>
      <hr/>



<label htmlFor="email">email</label>
       <input
       className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black "
       id="email"
       type="text"
       value={user.email}
       onChange={(e)=>setUser({...user,email:e.target.value})}
      placeholder="email"
      
       
       />




<label htmlFor="password">password</label>
       <input
       className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black "
       id="password"
       type="password"
       value={user.password}
       onChange={(e)=>setUser({...user,password:e.target.value})}
      placeholder="password"
      
       
       />


      

      <button 
      onClick={onLogin}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        {buttonDisabled?"nologin":"login"}
      </button>


      <Link href='/signup'>visit signup page</Link>


    </div>
  )
}
