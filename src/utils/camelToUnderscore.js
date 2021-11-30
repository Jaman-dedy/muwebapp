export default text => {
  let result = String(text).replace(/([A-Z])/g, ' $1');
  result = result
    .split(' ')
    .join('_')
    .toLowerCase();
  return String(result)[0] === '_' ? result.substring(1) : result;
};

export const camelToSentence = text => {
  const result = String(text).replace(/([A-Z])/g, ' $1');
  return result;
};
