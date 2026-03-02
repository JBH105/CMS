import { loginHandler, signUpHandler } from "./controller/auth.controller";

const routes = {
  login: { handler: loginHandler, auth: false, roles: [] },
  register: { handler: signUpHandler, auth: false, roles: [] }
};


export default routes;