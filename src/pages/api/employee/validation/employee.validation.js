import Joi from "joi";

export const employeeValidationSchema = Joi.object({
    companyId: Joi.string(), 
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().integer().required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    startingSalary: Joi.number().integer().required(),
    currentSalary: Joi.number().integer().required(),
    offerDetails: Joi.string().optional().allow(""),
    increments: Joi.array()
        .items(
            Joi.object({
                date: Joi.date().required(),
                amount: Joi.number().integer().required(),
            })
        )
        .optional(),
    joiningDate: Joi.date().required(),
    birthDate: Joi.date().required(),
    address: Joi.string().optional().allow(""),
    guardianRelation: Joi.string().required().allow(""),
    guardianNumber: Joi.number().integer().required().allow(""),
    biometricId: Joi.string().required()
});