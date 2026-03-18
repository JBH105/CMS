import { ROLE } from "@/shared/constants";
import { loginHandler, addCompanyOwnerHandler, signUpHandler } from "./controller/auth.controller";

const routes = {
  login: { handler: loginHandler, auth: false, roles: [] },
  register: { handler: signUpHandler, auth: false, roles: [] },
  addCompanyOwner: { handler: addCompanyOwnerHandler, auth: true, roles: [ROLE.ADMIN] }
};


export default routes;