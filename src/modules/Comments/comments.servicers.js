import { Router } from "express";
import { countcomment, createcomment, details, findall, findandcreate, newest, updateComment } from "./comments.controller.js";

export const commentRouter=Router()
commentRouter.post("/comments",async(req, res)=>{
await createcomment(req.body)
return res.status(200).json({mgs:"comment created successfully"})
})
commentRouter.patch("/comments/:commentId",async(req,res)=>{
    const {commentId}=req.params
    const {userId}=req.body
    const {contents}=req.body
    // console.log(contents);
    
    const result =
   await updateComment(commentId,userId,contents)

    return res.status(200).json({mgs:result})
})
commentRouter.post("/comments/find-or-create",async(req,res)=>{
   console.log(req.body);
   
     const result =
await findandcreate(req.body)
 return res.status(200).json({mgs:result})
})
commentRouter.get("/comments/search",async(req,res)=>{
    const {word}=req.query
   const result=await findall(word)
  const count=await  countcomment(word) 
    if(result.length===0) 
    return res.status(200).json({mgs:"comment not find"})
else {
 return res.status(200).json({mgs:result,count})   
}
})
commentRouter.get("/comments/newest/:postId",async (req,res)=>{
    const {postId}=req.params
    const result= await
    newest(postId)
    return res.status(200).json({mgs:result}) 

})
commentRouter.get("/comments/details/:id",async(req,res)=>{
    const{id}=req.params
   const result = await details(id)
    return res.status(200).json({mgs:result}) 
})