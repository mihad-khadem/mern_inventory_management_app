// send mail utility functions

import nodemailer from "nodemailer";
import config from "../config/index.js";
import ApiError from "../error/apiError.js";
import catchAsync from "./catchAsync.js";
import httpStatus from "http-status";

const sendMail = catchAsync(async (to, subject, body) => {
  // transporter configuration and mail sending logic goes here
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  const mailOptions = {
    from: `${config.appName} <${config.smtpUser}>`,
    to,
    subject,
    text: body,
  };
  const info = await transporter.sendMail(mailOptions);
  if (!info.accepted.length) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to send email to ${to}, Please try again !`
    );
  }
  if (!info) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Email sending failed to ${to}`
    );
  }
  return {
    messageId: info.messageId,
    message: `Email sent successfully to ${to}`,
    info,
  };
});

export default sendMail;
