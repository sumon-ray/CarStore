import AppError from "../../errors/AppError"
import BlogModel from "../Blog/blog.model";
import { UserModel } from "../User/user.model"
import httpStatus from "http-status";
const blockUser = async (userId: string) => {
    const user = await UserModel.findById(userId);
    
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
  
    // user.isBlocked = true; 
    // only block 
    user.isBlocked = !user.isBlocked;
    await user.save(); 
  
    return { message: "User blocked successfully" };
  };


const deleteBlog = async (id: string)=>{
    const result = await BlogModel.findByIdAndDelete(id)
    return result
}



export const AdminService = {
    blockUser,
    deleteBlog
}