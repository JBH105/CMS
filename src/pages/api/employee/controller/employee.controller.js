import { HTTP_STATUS } from "@/utils/httpStatus";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { createEmployee, editEmployeeService, getEmployeeService } from "../service/employee.service";
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

export const getAllEmployeeHandler = async (req, res) => {
  try {
    const result = await getEmployeeService(req.user);
    return handleResponse(res, result, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(res, new Error(error.message), HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

export const updateEmployeeHandler = async (req, res) => {
  try {
    const employeeId = req.query.id;
    const result = await editEmployeeService(req.body, employeeId);
    return handleResponse(res, result, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(res, new Error(error.message), HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};