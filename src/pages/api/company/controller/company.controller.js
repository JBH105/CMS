import { HTTP_STATUS } from "@/utils/httpStatus";
import uploadImage from "../../Middleware/uploadImage";
import { authenticateCompany, createCompany, existsCompany, getAllCompanies } from "../service/company.service";
import { companyLoginValidationSchema, companyValidationSchema } from "../validation/company.validation";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";
import { companyLoginService } from "../service/company.service";
import { authenticateUser, userExists } from "../../auth/service/auth.service";

export const createCompanyHandler = async (req, res) => {
    uploadImage.single("companyLogo")(req, res, async (err) => {
        if (err) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });

        try {
            // const logoPath = req.file ? `/uploads/${req.file.filename}` : "";
            const { error, value } = companyValidationSchema.validate(req.body);
            if (error) return handleError(res, new Error(error.message), HTTP_STATUS.BAD_REQUEST);

            await existsCompany(value.email);
            await userExists(value.email);
            const newCompany = await createCompany(value);
            return handleResponse(res, newCompany, HTTP_STATUS.CREATED);
        } catch (error) {
            return handleError(res, new Error(error.message), HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    });
};

export const AllCompaniesHandler = tryCatchWrapper(async (req, res) => {
    const companies = await getAllCompanies();
    return handleResponse(res, companies, HTTP_STATUS.OK);
});

export const companyLoginHandler = tryCatchWrapper(async (req, res) => {
    const body = req.body;
    const { error } = companyLoginValidationSchema.validate(body);
    if (error)
        return handleError(res, new Error(error.details[0].message), HTTP_STATUS.BAD_REQUEST);

    const authResponse = await authenticateCompany(body);
    return authResponse.error
        ? handleError(res, new Error(authResponse.error), HTTP_STATUS.UNAUTHORIZED)
        : handleResponse(res, authResponse, HTTP_STATUS.OK);
});