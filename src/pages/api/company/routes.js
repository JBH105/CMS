import { ROLE } from "@/shared/constants";
import { createCompanyHandler, companyLoginHandler, AllCompaniesHandler } from "./controller/company.controller";

const routes = {
    createCompany: { handler: createCompanyHandler, auth: true, roles: [ROLE.ADMIN] },
    allCompanies: { handler: AllCompaniesHandler, auth: true, roles: [ROLE.ADMIN] },
    companyLogin: { handler: companyLoginHandler, auth: false, roles: [] }
};

export default routes;  