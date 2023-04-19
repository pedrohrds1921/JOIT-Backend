const  DiskStorage  = require("../providers/DiskStore");
const  knex = require("../database/knex");
const AppError = require("../utils/AppError");


const diskStorage= new DiskStorage()

class UserControllerAvatar{
    async update(req,res){
        const user_id=req.user.id

        const avatarFilename=req.file.filename;

        const user= await knex("users").where({id:user_id}).first()

   

        if(!user){throw new AppError("Somente usuarios autenticados podem alterar o avatar",401)}
        if(user.avatar){await diskStorage.deleteFile(user.avatar)}
        
        const filename= await diskStorage.saveFile(avatarFilename)
        user.avatar=filename
      
        
        await knex("users").update(user).where({id:user_id})

        return res.json(user)

    }

}

module.exports= UserControllerAvatar