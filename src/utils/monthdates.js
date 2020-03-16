const getNumberWithOrdinal = n => {
  const possiblepostifixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
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
