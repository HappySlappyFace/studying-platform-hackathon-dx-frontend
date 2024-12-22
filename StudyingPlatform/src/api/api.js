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

/**
 * Authentication Endpoints
 */
export const login = (data) => api.post("/api/v1/auth/authenticate", data);
export const registerUser = (data) => api.post("/api/v1/auth/register", data);

/**
 * General Student Actions
 */
export const getCourses = () => api.get("/api/student/courses");
export const getCourseDetails = (courseId) =>
  api.get(`/api/student/courses/${courseId}`);

/**
 * Progress Tracking Actions
 */
export const markResourceCompleted = (courseId, resourceId) =>
  api.post("/api/student/progress/mark-completed", null, {
    params: {
      courseId, // Adds ?courseId=1
      resourceId, // Adds &resourceId=2
    },
  });

export const getCourseProgress = (courseId) =>
  api.get(`/api/student/progress/course/${courseId}`);

export const getAllProgress = () => api.get("/api/student/progress/all");

/**
 * Teacher Actions (For Example)
 */
export const getTeacherCourses = () => api.get("/api/teacher/my-courses");

export const createCourse = (data) => api.post("/api/courses/create", data);

/**
 * Resource Actions
 */
export const getResources = (courseId) =>
  api.get(`/api/resources/course/${courseId}`);
export const uploadResource = (data) => api.post("/api/resources/upload", data);

export default api;
