import { sequelize } from '../../DB/db.conniction.js';
import  user  from "../users/user.controller.js";
import { Model } from 'sequelize';
import postmodels from '../../DB/models/postmodel.js';
import { fn, col } from "sequelize";

import commentmodels from '../../DB/models/commentsmodel.js';

import "../../DB/models/reletions.js" 
import chalk from 'chalk';
import { Fn } from 'sequelize/lib/utils';
export const createPost =async(post)=>{

  const postbulid =postmodels.build({
  
title:post.title,
content:post.content,
 userId:post.userId

  })
  try {
  await postbulid.save()
 
  console.log("post created successfully");
  return postbulid
 } catch (error) {
     console.log(error);
     return postbulid
     
    }
    
     
 
}
export  const postbyid = async (id)=>{
  const postId = await posts.findOne({where:{id:id}})

return postId;
  }
export const deletePost=async(id)=>{
   await postmodels.destroy({
      where: {
         id:id,
      },
   });
}
export const userpost=async(id)=>{
const post=await postbyid(id)
return post.userId
}

  export 
   const alldata =async()=>{  
   const all= await postmodels.findAll({attributes:[
      "title"
      ,"id"
   ],
   include: [{ model: user,  attributes
      :[
      "id","name"
   ]}
   ,{
   model:commentmodels,
   attributes:[
      "id",
      "content"
   ]}
 ],
  
  
   })
   return all

}
   export const findPostAndCountcomm= async()=>{ 
      const posts =
   await postmodels.findAll({attributes:[
      "title"
      ,"id",
      [fn("COUNT", col("commentmodels.id")), "commentCount"]
   ]
   ,
   include: [{ model: commentmodels, attributes
      :[]}],
    group: ["postmodels.id"]
})
return posts;
}