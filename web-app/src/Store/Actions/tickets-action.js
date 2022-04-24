export const TicketActionType = {
  GET_TICKET: "{Ticket} Add ticket action",
};

export const getTicket = () => {
  return {
    type: TicketActionType.GET_TICKET,
  };
};
