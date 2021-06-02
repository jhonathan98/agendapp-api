import TaskModel from "../models/taskModel";
import Error from "../utils/Error";
import ErrorTypes from "../utils/ErrorTypes";
import logsServices from "./logsServices";

const create = async ({
    title,
    due_date,
    description,
    responsible,
    collaborators
}) => {
    try {
        const task = TaskModel({
            title,
            due_date,
            description,
            responsible,
            collaborators
        })
        await task.save();
        return task;        
    } catch (error) {
        throw Error({
            message: error.message || ErrorTypes.DATABASE_QUERY,
            errorStatus: error.errorStatus,
            stackTrace: error.stackTrace || error
        })
    }
}

const detail = async (id) => {
    try {
        const query = { "_id":id }
        const task = await TaskModel.findById(query)
        .populate("responsible", "name email")
        .populate("collaborators", "name email")
        .exec();       
        return task;
    } catch (error) {
        throw Error({
            message: error.message || ErrorTypes.DATABASE_QUERY,
            errorStatus: error.errorStatus,
            stackTrace: error.stackTrace || error
        })
    }
}

const getAll = async ({ status, due_date_init, due_date_end }) => {
    try {
        //TODO: filtrar por el ususario responsabe (token)
        const query = {}
        if(status) query['status'] = Number(status);
        if(due_date_init && due_date_end){
            query['due_date'] = { '$gte': due_date_init, '$lte': due_date_end }
        }
    const task = await TaskModel.find(query)
    .populate("responsible", "name email")
    .populate("collaborators", "name email")
    .exec();
    await logsServices.create({who:0, log:"GET ALL TASK"})       
    return task;

    } catch (error) {
        throw Error({
            message: error.message || ErrorTypes.DATABASE_QUERY,
            errorStatus: error.errorStatus,
            stackTrace: error.stackTrace || error
        })
    }
}

const updateStatus = async (id, status) => {
    try {
        //const query = { "_id": id};
        /*const update = { 
           "status" : Number(status) 
        };*/
        //await TaskModel.findOneAndUpdate(query, update);
        const task = await TaskModel.findById(id);
        task.status = Number(status);
        task.save();
        await logsServices.create({who:0,log:`Task with id ${id} was modify`})
        return {'update task':`Task with id ${id} was modify`};
    } catch (error) {
        throw Error({
            message: error.message || ErrorTypes.DATABASE_QUERY,
            errorStatus: error.errorStatus,
            stackTrace: error.stackTrace || error
        })
    }
}

export default {
    create,
    detail,
    getAll,
    updateStatus
}