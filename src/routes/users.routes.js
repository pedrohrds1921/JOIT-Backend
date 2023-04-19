const {Router}= require(`express`)

const multer=require("multer")
const uploadConfig= require("../configs/upload")
const UsersControllers = require("../controllers/UserController")
const ensureAuthenticad= require('../middleware/ensureAuthenticad')
const UsersAvatarControllers= require("../controllers/UserControllerAvatar")

const userRoutes= Router()
const upload=multer(uploadConfig.MULTER)





const useController= new UsersControllers();
const usersAvatarControllers= new  UsersAvatarControllers()

userRoutes.post("/",useController.create)
userRoutes.put("/",ensureAuthenticad,useController.update)
userRoutes.delete("/:id",useController.delete)
userRoutes.patch("/avatar",ensureAuthenticad,upload.single("avatar"),usersAvatarControllers.update)



module.exports= userRoutes;