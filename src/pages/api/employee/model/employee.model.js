import { ROLE } from "@/shared/constants";
import mongoose from "mongoose";

const incrementSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    amount: {
        type: Number
    },
},
    { _id: false }   // id not unique every increment
);

const employeeSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other",
    },
    startingSalary: {
        type: Number
    },
    currentSalary: {
        type: Number,
        default: 0,
    },
    offerDetails: {
        type: String,
        default: "",
    },
    increments: {
        type: [incrementSchema],
        default: [],
    },
    joiningDate: {
        type: Date,
        required: true
    },
    birthDate: {
        type: Date
    },
    address: {
        type: String,
        default: "",
    },
    guardianRelation: {
        type: String,
        default: "",
    },
    guardianNumber: {
        type: Number,
        default: null,
    },
    role: {
        type: String,
        default: ROLE.EMPLOYEE
    },
    biometricId: { // Temporary field for biomatric login
        type: String,
        unique: true,
        required: true
    }
},
    {
        timestamps: { createdAt: "created_at", updatedAt: false },
    }
);

let employeeModel = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default employeeModel;