import { HTTP_STATUS } from "@/utils/httpStatus";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { createEmployee, fingerNotFound } from "../service/employee.service";
import { employeeValidationSchema } from "../validation/employee.validation";
import { generateToken } from "../../Middleware/middleware";

export const createEmployeeHandler = async (req, res) => {
  try {
    const companyId = req.user.id;
    const { error, value } = employeeValidationSchema.validate({ ...req.body, companyId, });

    if (error) return handleError(res, new Error(error.message), HTTP_STATUS.BAD_REQUEST);

    const newEmployee = await createEmployee(value);
    return handleResponse(res, newEmployee, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleError(res, new Error(error.message), HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

export const bioMatricLogin = async (req, res) => {
  try {
    const { biometricId } = req.body;
    if (!biometricId) {
      return res.status(400).json({ message: "Biometric ID required" });
    }

    const employee = await fingerNotFound(biometricId);
    if (employee.error) {
      return handleError(res, new Error(employee.error), HTTP_STATUS.NOT_FOUND);
    }
    
    const token = generateToken({ id: employee._id, email: employee.email, role: employee.role, companyId: employee.companyId })
    return res.status(200).json({ message: "Biometric Login Successful", token });
  } catch (error) {
    return handleError(res, new Error(error.message), HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}