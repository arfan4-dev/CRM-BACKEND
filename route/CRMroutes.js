const express=require ('express');
const router=express.Router();

const {auth,isUser,isAdmin} =require('../middleware/auth');
const {LoginUser,RegisterNewUser}=require('../controller/CRMController'); 

router.post('/login',LoginUser);
router.post('/register',RegisterNewUser); 

//Create Protected Route for test Route
router.get('/test', auth, (req,res)=>{
    return  res.status(200).json({
    success:true,
    message:'Welcome to testing'
});
})


//Create Protected Route for Student
router.get('/user', auth, isUser, (req,res)=>{
    return res.status(200).json({
    success:true, 
    message:'You are a User'
});
})

//Create Protected Route for Admin

router.get('/admin', auth, isAdmin, (req,res)=>{
    return res.status(200).json({
    success:true,
    message:'You are a Admin'
});
})

module.exports=router; 
