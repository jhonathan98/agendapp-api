import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import environments from "../config/environments";
import UserModel from "../models/userModel";
import Error from "../utils/Error";
import ErrorTypes from "../utils/ErrorTypes";
import logsServices from "./logsServices";


const validate = async ({email,password}) => {
    try {
        const user = await UserModel.findOne({ email })
        if(user){
            const match = await bcrypt.compare(password, user.password);
            if(match){
                const payload = {
                    idUser: user.id,
                    role: user.role
                }
                await logsServices.create({who: user.id, log: "LOGIN USER"})
                const token = jwt.sign(payload, environments.secret, { algorithm: 'HS256', expiresIn: '12h' })
                return { token };
            }
        }
        throw Error({ message: ErrorTypes.AUTENTICATION, errorStatus: 401});
    } catch (error) {
        throw Error({
            message: error.message || ErrorTypes.DATABASE_QUERY,
            errorStatus: error.errorStatus,
            stackTrace: error.stackTrace || error
        })
    }
}

const create = async ({ name, role, email, password }) => {
    try {
        // TODO: encrypt password
        const userChekEmail = await UserModel.findOne({ "email": email });
        if(userChekEmail){
            throw Error({ message: ErrorTypes.EMAIL_DUPLICATED, errorStatus: 401 })
        }
        const saltRounds = 10;
        const passwordEncryted = await bcrypt.hash( password, saltRounds )

        const user = await UserModel({
            name,
            role,
            email,
            password:passwordEncryted
        });
        await user.save();
        await logsServices.create({who: user.id, log: "LOGIN CREATED"})
        return user;
    }catch(error){
        throw Error({ 
            message: error.message || ErrorTypes.DATABASE_QUERY,
            errorStatus: error.errorStatus,
            stackTrace: error.stackTrace,
        });
    }
}

const getById = async ({id}) => {
    try {
        const user = await UserModel.findById(id,id);
        if(user){
            await logsServices.create({who: user.id, log: "GET USER"})
            console.log("getById");
            return{ user }
        }
        throw Error({ message: ErrorTypes.AUTENTICATION, errorStatus: 401});
    } catch (error) {
        throw Error({ 
            message: error.message || ErrorTypes.DATABASE_QUERY,
            errorStatus: error.errorStatus,
            stackTrace: error.stackTrace,
        });
    }
}

const getAll = async () => {
    try {
        const users = await UserModel.find();
        await logsServices.create({who: 0, log: "GET ALL USER"})
        console.log("all")
        return users;
    } catch (error) {
        throw Error({ 
            message: error.message || ErrorTypes.DATABASE_QUERY,
            errorStatus: error.errorStatus,
            stackTrace: error.stackTrace,
        });
    }
}

export default {
    create,
    validate,
    getById,
    getAll
}
