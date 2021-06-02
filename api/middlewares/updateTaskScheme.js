import Joi from "joi";
import ValidationSchema from "../../utils/ValidationSchema";

export const updateTaskScheme = (req, res, next) => {

    const scheme = Joi.object({
        status: Joi.number().integer().required(),
    });
    //console.log("parametros----------",req.query)
    ValidationSchema({res, data: req.query, scheme, next })
    
}