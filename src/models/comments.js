import mongoose, { Mongoose } from "mongoose"
import blogs from "@/models/blogs"
const commentsSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [true, "Name is required"]
    },
    email : {
        type : String,
        trim : true,
        required : [true, "Email is required"]
    },
    comments : {
        type : String,
        trim : true,
        required : [
            true, "Comment is required"
        ]
    },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'blogs' },
    createdAt: { type: Date, default: Date.now },

})
export default mongoose?.models?.comments || mongoose?.model("comments", commentsSchema)