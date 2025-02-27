import { Router } from "express";
import { BlogRouter } from "../modules/Blog/blog.route";
import { UserRoute } from "../modules/User/user.route";
import { AdminRoute } from "../modules/admin/admin.route";
import { CarRouter } from "../Car/car.route";
// import { OrderCar } from "../Order/order.route";
import { paymentRoutes } from "../payment/payment.route";
import { orderCar } from "../Order/order.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoute,
  },

  {
    path: "/admin",
    route: AdminRoute,
  },

  {
    path: "/blogs",
    route: BlogRouter,
  },
  {
    path: "/cars",
    route: CarRouter,
  },
  {
    path: "/order",
    route: orderCar,
  },

  {
    path: "/payment",
    route: paymentRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

