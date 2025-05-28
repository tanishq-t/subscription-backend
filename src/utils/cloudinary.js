import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type: "auto"})
        console.log("File uploaded successfully at: ",response.url);
        fs.unlink(localFilePath, (err) => {
            if (err) {
              console.error("Error deleting the file:", err);
            } else {
              console.log("Temporary file deleted successfully");
            }
          });
        return response
    } 
    catch (error) {
        fs.unlink(localFilePath)
        return null
    }
}

export {uploadOnCloudinary}