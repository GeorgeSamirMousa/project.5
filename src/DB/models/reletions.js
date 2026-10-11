import user from "../../modules/users/user.controller.js";
import commentmodels from "./commentsmodel.js";
import postmodels from "./postmodel.js";


user.hasMany(postmodels, { foreignKey: "userId" });
postmodels.belongsTo(user, { foreignKey: "userId" });

postmodels.hasMany(commentmodels, { foreignKey: "postId" });
commentmodels.belongsTo(postmodels, { foreignKey: "postId" });

user.hasMany(commentmodels, { foreignKey: "userId" });
commentmodels.belongsTo(user, { foreignKey: "userId" });





