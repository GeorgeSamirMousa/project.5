// import { sequelize } from '../../DB/db.conniction.js';
// import { DataTypes } from 'sequelize';
// import  User  from "../users/user.controller.js";
// import { Model } from 'sequelize';
import { Model, Op, where } from "sequelize";
import commentmodels from "../../DB/models/commentsmodel.js";
import user from "../users/user.controller.js";
import postmodels from "../../DB/models/postmodel.js";
export const createcomment =async(comment)=>{

 
  try {
  const commentbulid = await commentmodels.bulkCreate(
  [{
      content:comment.content,
      userId:comment.userId,
      postId:comment.postId
    }
    ])
 
  console.log("comment created successfully");
  return commentbulid
 } catch (error) {
     console.log(error);
     throw error
     
    }
    
     
 
}


export const updateComment= async(id,userId,content)=>{

    const comment = await commentmodels.findOne({
        where: { id:id }
    }
);
        if (!comment ) {
            return "comment notfound"
            
        } else if(userId==comment.userId){
           comment.content=content
     await comment.save()
        
           

        return"comment updated"
        } 
        else{
         return "you are not authorized updete comment"
        }
}
export  const findandcreate= async(comment)=>
    { const find= await
    commentmodels.findOrCreate(
        {where: { 
            content:comment.content, 
            userId:comment.userId,
             postid:comment.postid
            },
  defaults: {
      content:comment.content,
     userId:comment.userId,
     postid:comment.postid
  },
    })
    return find
    
}
export
const findall= async(word)=>{
const comments= await commentmodels.findAll(
  {  where: {
        content: {
    [Op.like]: `%${word}%`
  }
    }}
)
    return comments
}
export
   const countcomment=async(word)=>{
    const count=await commentmodels.count({where:{
        content: {
    [Op.like]: `%${word}%`
  }
    }})
    return count
   }
   export
const newest =async(postid)=>{
    const find = await commentmodels.findAll({where:{
        postid:postid
    },
    order:[['createdAt','DESC']]
    ,limit:3}) 
    return find
}
export
const details =async(id)=>{
   const find =await commentmodels.findByPk(id,{
       include: [{ model: user,  attributes
             :[
             "id",
             "name",
             "email"

          ]}
          ,{
          model:postmodels,
          attributes:[
             "id", 
             "title",
             "content"
          ]}]
    })
    return find
}