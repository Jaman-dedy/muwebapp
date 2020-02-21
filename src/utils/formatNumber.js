/**
 * @param {int|string} num
 * @param {object} options
 * @returns {string} a formatted number with grouped thousands separated by commas
 */
export default (num, options = {}) => {
  const { locales = 'en-US', currency, style = 'decimal' } =
    options || {};
  let number = Number((num || '').toString().replace(/[^0-9.]/g, ''));
  number = Number.isNaN(number) ? 0 : number;
  number =
    options && style
      ? new Intl.NumberFormat(locales, { style }).format(number)
      : number;
  return currency ? `${number} ${currency}` : number;
};
