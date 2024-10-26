import User from "../models/userModel.js";

const viewProfile = async(req, res) => {
    try {
    
        const profile = await User.findById(req.user.id)
        if(!profile){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(201).json({data: req.user, msg: "Profile Retrieved"})
    } catch (error) {
        res.status(500).json({msg: error});  
    }
}

const updateProfile = async(req, res) => {
    try {
        const {username, email, password} = req.body
        const profile = await User.findById(req.user.id)
        if(!profile){
            return res.status(404).json({msg: "User not found"});
        }

        const updateUser = await User.findByIdAndUpdate(req.user.id, 
            {
                username,
                email,
                password: await bcrypt.hash(password,10)

        }, {
            new: true, useFindAndModify: false
        })

    if(!updateUser){
        return res.status(400).json({msg:"failed to update user",data:null})
    }
    res.status(201).json({data: updateUser, msg: "Profile Updated"})
        
    } catch (error) {
        res.status(500).json({msg: error});  
    }
}


const deleteProfile=async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.user.id)
        if(!user){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(201).json({msg: "User deleted Sucessfully"})
        
    } catch (error) {
        res.status(500).json({msg: error});  
    }

}

export {viewProfile, updateProfile,deleteProfile}