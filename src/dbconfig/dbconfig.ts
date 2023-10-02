import mongoose from "mongoose";



export async function connect () {
    try {
        
        mongoose.connect(process.env.MONGO_URI!);
        const connection= mongoose.connection;

        connection.on('connected',()=>{
            console.log("mongodb connected seccessfully");
            
        })

        connection.on('error',(err)=>{
            console.log(
                'mongoDB error connection pleas make sure  mongoDB is running '+err
            );
            process.exit()
            
        })

        
    } catch (error) {
        console.log("somthing goes wrong");
        console.log(error);
        
        
        
    }
  
}
