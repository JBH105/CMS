import { ROLE } from "@/shared/constants";
import { bioMatricLogin, createEmployeeHandler, getAllEmployeeHandler, updateEmployeeHandler } from "./controller/employee.controller";
import { approveLeaveHandler, createLeaveHandler, getLeaveHandler, leaveCountHandler, rejectLeaveHandler } from "./controller/employeeLeave.controller";

const routes = {
    createEmployee: { handler: createEmployeeHandler, auth: true, roles: [ROLE.COMPANY] },
    getAllEmployee: { handler: getAllEmployeeHandler, auth: true, roles: [ROLE.COMPANY] },
    updateEmployee: { handler: updateEmployeeHandler, auth: true, roles: [ROLE.COMPANY] },
    bioMatricLogin: { handler: bioMatricLogin, auth: false, roles: [] },  // temporary


    // Employee Leave Routes
    createLeave: { handler: createLeaveHandler, auth: true, roles: [ROLE.EMPLOYEE] },
    getLeave: { handler: getLeaveHandler, auth: true, roles: [ROLE.ADMIN, ROLE.COMPANY, ROLE.EMPLOYEE] },
    approveLeave: { handler: approveLeaveHandler, auth: true, roles: [ROLE.COMPANY] },
    rejectLeave: { handler: rejectLeaveHandler, auth: true, roles: [ROLE.COMPANY] },
    countLeave: { handler: leaveCountHandler, auth: true, roles: [ROLE.ADMIN] },
};

export default routes;