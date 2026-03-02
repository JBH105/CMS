import companyModel from "../model/company.model";
import userModel from "../../auth/model/auth";
import bcrypt from "bcrypt";
import { ROLE } from "@/shared/constants";
import { generateToken } from "../../Middleware/middleware";
import { findUserWithEmail } from "../../auth/service/auth.service";

export const createCompany = async (companyData) => {
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
        accountId: newUser._id
    });
    return newCompany;
};

export const existsCompany = async (email) => {
    const existingCompany = await companyModel.findOne({ email });
    if (existingCompany) throw new Error("Company with this email already exists");
}

export const getAllCompanies = async () => {
    const allCompanies = await companyModel.find();
    return allCompanies;
};

export const findCompanyWithEmail = async (email) => {
    const company = await companyModel.findOne({ email });
    if (!company) throw new Error("Company not found with this email");
    return company;
}

export const authenticateCompany = async ({ email, password }) => {
    const company = await findCompanyWithEmail(email);
    const user = await findUserWithEmail(email)

    if (!company) throw new Error("Company not found");

    let matchPass = await bcrypt.compare(password, user.password);
    if (matchPass) {
        let token = generateToken({ id: company._id, role: user.role });
        const body = { token, company };
        return body;
    } else {
        return { error: "Invalid email or password" };
    }

};
