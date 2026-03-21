import { HTTP_STATUS } from "@/utils/httpStatus";
import uploadImage from "../../Middleware/uploadImage";
import { createCompany, existsCompany, getAllCompanies } from "../service/company.service";
import { companyValidationSchema } from "../validation/company.validation";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";
import { userExists } from "../../auth/service/auth.service";

export const createCompanyHandler = async (req, res) => {
    uploadImage.single("companyLogo")(req, res, async (err) => {
        if (err) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });

        try {
            // const logoPath = req.file ? `/uploads/${req.file.filename}` : "";
            const { error, value } = companyValidationSchema.validate(req.body);
            if (error) return handleError(res, new Error(error.message), HTTP_STATUS.BAD_REQUEST);
            const loginAdminId = req.user.id;

            await existsCompany(value.email, value.companyName);
            await userExists(value.email);
            const newCompany = await createCompany(value, loginAdminId);
            return handleResponse(res, newCompany, HTTP_STATUS.CREATED);
        } catch (error) {
            return handleError(res, new Error(error.message), HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    });
};

export const AllCompaniesHandler = tryCatchWrapper(async (req, res) => {
    const adminId = req.user.id;
    const companies = await getAllCompanies(adminId);
    return handleResponse(res, companies, HTTP_STATUS.OK);
});