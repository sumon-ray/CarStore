import  express  from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlwares/validateRequest";
import { UserValidation } from "./user.validation";
// import { updatePassword } from "./UpdatePassword/UpdatePassword";
// import { authenticate } from "../../middlwares/authenticate";

const router =express.Router();

router.post("/register", validateRequest(UserValidation.createUserSchema),UserControllers.createUser);
  router.post("/login", UserControllers.login);
  router.get("/users", UserControllers.getAllUsers)

  // router.patch('/update-password', authenticate, UserControllers.updatePassword);
export const UserRoute = router;
