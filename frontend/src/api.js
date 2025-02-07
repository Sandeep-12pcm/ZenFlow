import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/tasks"; // Update with your backend URL
// const API_BASE_URL = "http://192.168.152.246:5000/api/tasks";

//Todo
export const getTasks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addTaskapi = async (task) => {
  const response = await axios.post(API_BASE_URL, task);
  return response.data;
};

export const deleteTaskapi = async (taskId) => {
  await axios.delete(`${API_BASE_URL}/${taskId}`);
};

export const toggleTaskComplete = async (taskId, completed) => {
  const response = await axios.patch(`${API_BASE_URL}/${taskId}`, {
    completed,
  });
  return response.data;
};

//gratitue API

const API_URL = "http://localhost:5000/api/gratitude";
// const API_URL = "http://192.168.152.246:5000/api/gratitude";


export const fetchGratitudeEntries = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching gratitude entries:", error);
    return [];
  }
};

export const addGratitudeEntry = async (text) => {
  try {
    const response = await axios.post(API_URL, { text });
    return response.data;
  } catch (error) {
    console.error("Error adding gratitude entry:", error);
    return null;
  }
};
