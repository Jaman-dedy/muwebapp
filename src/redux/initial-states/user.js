export default {
  currentUser: {
    isAuthenticated: !!localStorage.token,
    data: {},
    loading: false,
    error: null,
  },
  login: {
    error: null,
    loading: false,
  },
  usersList: {
    error: null,
    loading: false,
    data: [],
    message: '',
  },
};
