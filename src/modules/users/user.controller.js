import {sequelize} from '../../DB/db.conniction.js'
import { DataTypes, Error,ValidationError } from 'sequelize';
import usermodel from '../../DB/models/usermodel.js';
const  checkNameLength=(value) =>{
          if(value.name.length<3)
          {
            throw new Error("this name is short");

    }
    }
const user = sequelize.define(
  'User',
  {
    id:{
      type: DataTypes.INTEGER
      ,primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
         
    },
     email: {
        type: DataTypes.STRING,
    unique: true ,
    validate : {
        isEmail :true,
    }
    }
   ,
    password:
    {
        type: DataTypes.STRING,
    validate : {
       checkPasswordLength(value) {
          if (value.length <7 ) {
            throw new Error("password length greater than 6 characters");

    }
    }
}
}
    ,
    role:{type: DataTypes.ENUM('user', 'admin')

    }, 
   createdAt: {
type: DataTypes.DATE
   },
   updatedAt: {
type: DataTypes.DATE
   },

  },
  
  {
       
hooks: {
      beforeCreate(value) {
     checkNameLength(value)
      },
    },}

);
export default user;
export  const usersign = async (email)=>{
  const users = await user.findOne({where:{email:email}})
  
  return{
  data:  {
users
    }
  }

}
export const createuser=async(User)=>{

  const userbulid =user.build({
  
 name: User.name,
 email:User.email,
 password: User.password,
 role:  User.role,

  })
  try {
  await userbulid.save()
 
  console.log("db is done");
  return "db is done"
 } catch (error) {
   const errorvalidtion = error instanceof ValidationError
   if(errorvalidtion==true){

console.log(error.errors);
 return "email is not done"
   }
   else{
     console.log(error);
     return "db is not done"
     
    }
    
  
 }
}
export  const userbyid = async (id)=>{
  const users = await user.findOne({where:{id:id}})
  
  return{
  data:  {
users
    }
  }

}
export const createuserbyid=async(User)=>{

  const userbulid =user.build({
  
 name:User.name,
 email:User.email,
 password: User.password,
 role:  User.role,

  })
  try {
  await userbulid.save()
 
  console.log("db is done");
  return userbulid
 } catch (error) {
     console.log(error);
     return userbulid
     
    }
    
     
 
}
export const updateuserbyid = async (data , newdata) => {
 data.set(newdata)
  try {
  await data.save({
    validate:false
  })
 
  console.log("db is done");
  return newdata
 } catch (error) {
     console.log(error);
     return newdata
     
    }
}
export  const userByIdNotRole = async (id)=>{
  const users = await user.findOne({where:{id:id,},attributes:{

    exclude:["role"]}
  }
  )
  
  return{
  data:  {
users
    }
  }

}