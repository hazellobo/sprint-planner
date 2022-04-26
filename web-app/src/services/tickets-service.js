const API_URL = "http://localhost:9000/tickets";

// fetch get all tickets
function getAllTickets() {
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// fetch update tickets
function updateTicket(id, updatedStatus) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedStatus),
  });
}

// fetch create tickets
function createTicket(task) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

const ticketApis = { updateTicket, getAllTickets, createTicket };

export default ticketApis;
