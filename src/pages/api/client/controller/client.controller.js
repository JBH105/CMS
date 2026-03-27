import { handleError, handleResponse } from "@/utils/responseHandler";
import { createClient, deleteClient, getAllClient, singleClientInfo, updateClientInfo } from "../service/client.service";
import { clientValidationSchema } from "../validation/client.validation";
import { HTTP_STATUS } from "@/utils/httpStatus";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";

export const createClientHandler = tryCatchWrapper(async (req, res) => {
    const { error, value } = clientValidationSchema.validate(req.body);
    if (error) return handleError(res, new Error(error.message), HTTP_STATUS.BAD_REQUEST);
    const companyId = req.user.id;
    const newClient = await createClient(value, companyId);
    return handleResponse(res, newClient, HTTP_STATUS.CREATED);
});

export const getAllClientHandler = tryCatchWrapper(async (req, res) => {
    const clients = await getAllClient(req.user);
    return handleResponse(res, clients, HTTP_STATUS.OK);
});

export const singleClientInfoHandler = tryCatchWrapper(async (req, res) => {
    const clientId = req.query.id;
    if (!clientId) throw new Error("Client id not found");
    const singleClient = await singleClientInfo(clientId, req.user);
    return handleResponse(res, singleClient, HTTP_STATUS.OK);
});

export const deleteClientHandler = tryCatchWrapper(async (req, res) => {
    const companyId = req.user.id;
    const clientId = req.query.id;
    if (!clientId) {
        return handleError(res, new Error("Client ID is required"), HTTP_STATUS.BAD_REQUEST);
    }
    await deleteClient(clientId, companyId);
    return handleResponse(res, "Client deleted successfully", HTTP_STATUS.OK);
});

export const updateClientInfoHandler = tryCatchWrapper(async (req, res) => {
    const clientId = req.query.id;
    if (!clientId) {
        return handleError(res, new Error("Client ID is required"), HTTP_STATUS.BAD_REQUEST);
    }
    const updateClient = await updateClientInfo(req.body, clientId);
    return handleResponse(res, updateClient, HTTP_STATUS.OK);
});