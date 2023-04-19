const {Router}= require(`express`)
const TagsController = require("../controllers/TagsController")
const tagsRoutes= Router()
const tagsController= new TagsController();
const ensureAuthenticad= require('../middleware/ensureAuthenticad')

tagsRoutes.get("/",ensureAuthenticad,tagsController.index)






module.exports= tagsRoutes;