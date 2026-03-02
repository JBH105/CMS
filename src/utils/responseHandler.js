import { HTTP_STATUS } from "./httpStatus";

export const handleResponse = (res, data, status = HTTP_STATUS.OK) => {
    return res.status(status).json({ success: true, status, data, });
};

export const handleError = (res, error, status = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
    console.error("API Error:", error.message);

    return res.status(status).json({ success: false, status, error: error.message, });
};