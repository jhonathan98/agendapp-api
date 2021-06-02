import moongose from "mongoose";
import environments from "../config/environments";

const url = environments.mongo_conn;
moongose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = moongose.connection;
db.on('error', () => console.log('Error connecting with database mongo')),
db.once('open', () => console.log('Success connecting with database mongo'));

export default db;