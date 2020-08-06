export default options => {
  const { top = 0, left = 0, behavior = 'smooth' } = options || {};
  window.scroll({ top, left, behavior });
};
