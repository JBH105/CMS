import { ROLE } from "@/shared/constants";
import { createEmployeeHandler, getAllEmployeeHandler, updateEmployeeHandler, deleteEmployeeHandler } from "./controller/employee.controller";
import { approveLeaveHandler, createLeaveHandler, getLeaveHandler, leaveCountHandler, rejectLeaveHandler } from "./controller/employeeLeave.controller";

const routes = {
    createEmployee: { handler: createEmployeeHandler, auth: true, roles: [ROLE.COMPANY] },
    getAllEmployee: { handler: getAllEmployeeHandler, auth: true, roles: [ROLE.COMPANY] },
    updateEmployee: { handler: updateEmployeeHandler, auth: true, roles: [ROLE.COMPANY] },
    deleteEmployee: { handler: deleteEmployeeHandler, auth: true, roles: [ROLE.COMPANY] },


    // Employee Leave Routes
    createLeave: { handler: createLeaveHandler, auth: true, roles: [ROLE.EMPLOYEE] },
    getLeave: { handler: getLeaveHandler, auth: true, roles: [ROLE.ADMIN, ROLE.COMPANY, ROLE.EMPLOYEE] },
    approveLeave: { handler: approveLeaveHandler, auth: true, roles: [ROLE.COMPANY] },
    rejectLeave: { handler: rejectLeaveHandler, auth: true, roles: [ROLE.COMPANY] },
    countLeave: { handler: leaveCountHandler, auth: true, roles: [ROLE.COMPANY] },
};

export default routes;