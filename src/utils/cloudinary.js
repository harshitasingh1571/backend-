import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary';

   cloudinary.config({ 
        cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
        api_key: 'process.env.CLOUDINARY_API_KEY', 
        api_secret: 'process.env.CLOUDINARY_API_SECRET' // Click 'View API Keys' above to copy your API secret
    });
    
   const uploadOnCloudninary=async(localFilePath)=>{
    try{
        if(!localFilePath) return null
        //upload the file on cloudinary
       const response= await  cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded succesfully
        console.log("file is uploaded on cloudinary" , response.url);
       return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath)//remove the locally saved  temporary files as upload opeartion got failed 
        return null;
    }
   }
   export{uploadOnCloudninary}