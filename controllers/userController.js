const users=require('../models/userModel')
const jwt=require('jsonwebtoken')

// register logic
exports.registerController=async(req,res)=>{
    console.log("inside register controller");
    const {username,email,password}=req.body
    console.log(username,email,password);

    // check if email in mongoDB
    try{
        const existingUser=await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            // already user
            res.status(406).json("Acoount already exists. Please Login!")
        }
        else{
            // register user
            const newUser=new users({
                username,email,password,github:"",linkedin:"",profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// login logic
exports.loginController=async(req,res)=>{
    console.log("inside logincontroller");
    // get user details from req body
    const {email,password}=req.body
    console.log(email,password);
    // check email and password in user model
    try{
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            // allow login
            // generate token using jwt
            const token=jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)

            res.status(200).json({
                user:existingUser,
                token
            })
        }else{
            // incorrect
            res.status(404).json("Invalid email/password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// profile updation logic
exports.editProfileController=async (req,res)=>{
    console.log("Inside editProfileController");
    const {username,email,password,github,linkedin,profilePic}=req.body
    const uploadImg=req.file?req.file.filename:profilePic
    const userId=req.userId
    try{
        const updatedUser=await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profilePic:uploadImg},{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(401).json(err)
    }
}