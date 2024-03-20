import { transports, format } from "winston";
import expressWinston from "express-winston";

const expressWinstonLogger = expressWinston.logger({
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ level: "error", filename: "errorLogs.log" }),
    new transports.File({ level: "warn", filename: "warningLogs.log" }),
  ],
  format: format.combine(
    format.colorize(),
    format.json(),
    format.timestamp(),
    format.prettyPrint()
  ),
  statusLevels: true,
});

const expressWinstonErrorLogger = expressWinston.errorLogger({
  transports: [new transports.File({ filename: "internalErrorLogs.log" })],
  format: format.combine(
    format.colorize(),
    format.json(),
    format.timestamp(),
    format.prettyPrint()
  ),
});

export default {
  expressWinstonLogger,
  expressWinstonErrorLogger,
};
