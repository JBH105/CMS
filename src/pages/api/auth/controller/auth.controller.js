import { authenticateUser, findUserWithEmail, registerUser, userExists } from "../service/auth.service";
import { loginValidation, } from "../validation/auth.validation";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { HTTP_STATUS } from "@/utils/httpStatus";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";
import uploadImage from "../../Middleware/uploadImage";

export const loginHandler = tryCatchWrapper(async (req, res) => {
  const body = req.body;
  const { error } = loginValidation.validate(body);
  if (error)
    return handleError(res, new Error(error.details[0].message), HTTP_STATUS.BAD_REQUEST);

  const authResponse = await authenticateUser(body);
  return authResponse.error
    ? handleError(res, new Error(authResponse.error), HTTP_STATUS.UNAUTHORIZED)
    : handleResponse(res, authResponse, HTTP_STATUS.OK);
});

export const signUpHandler = async (req, res) => {
  uploadImage.single("profileAvatar")(req, res, async (err) => {
    if (err) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    }

    try {
      const { username, email, password, role } = req.body;
      // const imageName = req.file ? `/uploads/${req.file.filename}` : "";
      await userExists(email);
      const newUser = await registerUser({ username, email, password, role });

      return handleResponse(res, newUser, HTTP_STATUS.CREATED);
    } catch (error) {
      return handleError(res, new Error(error.message), HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  });
};