//import { DataTypes } from "sequelize";
import pkg from 'sequelize';
const { DataTypes } = pkg;
import sequelize from "../connection/postgresconn";

export const LogAgenda = sequelize.define('LogAgenda',{
    who: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    who: {
        type: DataTypes.STRING,
    },
    when: {
        type: DataTypes.DATE,
    },
    log: {
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'agendapp_logs',
    //timestamps:false
})