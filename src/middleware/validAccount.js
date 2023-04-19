const  knex = require("../database/knex")

const AppError = require("../utils/AppError");



function is (type){
    const validAccount= async (req,res,next)=>{
   const user_id=req.user.id
    const user = await knex('users').where({id:user_id}).first()

    switch (type) {
        case 'admin':
        if(user.typeAccount==type){
            return next()
        }
        break;
        case 'user':
            if(user.typeAccount===type){
               return next()
            }
        break; 
    }
    if( user.typeAccount!=type){
        res.send("usuario sem permissão")
    }
}
 return validAccount
}
module.exports = is