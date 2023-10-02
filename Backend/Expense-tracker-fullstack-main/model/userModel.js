const{DataTypes}=require("sequelize");
const sequelize=require("../util/db");

const User=sequelize.define("User",{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    is_premium:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
    total_expenses:{
        type:DataTypes.BIGINT,
        defaultValuie:0,
    },
}
);
module.exports=User