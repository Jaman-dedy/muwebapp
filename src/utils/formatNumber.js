/**
 * @param {int|string} num
 * @param {object} options
 * @returns {string} a formatted number with grouped thousands separated by commas
 */
export default (num, options = {}) => {
  const {
    locales = 'en-US',
    currency,
    style = 'decimal',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options || {};
  let number = Number((num || '').toString().replace(/[^0-9.]/g, ''));
  number = Number.isNaN(number) ? 0 : number;

  try {
    number =
      options && style
        ? new Intl.NumberFormat(locales, {
            style,
            minimumFractionDigits,
            maximumFractionDigits,
          }).format(number)
        : number;
  } catch (error) {
    return number;
  }

  return currency ? `${number} ${currency}` : number;
};
