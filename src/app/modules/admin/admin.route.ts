import  express  from "express";
import { AdminController } from "./admin.controller";
import { authenticate } from "../../middlwares/authenticate";
import { adminOnly } from "../../middlwares/adminOnly";
import catchAsync from "../../utils/catchAsync";

const router = express.Router()
router.patch('/users/:userId/block',authenticate, adminOnly, catchAsync(AdminController.blockUser))
router.delete('/blogs/:id', authenticate, adminOnly,  catchAsync(AdminController.deleteBlog))

export const AdminRoute = router


