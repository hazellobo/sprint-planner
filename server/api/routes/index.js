import ticketRouters from "./ticket-router.js";
import sprintRouters from "./sprint-router.js";
import userRoute from "./userRoutes.js";

export default (app) => {
  app.use("/", ticketRouters);
  app.use("/", sprintRouters);
  app.use("/api/users", userRoute);
};
