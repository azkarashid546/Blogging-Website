import mongoose from "mongoose"
import Comments from "@/models/comments"

const blogsSchema = new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        required : [true, "Title is required"]
    },
    stitle : {
        type : String,
        trim : true,
        required : [true, "Sub Title is required"]
    },
    mtitle : {
        type : String,
        trim : true,
        required : [true, "Meta Title is required"]
    },
    slug : {
        type : String,
        trim : true,
        unique : true,
        required : [true, "Slug is required"]
    },
    category : {
        type : String,
        trim : true,
        required : [true, "Category is required"]
    },
    discription : {
        type : String,
        trim : true,
        required : [true, "Discription is required"]
    },
    mdiscription : {
        type : String,
        trim : true,
        required : [true, "Meta Discription is required"]
    },
    picture : {
        type : String,
        trim : true,
        required : [true, "Picture is required"]
    },
    alttext : {
        type : String,
        trim : true,
        required : [true, "Alt Text is required"]
    },
    author : {
        type : String,
        trim : true,
        required : [true, "Author is required"] 
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'commentsSchema' }],
    totalComments: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }

},
{ timestamps: true }
,)

export default mongoose?.models?.blogs || mongoose?.model("blogs", blogsSchema)