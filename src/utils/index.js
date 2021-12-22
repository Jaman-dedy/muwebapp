export const getDateFromNow = years => {
  const date = new Date();
  date.setFullYear(new Date().getFullYear() + years);
  return date;
};
