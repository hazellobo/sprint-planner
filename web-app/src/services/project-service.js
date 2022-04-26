const API_URL = "http://localhost:9001/projects";

function getAllProjects() {
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function updateProjects(id, updatedStatus) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedStatus),
  });
}

function createProject(proj) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proj),
  });
}

const projectApis = { getAllProjects, updateProjects, createProject };

export default projectApis;
