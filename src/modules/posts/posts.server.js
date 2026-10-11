import { Router } from "express";
import  {alldata, createPost}  from "./posts.conntroller.js";
import { postbyid } from "./posts.conntroller.js";
import { deletePost } from "./posts.conntroller.js";
import { userpost } from "./posts.conntroller.js";
import { findPostAndCountcomm } from "./posts.conntroller.js";
export const postRouter=Router()
postRouter.post("/posts",async(req, res)=>{
await createPost(req.body)
return res.status(200).json({mgs:"post created successfully"})
})
postRouter.delete("/posts/:postId",async(req,res)=>{
const {postId}=req.params
const {userid}=req.body.userId
if (await postbyid(postId)==null) {
    return res.status(200).json({mgs:"post not found"})
} else if(await userpost(postId)!=userid ) { 
    return res.status(200).json({mgs:"you are not authorized delete post"})
}else {
  await deletePost(postId)
     return res.status(200).json({mgs:"delete post"})
}

})
postRouter.get("/posts/details",async(req,res)=>{
  const data= await alldata()
   return res.status(200).json(data)
})
postRouter.get("/posts/comment-count" ,async(req,res)=>{
   const data = await findPostAndCountcomm()
     return res.status(200).json(data)
})