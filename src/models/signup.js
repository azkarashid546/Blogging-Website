import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
   name : {
    type : String,
    trim : true,
    required : [true, "Full name is required"]
   },
   userName : {
    type : String,
    trim : true,
    required : [true, "User Name  is required"]
   },
   email : {
    type : String,
    trim : true,
    required : [true, "Email is required"]
   },
   password : {
    type : String,
    trim : true,
    required : [true, "Password is required"]
   }
})

export default mongoose?.models?.user || mongoose?.model("user", signupSchema)