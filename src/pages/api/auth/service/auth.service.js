import bcrypt from "bcrypt"
import User from '../model/auth';
import { generateToken } from "../../Middleware/middleware";
import companyModel from "../../company/model/company.model";
import { ROLE } from "@/shared/constants";
import companyOwnerModel from "../model/companyOwner.model";
import employeeModel from "../../employee/model/employee.model";

export const authenticateUser = async ({ email, password, pin }) => {
    const user = await findUserWithEmail(email);
    if (user) {
        const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass) return { error: "Invalid email or password" };

<<<<<<< Updated upstream
    let tokenPayload;
    if (user.role === "company") {
        const company = await findCompanyByUserId(user.id);
=======
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
>>>>>>> Stashed changes
        tokenPayload = {
            id: user.id,
            role: user.role
        };

        const token = generateToken(tokenPayload);
        const body = { token, user }
        return body;
    }
    const employee = await findEmployeeByEmail(email);

    if (employee) {
        const matchPin = await bcrypt.compare(pin, employee.pin);
        if (!matchPin) return { error: "Invalid email or pin" };
        const tokenPayload = {
            id: employee._id,
            role: "employee"
        };

        const token = generateToken(tokenPayload);
        const body = { token, user: employee };
        return body;
    }
    return { error: "User not found" };
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

<<<<<<< Updated upstream
export const companyFindForCreateAdmin = async (userId) => {
    const company = await companyModel.findOne({ accountId: userId });
    if (!company) throw new Error("You don't belong to any company");
    return company;
}

export const findCompanyByUserId = async (accountId) => {
    return await companyModel.findOne({ accountId });
=======
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
>>>>>>> Stashed changes
};