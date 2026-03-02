import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ROLE } from "@/shared/constants";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ROLE.ADMIN, ROLE.COMPANY, ROLE.EMPLOYEE],
        default: ROLE.COMPANY,
        required: true
    },
    profileAvatar: {
        type: String,
        default: "",
    }
},
    {
        timestamps: { createdAt: "created_at", updatedAt: false },
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});

let userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;

