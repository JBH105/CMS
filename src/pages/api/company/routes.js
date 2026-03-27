import { ROLE } from "@/shared/constants";
import { createCompanyHandler, AllCompaniesHandler, singleCompanyHandler, editCompanyHandler, deleteCompanyHandler } from "./controller/company.controller";

const routes = {
    createCompany: { handler: createCompanyHandler, auth: true, roles: [ROLE.ADMIN] },
    allCompanies: { handler: AllCompaniesHandler, auth: true, roles: [ROLE.ADMIN] },
    singleCompany: { handler: singleCompanyHandler, auth: true, roles: [ROLE.ADMIN] },
    updateCompany: { handler: editCompanyHandler, auth: true, roles: [ROLE.ADMIN] },
    deleteCompany: { handler: deleteCompanyHandler, auth: true, roles: [ROLE.ADMIN] }
};

export default routes;  