export default (keyFn = () => {}, array = []) => {
  if (!keyFn) return [];
  if (!Array.isArray(array)) return [];

  const mySet = new Set();
  return array.filter(x => {
    const key = keyFn(x);
    const isNew = !mySet.has(key);
    if (isNew) mySet.add(key);
    return isNew;
  });
};
