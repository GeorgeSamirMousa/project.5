import { Router } from "express";
import User, { usersign } from "./user.controller.js";
import { userbyid } from "./user.controller.js";
import usermodel from "../../DB/models/usermodel.js";
import { createuser } from "./user.controller.js";
import { createuserbyid } from "./user.controller.js";
import { updateuserbyid } from "./user.controller.js";
import { userByIdNotRole } from "./user.controller.js";

export const usersrouter =Router()
usersrouter.post("/users/signup",async(req, res)=> {
const {email} = req.body
const {data}=await usersign(email)
    if (data.users===null) {
        const result =
   await createuser(req.body)
   
        return res.status(200).json({mgs:result}) 
       }
else{
    
     return res.status(200).json({mgs:"eamil is ready exist"}) 
}
})
usersrouter.put("/users/:id",async(req,res)=>{
const {id} = req.params
const {data}=await userbyid(id)
if (data.users==null) {
await createuserbyid(req.body)
return res.status(200).json({msg:"user Create and update successuflly"}) 
}else{
     updateuserbyid(data,req.body)
     return res.status(200).json({msg:"user Create and update successuflly"}) 
}
})
usersrouter.get("/users/by-email",async(req,res)=>{
const { email } = req.query
const {data} = await usersign(email)
if (data.users==null) {

     return res.status(200).json({msg:"no user  found"}) 
}else{
     
     return res.status(200).json(data.users) 
}

})
usersrouter.get("/users/:id",async(req,res)=>{

const {id} = req.params
const {data}=await userByIdNotRole(id)
if (data.users==null) {
return res.status(200).json({msg:"user not found"}) 
}else{
     
     return res.status(200).json(data.users) 
}
})
     
