import Mongoose from "mongoose";

//Creation of a user Schema
const UserSchema = new Mongoose.Schema(
  {
    emailId: {
      type: String,
      required: "Email Id is required",
    },
    password: {
      type: String,
      required: "Password is a required",
    },
    projectId: {
      type: Array,
    },
    role: {
      type: [
        {
          type: String,
          enum: ["Developer", "Scrum Master", "Product Owner"],
        },
      ],
    },
  },
  {
    versionKey: false,
  }
);

UserSchema.set("toJSON", { virtuals: true });

const User = Mongoose.model("User", UserSchema);

export default User;
