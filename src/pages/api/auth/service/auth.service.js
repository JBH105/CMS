import bcrypt from "bcrypt"
import User from '../model/auth';
import { generateToken } from "../../Middleware/middleware";

export const authenticateUser = async ({ email, password }) => {
    const user = await findUserWithEmail(email);
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) return { error: "Invalid email or password" };

    const token = generateToken({ id: user.id, role: user.role })
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
    if (!user) return { error: "User not found with this email" };
    return user;
}