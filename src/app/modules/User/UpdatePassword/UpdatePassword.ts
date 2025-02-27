// import bcrypt from "bcrypt";
// import { Request, Response } from "express";
// import httpStatus from "http-status";
// import catchAsync from "../../../utils/catchAsync";
// import sendResponse from "../../../utils/sendResponses";
// import { UserModel } from "../user.model";

// // Update Password Controller
// const updatePassword = catchAsync(async (req: Request, res: Response) => {
//   const { currentPassword, newPassword } = req.body;
//   const userId = req.user.id; // Assuming user is authenticated and ID is in req.user

//   // Validate the new password is different from the current password
//   if (currentPassword === newPassword) {
//     throw new Error("New password cannot be the same as current password");
//   }

//   // Find the user by ID
//   const user = await UserModel.findById(userId);
//   if (!user) {
//     throw new Error("User not found");
//   }

//   // Compare the current password with the stored password
//   const isCurrentPasswordValid = await user.comparePassword(currentPassword);
//   if (!isCurrentPasswordValid) {
//     throw new Error("Current password is incorrect");
//   }

//   // Hash the new password before saving it
//   user.password = await bcrypt.hash(newPassword, 12);
//   await user.save();

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Password updated successfully",
//   });
// });

// export { updatePassword };
