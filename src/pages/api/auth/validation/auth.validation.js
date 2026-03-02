import Joi from "joi";

export const userValidationSchema = Joi.object({
    role: Joi.string().required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profileAvatar: Joi.string().uri().optional()
});

export const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});