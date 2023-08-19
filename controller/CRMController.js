const RoleSchema=require('../model/CRMSchema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
exports.RegisterNewUser=async(req,res)=>{
    try{
        // Register a new user
        const {email,password,role}=req.body;
        const isExisted=await RoleSchema.findOne({email})
        if(isExisted){
            return res.status(400).json({Success:false,message:'User already existed'})
        }
        let hashedPassword;
        try{
             hashedPassword=await bcrypt.hash(password,10)

        }
        catch(err){
            return res.status(500).json({
                message:"Does not get hashed your password"
            })
        }

        const newUser=await RoleSchema.create({email,password:hashedPassword,role});
        res.status(201).json({ message: 'User registered successfully',newUser });
    }

    catch(error){
        res.status(500).json({
            message:"Something went wrong, newUser not registered"
        })
    }
}

exports.LoginUser=async(req,res)=>{
    try{
        //login user
        const {email,password}=req.body;
        if(!email | !password){
            return res.status(400).json({
                message:"Please fill all the fields",
                success:false
            });
        }
        const user = await RoleSchema.findOne({ email });
        if(!user){
            return res.status(400).json({
                message:'User is not registered, Please signup'
            })
        }

      
const isPasswordValid=await bcrypt.compare(password,user.password);

const payload={
    email:user.email,
    id:user._id,
    role:user.role
}
        if(isPasswordValid){
           let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'}); 


           const userResponse = user.toObject(); // Convert to plain JavaScript object
           userResponse.token = token; // Add the token to the response object
        //    delete userResponse.password; // Remove the password from the response




const options={
    expires:new Date(Date.now() + 3*24*60*60),
    httpOnly:true,
};
           res.cookie('ArfanCookie',token,options).status(200).json({
            message:"User Logged in Successfully",
            user: userResponse,
            token,
            success:true
           })
        }
        else{
            return res.status(403).json({success:false,message:"Password does not match"})
        }
    }
    catch(error){
        res.status(500).json({ error: 'An error occurred while login', error });
    }

}