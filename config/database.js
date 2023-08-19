const mongoose=require('mongoose')  
require("dotenv").config()

const dbConnection=()=>{
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("DataBase Connect Successfully")})
.catch((err)=>{
    console.log("DB connection issue ", err)
    process.exit(1)
})
}

module.exports=dbConnection;