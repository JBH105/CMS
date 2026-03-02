import { ROLE } from "@/shared/constants";
import { bioMatricLogin, createEmployeeHandler } from "./controller/employee.controller";
import { approveLeaveHandler, createLeaveHandler, getLeaveHandler, leaveCountHandler, rejectLeaveHandler } from "./controller/employeeLeave.controller";

const routes = {
    createEmployee: { handler: createEmployeeHandler, auth: true, roles: [ROLE.COMPANY] },
    bioMatricLogin: { handler: bioMatricLogin, auth: false, roles: [] },  // temporary


    // Employee Leave Routes
    createLeave: { handler: createLeaveHandler, auth: true, roles: [ROLE.EMPLOYEE] },
    getLeave: { handler: getLeaveHandler, auth: true, roles: [ROLE.COMPANY, ROLE.EMPLOYEE] },
    approveLeave: { handler: approveLeaveHandler, auth: true, roles: [ROLE.ADMIN] },
    rejectLeave: { handler: rejectLeaveHandler, auth: true, roles: [ROLE.ADMIN] },
    countLeave: { handler: leaveCountHandler, auth: true, roles: [ROLE.ADMIN] },
};

export default routes;