import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlwares/globalErrorhandler";
import notFoundError from "./app/middlwares/notFound";
import router from "./app/routes";
// import router from "./app/routes";
// import userRouter from "./app/modules/user-demo/user.router";
// import { studentRoute } from "./app/modules/student/student.route";
// import { orderRoutes } from "./app/Order/order.route";
// import paymentRoutes from "./app/payment/payment.route";
const app: Application = express();
// import paymentRoutes from './app/payment/payment.route';
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173","https://blog-backend-kappa-steel.vercel.app","https://car-store-frontend-rose.vercel.app"], credentials: true }));

// student
// app.use('/api/student', studentRoute)
app.use("/api", router);

const getAController = (req: Request, res: Response) => {
  res.send("hello world");
};
app.get("/", getAController);
// app.use('/api/payment', );
// app.use("/api/orders", orderRoutes);
// app.use("/api/payment", paymentRoutes);
app.use(notFoundError);
app.use(globalErrorHandler);

// app.use(globalErrorHandler)
export default app;
