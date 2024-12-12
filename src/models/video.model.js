import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema=new mongoose.Schema({
     videoFile:{ //couldmery url
        type:String,
        required:true
     },
     thumbnail:{//couldmery url
        type:String,
        required:true
     },
     title:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     },
      duration:{//couldmery url
        type:Number,
        required:true
     },
     views:{
        type:Number,
        default:0
     },
     isPublished:{
        type:Boolean,
        default:true
     },
     owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
     }
}
,{
    timestamps:true
})

videoSchema.plugin(mongooseAggregatePaginate)


export const Video=mongoose.model("Video",videoSchema)