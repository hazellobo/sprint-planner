const API_URL = "http://localhost:9000/users/";

function getAllUsers() {
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function loggedInUser(user) {
  return fetch(`${API_URL}login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

function getLoggedInUser(token) {
  return fetch(`${API_URL}getMe`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getUserByEmailId(emailId) {
  return fetch(`${API_URL}/${emailId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const userApis = {
  loggedInUser,
  getAllUsers,
  getLoggedInUser,
  getUserByEmailId,
};

export default userApis;
