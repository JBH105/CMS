import { HTTP_STATUS } from "@/utils/httpStatus";
import companyModel from "../../company/model/company.model";
import employeeModel from "../model/employee.model";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import employeeLeave from "../model/employeeLeave.model";

export const createEmployee = async (employeeData) => {
  const { email, companyId, pin } = employeeData;
  const existingPin = await employeeModel.findOne({ pin });
  if (existingPin) throw new Error("Oops! That PIN already exists. Try a new one");
  await existsEmployee(email);
  await fetchCompany(companyId);
  await countEmployee(companyId);
  // const employees = await employeeModel.find({ pin: { $ne: null } }, { pin: 1 });

  // for (let emp of employees) {
  //   const isMatch = await bcrypt.compare(pin, emp.pin);
  //   if (isMatch) {
  //     throw new Error("PIN already exists");
  //   }
  // }
  // const hashPin = await bcrypt.hash(pin, 10);
  const newEmployee = await employeeModel.create({ ...employeeData });
  return newEmployee;
};

export const getEmployeeService = async (user) => {
  if (user.role === "company") {
    let employee = await employeeModel.find({ companyId: user.id, }).sort({ created_at: -1 }).populate("companyId");
    return employee;
  }
  throw new Error("Unauthorized user");
};

export const editEmployeeService = async (employeeData, id) => {
  const employeeId = await employeeModel.findById(id);
  if (!employeeId) throw new Error("Employee not found with this id")
  if (employeeData.pin) {
    const existingEmployee = await employeeModel.findOne({
      pin: employeeData.pin,
      _id: { $ne: id }
    });
    if (existingEmployee) throw new Error("PIN already exists");
  }
  else {
    delete employeeData.pin;
  }
  const updatedEmployee = await employeeModel.findByIdAndUpdate(id, employeeData, { new: true });
  return updatedEmployee;
};

export const deleteEmployeeService = async (employeeId, companyId) => {
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    throw new Error("Invalid employee Id");
  }

  const employee = await employeeModel.findById(employeeId);
  if (!employee) throw new Error("Employee not found");

  if (employee.companyId.toString() !== companyId.toString()) {
    throw new Error("Unauthorized: You can't delete this employee");
  }

  await employeeModel.findByIdAndDelete(employeeId);
  await employeeLeave.deleteMany({ employeeId: employeeId });
  return employee;
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
