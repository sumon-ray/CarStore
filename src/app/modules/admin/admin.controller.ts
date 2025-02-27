import catchAsync from "../../utils/catchAsync";
import sendResponses from "../../utils/sendResponses";
import { AdminService } from "./admin.service";
import httpStatus from "http-status";

const blockUser = catchAsync(async (req, res) => {
    const {userId} = req.params
 await AdminService.blockUser(userId);

  sendResponses(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User blocked successfully"
  });
});

const deleteBlog = catchAsync(async (req, res) => {
 await AdminService.deleteBlog(req.params.id);

  sendResponses(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete blog successfully",
    // data: result,
  });
});

export const AdminController = {
  blockUser,
  deleteBlog,
};
