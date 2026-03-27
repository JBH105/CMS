import companyModel from "../model/company.model";
import userModel from "../../auth/model/auth";
import { ROLE } from "@/shared/constants";
import companyOwnerModel from "../../auth/model/companyOwner.model";
import mongoose from "mongoose";
import employeeModel from "../../employee/model/employee.model";
import employeeLeave from "../../employee/model/employeeLeave.model";

export const createCompany = async (companyData, loginAdminId) => {
    const { email, password } = companyData;
    if (!password) {
        throw new Error("Password is required");
    }

    const newUser = await userModel.create({
        username: companyData.companyName,
        email,
        password,
        role: ROLE.COMPANY,
        profileAvatar: companyData.companyLogo
    });

    const newCompany = await companyModel.create({
        ...companyData,
        accountId: loginAdminId,
        userId: newUser._id
    });
    await companyOwnerModel.create({
        accountId: loginAdminId,
        companyId: newCompany._id
    })
    return newCompany;
};

export const existsCompany = async (email, companyName, companyId = null) => {
    const query = {
        $or: [
            { email: email },
            { companyName: companyName }
        ]
    };
    if (companyId) {
        query._id = { $ne: companyId };
    }
    const existingCompany = await companyModel.findOne(query);
    if (existingCompany) {
        if (existingCompany.email === email) {
            throw new Error("Company with this email already exists");
        }
        if (existingCompany.companyName === companyName) {
            throw new Error("Company with this name already exists");
        }
    }
};

export const getAllCompanies = async (adminId) => {
    const allCompanies = await companyModel.find({ accountId: adminId }).sort({ created_at: -1 });
    if (allCompanies.length === 0) throw new Error("No anyone company found of this admin");
    return allCompanies;
};

export const getSingleCompany = async (adminId, companyId) => {
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        throw new Error("Invalid company Id");
    }
    const company = await companyModel.findById(companyId);
    if (!company) throw new Error("Company not found");
    if (company.accountId.toString() !== adminId) {
        throw new Error("Unauthorized: You can't see this company");
    }
    return company
};

export const updateCompany = async (adminId, companyId, value) => {
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        throw new Error("Invalid company Id");
    }
    const company = await companyModel.findById(companyId);
    if (!company) throw new Error("Company not found");
    if (company.accountId.toString() !== adminId) {
        throw new Error("Unauthorized: You can't edit this company");
    }
    await existsCompany(value.email, value.companyName, companyId);
    const editCompany = await companyModel.findByIdAndUpdate(companyId, value, { new: true })
    return editCompany
};

export const deleteCompany = async (adminId, companyId) => {
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        throw new Error("Invalid company Id");
    }
    const company = await companyModel.findById(companyId);
    if (!company) throw new Error("Company not found");
    if (company.accountId.toString() !== adminId) {
        throw new Error("Unauthorized: You can't delete this company");
    }
    if (company.userId) {
        await userModel.findByIdAndDelete(company.userId);
    }
    await companyModel.findByIdAndDelete(companyId);
    await employeeModel.deleteMany({ companyId: companyId });
    await employeeLeave.deleteMany({ companyId: companyId });
    await companyOwnerModel.deleteMany({ companyId: companyId });
    return company
};

export const findCompanyWithEmail = async (email) => {
    const company = await companyModel.findOne({ email });
    if (!company) throw new Error("Company not found with this email");
    return company;
}