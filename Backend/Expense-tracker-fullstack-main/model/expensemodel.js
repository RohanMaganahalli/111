const {DataTypes}=require("sequelize");
const sequelize=require("../util/db");

const Expense=sequelize.define("Expense",{
    expenseInput:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    descriptionInput:{
        type:DataTypes.STRING,
        alowNull:false,
    },
    categoryInput:{
        type:DataTypes.STRING,
        alowNull:false,
    }
},
{}
);
module.exports = Expense;