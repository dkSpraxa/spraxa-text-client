const baseURL = "http://localhost:8000/api/v1";

const api = {
  noteAPI: {
    create: `${baseURL}/note/create`,
    getAll: `${baseURL}/notes`,
    update: `${baseURL}/note/update`,
    delete: `${baseURL}/note/delete`,
  },
  userAPI: {
    register: `${baseURL}/user/signup`,
    login: `${baseURL}/user/login`,
  },
};

export default api;
