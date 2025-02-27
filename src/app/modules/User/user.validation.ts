import { z } from "zod";

// Define the schema using Zod
const createUserSchema = z.object({
body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters."),
    role: z.enum(["user", "admin"]).default("user"),
})
});

export const UserValidation = {
    createUserSchema
}