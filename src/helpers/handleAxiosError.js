export default error => {
  if (error.response) {
    return error.response.data;
  }
  return {
    message: error.message,
    error: error.message,
  };
};
