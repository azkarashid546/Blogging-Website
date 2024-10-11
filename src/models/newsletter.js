import mongoose, { Mongoose } from "mongoose"

const newsletterSchema = new mongoose.Schema({
 
    email : {
        type : String,
        trim : true,
        unique : true,
        required : [
            true, "Email is required"
        ],
    },
    createdAt: { type: Date, default: Date.now }
    
})

export default mongoose?.models?.newsletter || mongoose?.model("newsletter", newsletterSchema)