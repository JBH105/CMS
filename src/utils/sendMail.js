import nodemailer from "nodemailer";

export const sendLeaveStatusMail = async ({ fromEmail, toEmail, employeeName, status, adminName }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: fromEmail,
            pass: process.env.NODEMAILER_EMAIL_PASS
        }
    });

    const subject = status === "approved" ? "Leave Approved" : "Leave Rejected";

    const message = status === "approved"
        ? `Your leave request has been approved by ${adminName}.`
        : `Your leave request has been rejected by ${adminName}.`;

    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject,
        html: `
      <h2>Hello ${employeeName},</h2>
      <p>${message}</p>
      <p>Regards,<br/>${adminName}</p>
    `
    };

    await transporter.sendMail(mailOptions);
}; 