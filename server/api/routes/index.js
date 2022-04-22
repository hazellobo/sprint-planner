import userRoute from "./userRoutes.js";

export default (app) => {
  app.use("/api/users", userRoute);
};
