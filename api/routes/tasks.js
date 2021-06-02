import {Router} from "express";
import tasksController from '../../controllers/tasksCtrl';
import { authVerify } from "../../middlewares/authVerify";
import { createTaskScheme } from "../middlewares/createTaskScheme";
import { getAllTaskScheme } from "../middlewares/getAllTaskScheme";
import { updateTaskScheme } from "../middlewares/updateTaskScheme";
const route = Router();

export default (app) => {
    app.use('/tasks', route);
    route.get('/', [ authVerify, getAllTaskScheme ], tasksController.getAll);
    route.get('/:id', [ authVerify ], tasksController.detail);
    route.post('/create', [ authVerify, createTaskScheme ], tasksController.create);
    route.put('/status/:id', [ authVerify, updateTaskScheme ], tasksController.updateStatus);
}