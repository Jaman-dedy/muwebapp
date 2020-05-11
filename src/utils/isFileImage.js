export default file => {
  return file && file.type && file.type.split('/')[0] === 'image';
};
