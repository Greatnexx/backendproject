import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js";
import sendWelcomeEmail from "../utils/sendEmail.js";


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ data: null, message: 'User already exists', status: false });
        }

        const newUser = new User({
            username,
            email,
            password: bcrypt.hashSync(password, 10),
            
        });

        const savedUser = await newUser.save();

        if (savedUser) {
            await sendWelcomeEmail(savedUser);

            const token = generateToken(savedUser._id);
            res.status(201).json({
                data: {
                    _id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email,
                    token,
                },
                status: true,
                message: "User Created Successfully and welcome email sent",
            });
        } else {
            res.status(400).json({ data: null, message: "Failed to create user", status: false });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ data: null, message: error.message, status: false });
    }
}


const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"User Not Found",data:null});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid Credentials"});
        }
           const token =generateToken(user._id);
           res.status(200).json({message:'User Authentication was SucessFully',data:
            {
                id:user._id,
                username:user.username,
                email:user.email,
                token
            }})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "Server Error"});  
    }
}



export {register,login }