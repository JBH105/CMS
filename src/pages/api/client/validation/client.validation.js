import Joi from "joi";

export const clientValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    project_name: Joi.string().min(2).max(100).required(),
    platform: Joi.string().min(2).max(50).required(),
    communication: Joi.string().max(200).optional(),
    status: Joi.string().valid("Open", "Sale", "Close").required(),
    payment_terms: Joi.string().required(),
    account: Joi.string().required(),
    rate: Joi.string().required()
});