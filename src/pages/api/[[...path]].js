// Dynamic API router
import { handleError } from "@/utils/responseHandler";
import { verifyAuth, verifyRole } from "./Middleware/middleware";
import connectDB from "@/config/db";
import userActions from "./auth/routes";
import companyActions from "./company/routes"
import employeeActions from "./employee/route"

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }

const routeMap = {
  // Route action
  auth: userActions,
  company: companyActions,
  employee: employeeActions
};

// endpoint example
// http://localhost:3000/api/auth?action=getAdminUser

export default async function handler(req, res) {
  try {
    await connectDB();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);   // pathname = /api/auth   searchParams = ?action=Login
    const [, api, module] = pathname.split("/");  // "", "api", "module=auth"   purpose = find value of module
    const action = searchParams.get("action");  // find value of action = Login

    if (!module || !action) {
      return res.status(400).json({ success: false, error: "Module or action missing" });
    }

    // Module existence check
    const actionsMap = routeMap[module];   //  module=auth
    if (!actionsMap) {
      return res.status(404).json({ success: false, error: "Invalid module" });
    }

    // Action existence check
    const actionConfig = actionsMap[action];  // action = Login 
    if (!actionConfig) {
      return res.status(404).json({ success: false, error: "Invalid action" });
    }

    // Auth check   
    if (actionConfig.auth) {
      const authResult = await verifyAuth(req);  // auth = true in this file ./auth/index then verifyAuth call
      if (authResult) return res.status(authResult.status).json(authResult);;
    }

    // Role check
    if (actionConfig.roles?.length > 0) {
      const roleResult = await verifyRole(req, actionConfig.roles); // if role exists in this file ./auth/index then verifyRole call
      if (roleResult) return res.status(roleResult.status).json(roleResult);;
    }

    return await actionConfig.handler(req, res, searchParams);
  } catch (error) {
    return handleError(res, error);
  }
}