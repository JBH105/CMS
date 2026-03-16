import companyModel from "../../company/model/company.model";
import clientModel from "../model/client.model";

export const createClient = async (clientData, companyId) => {
    const company = await findUserId(companyId);
    const newClient = await clientModel.create({
        ...clientData,
        companyId: companyId,
        userId: company.accountId
    });
    return newClient;
};

export const findUserId = async (companyId) => {
    const company = await companyModel.findById(companyId);
    if (!company) throw new Error("Company not found");
    return company;
}

export const getAllClient = async () => {
    const allClients = await clientModel.find();
    return allClients;
};

export const singleClientInfo = async (clientId) => {
    const client = await clientModel.findById(clientId);
    return client;
};

export const deleteClient = async (clientId) => {
    return await clientModel.findByIdAndDelete(clientId);
};

export const updateClientInfo = async (data, clientId) => {
    const updated = await clientModel.findByIdAndUpdate(clientId, data, { new: true });
    return updated;
};