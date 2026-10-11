import {sequelize} from "../db.conniction.js";
import { Model } from "sequelize";
import  DataTypes  from 'sequelize';
import User from "../../modules/users/user.controller.js";


class postmodels extends Model {
}
postmodels.init(
  {
     id:{
      type: DataTypes.INTEGER
      ,primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  title : {
        type: DataTypes.STRING,
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
   createdAt: {
type: DataTypes.DATE
   },
   updatedAt: {
type: DataTypes.DATE
   },
  },
  {sequelize,paranoid: true  })
export default postmodels