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

const userApis = { loggedInUser, getAllUsers };

export default userApis;
