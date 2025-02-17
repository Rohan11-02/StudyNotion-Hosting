const cloudinary = require("cloudinary").v2;

exports.deleteFileFromCloudinary = async(filePublicId, resourseType) => {
    try{
        let options = {
            resource_type : resourseType,
        }
        const response = await cloudinary.uploader.destroy(filePublicId, options);
        console.log("File deleted form Cloudinary Successfully :",response);
    }
    catch(err){
        console.log("Failed to delete file from Cloudinary");
        console.log(err);
    }
}