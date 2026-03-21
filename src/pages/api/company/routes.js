import { ROLE } from "@/shared/constants";
import { createCompanyHandler, AllCompaniesHandler } from "./controller/company.controller";

const routes = {
    createCompany: { handler: createCompanyHandler, auth: true, roles: [ROLE.ADMIN] },
    allCompanies: { handler: AllCompaniesHandler, auth: true, roles: [ROLE.ADMIN] },
};

export default routes;  