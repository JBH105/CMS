import mongoose from "mongoose";

const employeeLeaveSchema = new mongoose.Schema(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        reason: {
            type: String,
            required: true
        },
        leaveType: {
            type: String,
            enum: ["one-hour", "two-hour", "half-day", "one-day", "more-than-oneday"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        }
    },
    { timestamps: true }
);

const employeeLeave = mongoose.models.employeeLeave || mongoose.model("employeeLeave", employeeLeaveSchema);

export default employeeLeave;