import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import sendResponses from "../../utils/sendResponses";
import { BlogServices } from "./blog.service";

const createBlogIntoDB = catchAsync(async (req, res) => {
  const { title, content, isPublished } = req.body;
  const { id: userId } = req.user;

  const result = await BlogServices.createBlogIntoDB({
    title,
    content,
    isPublished,
    author: userId,
  });

  sendResponses(res, {
    statusCode: 201,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlogsFromDB = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  if (result.length === 0) {
    sendResponses(res, {
      statusCode: 200,
      success: true,
      message: "No blogs created yet",
      data: result,
    });
  } else {
    sendResponses(res, {
      statusCode: 200,
      success: true,
      message: "Blogs fetched successfully",
      data: result,
    });
  }
});

const updateBlogInDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const result = await BlogServices.updateBlogInDB(id, userId, req.body);

  sendResponse(res, {
    success: true,
    message: "Blog updated successfully",
    statusCode: 200,
    data: result,
  });
});
const deleteBlogFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  await BlogServices.deleteBlogFromDB(id, userId);

  sendResponses(res, {
    success: true,
    message: "blog deleted successfully",
    statusCode: 200,
  });
});

export const BlogController = {
  createBlogIntoDB,
  updateBlogInDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
