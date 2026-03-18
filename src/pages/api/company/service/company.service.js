import companyModel from "../model/company.model";
import userModel from "../../auth/model/auth";
import { ROLE } from "@/shared/constants";
import companyOwnerModel from "../../auth/model/companyOwner.model";

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

export const existsCompany = async (email, companyName) => {
    const existingCompany = await companyModel.findOne({
        $or: [
            { email: email },
            { companyName: companyName }
        ]
    });
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
    return allCompanies;
};

export const findCompanyWithEmail = async (email) => {
    const company = await companyModel.findOne({ email });
    if (!company) throw new Error("Company not found with this email");
    return company;
}

// export const authenticateCompany = async ({ email, password }) => {
//     const company = await findCompanyWithEmail(email);
//     const user = await findUserWithEmail(email)

//     if (!company) throw new Error("Company not found");

//     let matchPass = await bcrypt.compare(password, user.password);
//     if (matchPass) {
//         let token = generateToken({ id: company._id, role: user.role });
//         const body = { token, company };
//         return body;
//     } else {
//         return { error: "Invalid email or password" };
//     }

// };
