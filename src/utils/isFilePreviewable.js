export default file => {
  const previewableTypes = ['application/pdf', 'image/'];
  return previewableTypes.some(item =>
    file?.file?.type.startsWith(item),
  );
};
