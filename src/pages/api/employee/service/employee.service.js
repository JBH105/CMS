import { HTTP_STATUS } from "@/utils/httpStatus";
import companyModel from "../../company/model/company.model";
import employeeModel from "../model/employee.model";
import bcrypt from "bcrypt";

export const createEmployee = async (employeeData) => {
  const { email, companyId, pin } = employeeData;
  await existsEmployee(email);
  await fetchCompany(companyId);
  await countEmployee(companyId);
  const hashPin = await bcrypt.hash(pin, 10);
  const newEmployee = await employeeModel.create({ ...employeeData, pin: hashPin });
  return newEmployee;
};

export const getEmployeeService = async (user) => {
  if (user.role === "company") {
<<<<<<< Updated upstream
    return await employeeModel.find({ companyId: user.id, }).populate("companyId");
=======
    let employee = await employeeModel.find({ companyId: user.id, }).sort({ created_at: -1 }).populate("companyId");
    if (employee.length === 0) throw new Error("No employee found in this company");
    return employee;
>>>>>>> Stashed changes
  }
  throw new Error("Unauthorized user");
};

export const editEmployeeService = async (employeeData, id) => {
  const employeeId = await employeeModel.findById(id);
  if (!employeeId) throw new Error("Employee not found with this id")
  const updatedEmployee = await employeeModel.findByIdAndUpdate(id, employeeData, { new: true });
  return updatedEmployee;
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