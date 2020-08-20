export default (form = {}) => {
  const arraySize = Object.keys(form).length / 3;

  const FileLinksList = new Array(Math.round(arraySize));
  let i = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const key of FileLinksList) {
    FileLinksList[i] = {};
    i += 1;
  }
  Object.keys(form).forEach(key => {
    const i = key.substring(key.length - 1, key.length);
    const ky = key.substring(0, key.length - 1);

    if (Number.isInteger(parseInt(i, 10))) {
      if (FileLinksList[i]) {
        FileLinksList[i][ky] = form[key];
      }
    }
  });

  return FileLinksList;
};
