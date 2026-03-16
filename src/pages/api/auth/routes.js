import { ROLE } from "@/shared/constants";
import { loginHandler, registerAdminHandler, signUpHandler } from "./controller/auth.controller";

const routes = {
  login: { handler: loginHandler, auth: false, roles: [] },
  register: { handler: signUpHandler, auth: false, roles: [] },
  registerAdmin: { handler: registerAdminHandler, auth: true, roles: [ROLE.ADMIN] }
};


export default routes;