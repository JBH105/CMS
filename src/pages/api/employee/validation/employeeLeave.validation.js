import Joi from "joi";

export const createLeaveSchema = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    reason: Joi.string().required(),
    leaveType: Joi.string().valid("one-hour", "two-hour", "half-day", "one-day", "more-than-oneday").required()
});