import mongoose from "mongoose";
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

export const getAllClient = async (company) => {
    if (company.role === "company") {
        const allClients = await clientModel.find({ companyId: company.id }).sort({ createdAt: -1 });
        if (allClients.length === 0) throw new Error("Clients not found in this company");
        return allClients;
    }
};

export const singleClientInfo = async (clientId, company) => {
    const client = await clientModel.findById(clientId);
    if (!client) throw new Error("Client not found");
    if (client.companyId.toString() !== company.id.toString()) {
        throw new Error("Unauthorized access");
    }
    return client;
};

export const deleteClient = async (clientId, companyId) => {
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        throw new Error("Invalid client Id");
    }

    const client = await clientModel.findById(clientId);
    if (!client) throw new Error("Client not found");
    if (client.companyId.toString() !== companyId.toString()) {
        throw new Error("Unauthorized: You can't delete this client");
    }
    await clientModel.findByIdAndDelete(clientId);
    return client;
};

export const updateClientInfo = async (data, clientId) => {
    const updated = await clientModel.findByIdAndUpdate(clientId, data, { new: true });
    return updated;
};