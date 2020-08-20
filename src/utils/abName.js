const abName = (a, b) => {
  if (typeof a !== 'string') {
    return '';
  }
  return String(
    b ? `${a[0]}${b[0]}` : `${a[0]}${a[1]}`,
  ).toUpperCase();
};

export default abName;
