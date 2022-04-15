import Mongoose from "mongoose";

//Creation of a ticket Schema
const TicketSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: "Ticket Name is required",
    },
    description: {
      type: String,
      required: "Description is required",
    },
    createdBy: {
      type: String,
      required: "Created By is required",
    },
    assignedTo: {
      type: Array,
      required: "Assigned To is required",
    },
    status: {
      type: [
        {
          type: String,
          enum: ["Open", "In Progress", "Closed"],
        },
      ],
    },
    priority: {
      type: [
        {
          type: String,
          enum: ["High", "Low", "Medium"],
        },
      ],
    },
    TicketType: {
      type: [
        {
          type: String,
          enum: ["Bug", "Task", "Story"],
        },
      ],
    },
  },
  {
    versionKey: false,
  }
);

TicketSchema.virtual("id", () => {
  return this._id.toHexString();
});

TicketSchema.set("toJSON", { virtuals: true });

const Ticket = Mongoose.model("Ticket", TicketSchema);

export default Ticket;
