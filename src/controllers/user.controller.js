import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiErrors.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudninary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registeruser=asyncHandler(async(req,res)=>{
    const{fullname,username,email,password}=req.body;
    console.log("enail",email);
    
      if ([fullname,email,username,password].some((field)=> field?.trim()=== "")) {
        throw new ApiError(400,"all feilds are required")
      }
 const existedUser=User.findOne({
    $or:[{username},{email}]
})
if(existedUser){
    throw new ApiError(400,"username or email already exist")
}

 const avatarLocalPath=req.files?.avatar[0]?.path;
 const coverImageLocalPath=req.files?.coverImage[0]?.path;

 if(!avatarLocalPath){
  throw new ApiError(400,"avatar is required")
 }
 
 const avatar=await uploadOnCloudninary(avatarLocalPath)
 const coverImage=await uploadOnCloudninary(coverImageLocalPath)

 if(!avatar){
  throw new ApiError(400,"avatar is required")
 }

 const user= await User.create({
  fullname,
  avatar:avatar.url,
  coverImage:coverImage.url || "",
  email,
  password,
  username:username.toLowerCase()
 })

  const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"  
  )

  if(!createdUser){
    throw new ApiError(500,"Something went wrorng while regestring the user")  
  }
  
  return res.status(201).json(
    new ApiResponse(200,createdUser,"user register succesfully")
  )

})

export {registeruser}