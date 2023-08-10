const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
       const con=await mongoose.connect("mongodb://localhost:27017/Multer",{
       
       })
       console.log(`MongoDB connected... ${con.connection.host}`);
    }catch(ex){
        console.log(ex.message);
        process.exit(1)
    }
}

module.exports=connectDB;