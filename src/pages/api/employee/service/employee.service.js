import { HTTP_STATUS } from "@/utils/httpStatus";
import companyModel from "../../company/model/company.model";
import employeeModel from "../model/employee.model";

export const createEmployee = async (employeeData) => {
  const { email, companyId } = employeeData;
  await existsEmployee(email);
  await fetchCompany(companyId);
  await countEmployee(companyId);
  const newEmployee = await employeeModel.create(employeeData);
  return newEmployee;
};

export const existsEmployee = async (email) => {
  const existingEmployee = await employeeModel.findOne({ email });
  if (existingEmployee) throw new Error("Employee with this email already exists");
};

export const fetchCompany = async (companyId) => {
  const company = await companyModel.findById(companyId);
  if (!company) throw new Error("Company not found");
  return company;
};

export const countEmployee = async (companyId) => {
  const employeeCount = await employeeModel.countDocuments({ companyId });
  const company = await fetchCompany(companyId);
  if (employeeCount >= company.companySize) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Company has reached its maximum employee limit" });
  }
};

export const fingerNotFound = async (biometricId) => {
  const employee = await employeeModel.findOne({ biometricId });
  if (!employee) throw new Error("Invalid Fingerprint");
  return employee;
};

