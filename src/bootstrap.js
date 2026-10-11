import  User  from "./modules/users/user.controller.js";

import express from "express";
export const app = express();
app.use(express.json())

export const bootstrap = async ()=>{

app.listen(1616)


}