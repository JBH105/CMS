import { ROLE } from "@/shared/constants";
import { createClientHandler, getAllClientHandler, singleClientInfoHandler, deleteClientHandler, updateClientInfoHandler } from "./controller/client.controller";

const routes = {
    createClient: { handler: createClientHandler, auth: true, roles: [ROLE.COMPANY] },
    getAllClient: { handler: getAllClientHandler, auth: true, roles: [ROLE.COMPANY] },
    singleClientInfo: { handler: singleClientInfoHandler, auth: true, roles: [ROLE.COMPANY] },
    deleteClient: { handler: deleteClientHandler, auth: true, roles: [ROLE.COMPANY] },
    updateClientInfo: { handler: updateClientInfoHandler, auth: true, roles: [ROLE.COMPANY] },
};


export default routes;