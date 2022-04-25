import ticketRouters from "./ticket-router.js";
import sprintRouters from "./sprint-router.js";
import userRoute from "./userRoutes.js";
import projectRouters from "./project-router.js";

export default (app) => {
  app.use("/", ticketRouters);
  app.use("/", sprintRouters);
  app.use("/api/users", userRoute);
  app.use("/", projectRouters);
};
