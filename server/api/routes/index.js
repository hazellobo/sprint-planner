import ticketRouters from "./ticket-router.js";
import sprintRouters from "./sprint-router.js";

export default (app) => {
  app.use("/", ticketRouters);
  app.use("/", sprintRouters);
};
