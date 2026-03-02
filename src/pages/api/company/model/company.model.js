import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    companyName: {
      type: String,
      required: true
    },
    industryName: {
      type: String,
      required: true
    },
    companySize: {
      type: Number,
      required: true
    },
    companyLogo: {
      type: String,
      default: "",
    },
    address: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    website: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);


let companyModel = mongoose.models.Company || mongoose.model("Company", companySchema);

export default companyModel;