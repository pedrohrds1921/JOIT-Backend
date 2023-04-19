require("dotenv/config")
require("express-async-errors");
const AppError = require("./utils/AppError");
const migrationsRun = require('./database/migrations');
const uploadConfig= require("../src/configs/upload")
const express= require("express")
const cors= require("cors")


const routes= require("./routes");
migrationsRun();
const PORT=process.env.SERVER_PORT || 3333  ;
const app= express();
app.use(cors())
app.use(express.json())


app.use("/files",express.static(uploadConfig.UPLOAD_FOLDER))
app.use(routes)



app.use((error, request,response,next)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status:"erro",
            message: error.message
        })
        return response.status(500).json({
            status:"error",
            message:"Internal Server error"
        })
    }
})


app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`))