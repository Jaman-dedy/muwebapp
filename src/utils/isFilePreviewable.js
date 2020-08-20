export default file => {
  const previewableTypes = ['application/pdf', 'image/', 'video/'];
  return previewableTypes.some(item =>
    file?.file?.type.startsWith(item),
  );
};
