import { Sequelize } from "sequelize";
import environments from "../config/environments";

const sequelize = new Sequelize(environments.postgres_conn)

try {
    await sequelize.authenticate();
    console.log("connection postgres connected")
} catch (error) {
    console.log("connection postgres error ",error)
}

export default sequelize;