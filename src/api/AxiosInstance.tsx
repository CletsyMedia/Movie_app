import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AxiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 404:
//           console.error("Resource not found.");
//           break;
//         case 500:
//           console.error("Internal server error.");
//           break;
//         default:
//           console.error("An error occurred.", error.response);
//           break;
//       }
//     } else if (error.request) {
//       console.error("Request was made, but no response received.");
//     } else {
//       console.error("Error in setting up the request:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

export default AxiosInstance;
