import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  databaseURL: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtAccessExpiration: process.env.JWT_ACCESS_EXPIRATION,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: parseInt(process.env.SMTP_PORT, 10),
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  clientURL: process.env.CLIENT_URL,
  appName: process.env.APP_NAME,
  maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS, 10) || 5,
  lockTime: parseInt(process.env.LOCK_TIME, 10) || 15 * 60 * 1000, // 15 minutes
  //   defaultPassword: process.env.DEFAULT_PASSWORD,
  //   bcryptSaltRounds: Number(process.env.SALT) || 10,
  //   node_env: process.env.NODE_ENV,
  //   jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  //   jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  //   jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
  //   jwtAccessExpiration: process.env.JWT_ACCESS_EXPIRATION,
};
