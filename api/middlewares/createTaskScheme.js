import Joi from "joi";
import ValidationSchema from "../../utils/ValidationSchema";

export const createTaskScheme = (req, res, next) => {

    const scheme = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        due_date: Joi.date(),
        responsible: Joi.string().required(),
        collaborators: Joi.array().items(Joi.string()).required()
    });

    ValidationSchema({res, data: req.body, scheme, next })
    
}