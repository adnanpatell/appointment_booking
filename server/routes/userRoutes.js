const express = require('express')
const router = express.Router();
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authMiddleware = require('../middleware/authMiddleware')
router.post('/register', async (req,res) =>{
    try {
        
        const userExist = await User.findOne({email: req.body.email})
        if(userExist){
                return res.status(200).send({message:"User Already Exists", success: false})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt)
        req.body.password = hashedpassword;
        const newUser = new User(req.body);

        await newUser.save();
        res.status(200).send({message: "User created successfully", success: true})
    } catch (error) {
        console.log(error)
     res.status(500).send({message:"Error Creating User!", success: false})   
    }
})


router.post('/login', async (req,res) =>{
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(200).send({message: "User does not exist", success: false})
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch)
        {
            return res.status(200).send({message: "Invalid Credentials", success: false}) 
        }   
        else{
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
                expiresIn: "1d"
            })
            res.status(200).send({message: "Login Successfull", success: true, data:token})
        } 
    } catch (error) {
        console.log(error)
      res.status(500).send({message:"Error Logging In", success: false})
    }
})

router.post('/get-user-info-by-id', authMiddleware, async(req,res)=> {
try {
    const user = await User.findOne({_id: req.body.userId})
    user.password = undefined;
    if(!user){
        return res.status(200).send({message:"User Does Not Exist", success: false})
    }
    else{
        res.status(200).send({success:true, data:
        {
            name:user.name,
            email:user.email,
        }
    })
    }
} catch (error) {
    

    res.status(500).send({message:"Error Logging In", success: false, error})
}
})



module.exports = router;