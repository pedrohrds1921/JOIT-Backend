const fs= require("fs")
const path = require("path")

const uploadCofig= require ('../configs/upload.js')

class DiskStorage{
    async saveFile(file){
        await fs.promises.rename(
            path.resolve(uploadCofig.TMP_FOLDER,file),
            path.resolve(uploadCofig.UPLOAD_FOLDER,file),
        )
    return file
    }
    async deleteFile(file){
        const filePath = path.resolve(uploadCofig.UPLOAD_FOLDER,file);
        try{
            await fs.promises.stat(filePath)
        }catch{
            return
        }
        await fs.promises.unlink(filePath)
    }
}
module.exports= DiskStorage