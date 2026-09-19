// FIXED - No more backend check
export const API_URL = "https://dummy.com";
const api = {
  get: async () => ({ data: [] }),
  post: async () => ({ data: {} }),
  put: async () => ({ data: {} }),
  delete: async () => ({ data: {} }),
};
export default api;
