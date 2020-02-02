export default error => {
  if (error.response) {
    return error.response.data;
  }
  return {
    error: error.message,
  };
};
