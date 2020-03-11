export default {
  exact: true,
  name: 'Log out',
  protected: true,
  path: '/logout',
  component: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    return window.location.replace('/login');
  },
};
