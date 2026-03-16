import bcrypt from "bcrypt"
import User from '../model/auth';
import { generateToken } from "../../Middleware/middleware";
import companyModel from "../../company/model/company.model";

export const authenticateUser = async ({ email, password }) => {
    const user = await findUserWithEmail(email);
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) return { error: "Invalid email or password" };

    let tokenPayload;
    if (user.role === "company") {
        const company = await findCompanyByUserId(user.id);
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

export const registerUser = async (userData) => {
    const { username, email, password, role, profileAvatar } = userData
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

export const companyFindForCreateAdmin = async (userId) => {
    const company = await companyModel.findOne({ accountId: userId });
    if (!company) throw new Error("You don't belong to any company");
    return company;
}

export const findCompanyByUserId = async (accountId) => {
    return await companyModel.findOne({ accountId });
};