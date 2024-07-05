import multer from 'multer';
import fs from 'fs';

 
const file_dest=(destin,cb)=>{
    if(fs.existsSync(`./uploads/${destin}`)){
        cb(null, `./uploads/${destin}`);
    } else{
        fs.mkdirSync( `uploads/${destin}`);
        cb(null, `./uploads/${destin}`);
    }
}

const file_name =(file,cb)=>{
    const uniqueSuffix = Date.now();
    const imgfile = file.originalname;
    const arr = imgfile.split('.');
    const ext = arr[arr.length -1];
    arr.pop();
    cb(null, `${arr.join('.')}-${uniqueSuffix}.${ext}`)
}
// =================================== CATEGORY ====================================

    const categoryStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            file_dest('category_images',cb);
        },
        filename: function (req, file, cb) {
           file_name(file,cb);
        }
    });
    
    export const categoryUpload = multer({ storage: categoryStorage });