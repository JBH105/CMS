import { handleError, handleResponse } from "@/utils/responseHandler";
import { createLeaveService, getLeaveService, updateLeaveStatusService, leaveCountService, } from "../service/employeeLeave.service";
import { createLeaveSchema } from "../validation/employeeLeave.validation";
import { HTTP_STATUS } from "@/utils/httpStatus";

export const createLeaveHandler = async (req, res) => {
    try {
        const { error, value } = createLeaveSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        const result = await createLeaveService(value, req.user);
        return handleResponse(res, result, HTTP_STATUS.CREATED);
    } catch (error) {
        return handleError(res, new Error(error.message), HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

export const getLeaveHandler = async (req, res) => {
    try {
        const result = await getLeaveService(req.user);
        return handleResponse(res, result, HTTP_STATUS.OK);
    } catch (error) {
        return handleError(res, new Error(error.message), HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

export const approveLeaveHandler = async (req, res) => {
    try {
        const result = await updateLeaveStatusService(req.query.id, "approved", req.user);
        return handleResponse(res, result, HTTP_STATUS.OK);
    } catch (error) {
        return handleError(res, new Error(error.message), HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

export const rejectLeaveHandler = async (req, res) => {
    try {
        const result = await updateLeaveStatusService(req.query.id, "rejected", req.user);
        return handleResponse(res, result, HTTP_STATUS.OK);
    } catch (error) {
        return handleError(res, new Error(error.message), HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

export const leaveCountHandler = async (req, res) => {
    try {
        const result = await leaveCountService();
        return handleResponse(res, result, HTTP_STATUS.OK);
    } catch (error) {
        return handleError(res, new Error(error.message), HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};