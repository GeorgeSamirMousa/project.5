import {Sequelize} from "sequelize";



export  
const sequelize = new Sequelize('database', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
}); 
