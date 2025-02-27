import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { TRole, TUser } from "./user.interface";

const Role: TRole[] = ["user", "admin"];

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: Role,
        message: "{VALUE} is not a valid role",
      },
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const saltRounds = 10;

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(saltRounds));
  next();
});

export const UserModel = model<TUser>("User", UserSchema);
