import express from "express"
import multer from "multer";
const router = express.Router();
import {UploadApiResponse, v2 as cloudinary} from "cloudinary";
import File from "../models/File";

const storage = multer.diskStorage({})
    let upload = multer({
        storage,
    })
router.post("/upload", upload.single("myFile"), async(req, res) => {
    try{
        if(!req.file)
        return res.status(400).json({message: "Hey bro! We need the file"});
        console.log(req.file);

        let uploadedFile: UploadApiResponse;
        try{
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder:"FileShare",
                resource_type:"auto",
            })
        }catch(err){
            console.log(err);
            return res.status(400).json({message: "Cloudinary Error"});
        }
        const {originalname} = req.file;
        const {secure_url, bytes,format} = uploadedFile;

        const file = await File.create({
            filename:originalname,
            sizeInBytes: bytes,
            secure_url,
            format,
        })
        res.status(200).json({
            id:file._id,
            downloadPageLink:`${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ message:"Server Error :(" });
    }
})

export default router;