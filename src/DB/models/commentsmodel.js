import User from "../../modules/users/user.controller.js";
import {sequelize} from "../db.conniction.js";
import { DataTypes, Model } from "sequelize";
import postmodels from "./postmodel.js";
  
class commentmodels extends Model {
}
commentmodels.init({
     id:{
      type: DataTypes.INTEGER
      ,primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
content: {
        type: DataTypes.TEXT,
    },
 userId:{
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }},
      postId:{
      type: DataTypes.INTEGER,
      references: {
        model: postmodels,
        key: 'id',
      }},
   createdAt: {
type: DataTypes.DATE
   },
   updatedAt: {
type: DataTypes.DATE
   },
  },
  {sequelize  })
export default commentmodels