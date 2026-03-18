import bcrypt from "bcrypt"
import User from '../model/auth';
import { generateToken } from "../../Middleware/middleware";
import companyModel from "../../company/model/company.model";
import { ROLE } from "@/shared/constants";
import companyOwnerModel from "../model/companyOwner.model";
import employeeModel from "../../employee/model/employee.model";

export const authenticateUser = async ({ email, password, pin }) => {
    const user = await findUserWithEmail(email);
    const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass) return { error: "Invalid email or password" };

        let tokenPayload;
        if (user.role === "company") {
            const company = await findCompanyByUserId(user._id);
            tokenPayload = {
                id: company.id,
                role: "company",
                userId: user.id
            };
            const token = generateToken(tokenPayload);
            const body = { token, user }
            return body;
        }
        tokenPayload = {
            id: user.id,
            role: user.role
        };

        const token = generateToken(tokenPayload);
        const body = { token, user }
        return body;
};

export const registerUser = async ({ username, email, password, role, profileAvatar }) => {
    const newUser = await User.create({ username, email, password, role, profileAvatar });
    return newUser;
};

export const userExists = async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");
}

export const findUserWithEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    return user;
}

export const findCompanyByUserId = async (userId) => {
    return await companyModel.findOne({ userId });
};

export const createCompanyAdminService = async ({ username, email, password, companyId }) => {
    let user = await User.findOne({ email })
    if (!user) {
        user = await User.create({ username, email, password, role: ROLE.COMPANY_ADMIN })
    }
    const exists = await companyOwnerModel.findOne({
        accountId: user._id,
        companyId
    })
    if (exists) throw new Error("Already added to this company")
    await companyOwnerModel.create({
        accountId: user._id,
        companyId
    })
    return user
}

const findEmployeeByEmail = async (email) => {
    return await employeeModel.findOne({ email });
};