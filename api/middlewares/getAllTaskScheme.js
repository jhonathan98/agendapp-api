import Joi from "joi"
import ValidationSchema from "../../utils/ValidationSchema";

export const getAllTaskScheme = (req, res, next) => {

    const scheme = Joi.object({
        status: Joi.number().integer(),
        due_date_init: Joi.date(),
        due_date_end: Joi.date(),
    });
    
    const data = req.query;
    if(req.query.status) data.status = Number(req.query.status);
    //console.log("query---------",data)
    ValidationSchema({res, data: data, scheme, next })
    
}