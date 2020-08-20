export default (pricingForm = {}) => {
  const arraySize = Object.keys(pricingForm).length / 3;

  const pricingList = new Array(Math.round(arraySize));
  let i = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const key of pricingList) {
    pricingList[i] = {};
    i += 1;
  }
  Object.keys(pricingForm).forEach(key => {
    const i = key.substring(key.length - 1, key.length);
    const ky = key.substring(0, key.length - 1);

    if (Number.isInteger(parseInt(i, 10))) {
      if (pricingList[i]) {
        pricingList[i][ky] = pricingForm[key];
      }
    }
  });

  return pricingList;
};
