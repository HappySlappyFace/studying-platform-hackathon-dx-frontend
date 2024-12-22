import axios from "axios";

const BASE_URL = "http://localhost:8081";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept every request to include JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const login = (data) => api.post("/api/v1/auth/authenticate", data);
export const registerUser = (data) => api.post("/api/v1/auth/register", data);

// Courses
export const getCourses = () => api.get("/api/student/courses");
export const getCourseDetails = (courseId) =>
  api.get(`/api/student/courses/${courseId}`);
export const createCourse = (data) => api.post("/api/courses/create", data);

// Resources
export const getResources = (courseId) =>
  api.get(`/api/resources/course/${courseId}`);
export const uploadResource = (data) => api.post("/api/resources/upload", data);

// Progress
export const markResourceCompleted = (data) =>
  api.post("/api/student/progress/mark-completed", data);
export const getCourseProgress = (courseId) =>
  api.get(`/api/student/progress/course/${courseId}`);

export default api;
