import { comparePassword, hashPassword, } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js"
import JWT from "jsonwebtoken"

export const registerController = async(req,res) => {
    
    try{
        const {name,email,password,phone,address} = req.body
        //validations
        if(!name){
            return res.send({error:'Name is Required'})
        }
        if(!email){
            return res.send({error:'Email is Required'})
        }
        if(!password){
            return res.send({error:'Password is Required'})
        }
        if(!phone){
            return res.send({error:'Phone Number is Required'})
        }
        if(!address){
            return res.send({error:'Address is Required'})
        }

        //check User
        const existingUser = await userModels.findOne({email})
        //existing User
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:"Already Register Please Login",
            })
        }
        //register User
        const hashedPassword = await hashPassword(password)
        //save
        const Users =await new userModels({name,email,phone,address,password:hashedPassword}).save()

        res.status(201).send({
            success: true,
            message: "User Registerd Successfully",
            Users,

        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error 
        })

    }
};


//POST LOGIN
export const loginController =async(req,res)=>{
    try{
        const{email,password} =req.body
        //validation
        if(!email||!password){
            return res.status(404).send({
                success:false,
                message:"Invalid Email or Password",
            })
        }
    
    //checkuser
    const Users = await userModels.findOne({email})
    if(!user){
        return res.status(404).send({
            success: false,
            message: "Email is not registerd"
        })
    }
    const match = await comparePassword(password,user.password)
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })

    }
}
