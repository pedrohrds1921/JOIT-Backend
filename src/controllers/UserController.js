const AppError = require("../utils/AppError");
const sqliteConnection= require("../database/sqlite");
const {hash,compare} = require("bcryptjs");

class UserController{
  async create (req,res){
        const {name,email,password}=req.body;
        const database = await sqliteConnection();
        const checkUserExists= await database.get("SELECT * FROM users WHERE email=(?)",[email])
        if(checkUserExists){
            throw new AppError("email existe")
        }
        const hashedPassword=  await hash(password,8)

        await database.run(
            "INSERT INTO users (name,email,password) VALUES(?,?,?)",[name,email,hashedPassword]
        )
        return res.status(201).send("usuario criado")
    }
   async update(request,response){
        const {name,email,password,old_password}=request.body
        const user_id= request.user.id
        const db= await sqliteConnection();
        const user= await db.get("SELECT * FROM users WHERE id=?",[user_id]);
        if (!user){
            throw new AppError('Usuario não encontrato ')
        }
        const userWithUpdateEmail=await db.get("SELECT * FROM users WHERE email=?",[email])
        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id){
            throw new AppError ('Esse email ja esta em uso.');
        }
        user.name = name ?? user.name
        user.email= email ?? user.email
        if(password && !old_password){
            throw new AppError("Gentileza Informa senha antiga")
        }
     
        if(password && old_password){
                const checkOldPassword= await compare(old_password,user.password)
                if(!checkOldPassword){
                    throw new AppError("Senha Antiga não confere")
                }
               
                if(password == old_password){
                    throw new AppError("Senhas iguas")
                    }
            user.password= await hash(password,8)
            }
        
        
        await db.run(`UPDATE users SET
        name= ?,
        email=?,
        updated_at= DATETIME('now', 'localtime'),
        password=?
        WHERE id= ?`,[user.name,user.email,user.password,user_id])


        return response.json(user)
      
    }
    
    async delete(req,res){
        const{id}=req.params
        const db = await sqliteConnection()
        await db.run('PRAGMA foreign_keys = ON;')
        await db.run(`DELETE FROM users WHERE id=?`,[id])
        res.send("Usuario deletado")
    }


}


module.exports= UserController;