import mongoose, { Mongoose } from "mongoose"

const contactusSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [
            true, "Name is required"
        ],
    },
    email : {
        type : String,
        trim : true,
        required : [
            true, "Email is required"
        ],
    },
    contactno : {
        type : String,
        trim : true,
        required : [
            true, "Contact Number is required"
        ]
    },
    message : {
        type : String,
        trim : true,
        required : [
            true, "Message is required"
        ]
    }
})

export default mongoose?.models?.contactus || mongoose?.model("contactus", contactusSchema)