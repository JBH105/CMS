import { ROLE } from "@/shared/constants";
import mongoose from "mongoose";

const companyOwnerSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    }
}, { timestamps: true });

const companyOwnerModel = mongoose.models.Company_Owner || mongoose.model("Company_Owner", companyOwnerSchema);

export default companyOwnerModel;