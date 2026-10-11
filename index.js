import{ bootstrap} from "./src/bootstrap.js";
import { sequelize } from "./src/DB/db.conniction.js";
import  User, { usersign } from "./src/modules/users/user.controller.js";
import usermodel from "./src/DB/models/usermodel.js"
import postmodels from "./src/DB/models/postmodel.js";
import { usersrouter } from "./src/modules/users/user.services.js";
import { postRouter } from "./src/modules/posts/posts.server.js";
import { app } from "./src/bootstrap.js";
import { commentRouter } from "./src/modules/Comments/comments.servicers.js";
bootstrap(),
await sequelize.authenticate()
await sequelize.sync()
User ,
usermodel,

postmodels,
app.use(usersrouter,postRouter,commentRouter)
