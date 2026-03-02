import Joi from "joi";

export const companyValidationSchema = Joi.object({
  companyName: Joi.string().min(2).max(100).required(),
  industryName: Joi.string().min(2).max(100).required(),
  companySize: Joi.number().integer().min(1).required(),
  companyLogo: Joi.string().allow(""),
  address: Joi.string().min(5).max(200).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().integer().required(),
  website: Joi.string().uri().allow(""),
  password: Joi.string().min(6).required()
});

export const companyLoginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});