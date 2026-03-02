import { handleError } from "./responseHandler";

export const tryCatchWrapper = (handler) => {
  return async (req, res, searchParams) => {
    try {
      return await handler(req, res, searchParams);
    } catch (error) {
      return handleError(res, error); 
    }
  };
};