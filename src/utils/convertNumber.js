export default number => {
  if (number > 999 && number < 1000000) {
    return `${(number / 1000).toFixed(0)}K`;
  }
  if (number > 1000000) {
    return `${(number / 1000000).toFixed(0)}M`;
  }
  if (number < 900) {
    return number;
  }
};
