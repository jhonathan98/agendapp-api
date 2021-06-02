import { Router } from "express";
import usersController from '../../controllers/usersCtrl';
import { authVerify } from "../../middlewares/authVerify";
const route = Router();

export default (app) => {
    app.use('/users', route);
    // route.post('/', usersController.create);
    route.get('/', [ authVerify ], usersController.getAll);
    route.get('/profile', [ authVerify ], usersController.profile);
};
