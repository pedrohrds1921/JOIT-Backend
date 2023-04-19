const {Router}= require(`express`)
const NotesController = require("../controllers/NotesController")
const notesRoutes= Router()
const notesController= new NotesController();
const ensureAuthenticad= require('../middleware/ensureAuthenticad')

notesRoutes.use(ensureAuthenticad)


notesRoutes.get("/",notesController.index)
notesRoutes.post("/",notesController.create)
notesRoutes.get("/:id",notesController.show)
notesRoutes.delete("/:id",notesController.delete)





module.exports= notesRoutes;