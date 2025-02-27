import { Router } from "express";
import { BlogController } from "./blog.controller";
import { authenticate } from "../../middlwares/authenticate";
import catchAsync from "../../utils/catchAsync";
import { authorize } from "../../middlwares/authorize";

const router = Router();

router.post(
  "/",
  authenticate, 
  authorize(["user"]), 
  catchAsync(BlogController.createBlogIntoDB) 
);

// public api
router.get(
  "/",
  catchAsync(BlogController.getAllBlogsFromDB) 
);

router.patch(
    "/:id",
    authenticate,
    authorize(["user"]),
    catchAsync(BlogController.updateBlogInDB)
  );
  
  router.delete(
    "/:id",
    authenticate,
    authorize(["user"]),
    catchAsync(BlogController.deleteBlogFromDB)
  );
router.get("/", catchAsync(BlogController.getAllBlogsFromDB));

export const BlogRouter = router;
