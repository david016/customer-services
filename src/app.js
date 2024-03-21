import express from "express";
import cookieParser from "cookie-parser";

import customerRouter from "./routes/customers.js";
import userRouter from "./routes/users.js";
import serviceRouter from "./routes/services.js";
import authRouter from "./routes/auth.js";
import refreshTokenRouter from "./routes/refreshToken.js";

import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/loggers.js";
import verifyJwt from "./middlewares/verifyJwt.js";

const app = express();

app.use(express.json());
// middleware for parsing cookies
app.use(cookieParser());
// middleware for logging
app.use(logger.expressWinstonLogger);

app.use("/auth", authRouter);
app.use("/refreshToken", refreshTokenRouter);
app.use(verifyJwt);
app.use("/customers", customerRouter);
app.use("/users", userRouter);
app.use("/services", serviceRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

// Error handling middleware
app.use(errorHandler);
app.use(logger.expressWinstonErrorLogger);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
