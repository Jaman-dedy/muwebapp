const getNumberWithOrdinal = n => {
  const possiblepostifixes = [
    global.translate('th'),
    global.translate('st'),
    global.translate('nd'),
    global.translate('rd'),
  ];
  const v = n % 100;

  const language = localStorage.getItem('language');

  if (language === 'fr' && n >= 20) {
    return n + possiblepostifixes[0];
  }

  return (
    n +
    (possiblepostifixes[(v - 20) % 10] ||
      possiblepostifixes[v] ||
      possiblepostifixes[0])
  );
};

const getPossibleDates = () => {
  const days = [];
  for (let i = 1; i <= 31; i += 1) {
    days.push({ day: i, val: getNumberWithOrdinal(i) });
  }
  return days;
};

export { getPossibleDates };
