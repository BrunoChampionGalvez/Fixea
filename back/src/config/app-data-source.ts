import { DataSource } from "typeorm"
import { config } from "dotenv"

config({path: '../../.env'})

export const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
})