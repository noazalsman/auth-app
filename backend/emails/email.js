import { client, sender } from "./mailtrap-config.js";
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [{ email }];

  try {
    const response = await client.send({
        from: sender,
        to: recipients,
        subject: "Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        category: "Verification",
    });

    console.log("Verification email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw error;
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipients = [{ email }];

  try {
    const response = await client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "875598e6-e042-4794-84fb-131d5efb3c85",
      template_variables: {
        "company_info_name": "Auth App",
        "name": name
      }
    })

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw error;
  }
};

export const sendResetPasswordEmail = async (email, resetPasswordURL) => {
  const recipients = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetPasswordURL),
      category: "Password Reset",
    });

    console.log("Reset password email sent successfully", response);
  } catch (error) {
    console.error("Error sending reset password email", error);
    throw error;
  }
};

export const sendResetPasswordSuccessEmail = async (email) => {
  const recipients = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Success",
    });

    console.log("Reset password success email sent successfully", response);
  } catch (error) {
    console.error("Error sending reset password success email", error);
    throw error;
  }
};