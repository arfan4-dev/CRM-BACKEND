const express=require('express');
const app=express();
const database=require('./config/database');  
const cors=require('cors')
require('dotenv').config(); 
const PORT=process.env.PORT || 4000;

app.use(express.json());
app.use(cors())

// import route and map 
const CRMRoute=require('./route/CRMroutes');
app.use('/api/v1',CRMRoute);


database();

app.listen(PORT,()=>{
    console.log("App is Listening at ", PORT);
})

// app.get('/', (req,res)=>{res.send("This is Home Page")}); 
























