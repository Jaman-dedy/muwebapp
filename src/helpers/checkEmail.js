const validateEmail = email => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,20})+$/.test(email)) {
    return true;
  }
  return false;
};

export default validateEmail;
