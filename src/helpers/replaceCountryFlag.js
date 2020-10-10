export default countries => {
  const flags = [{ en: 'us' }];

  return countries
    .map(({ flag, ...rest }) =>
      flag === 'sw' ? { flag: 'tz', ...rest } : { flag, ...rest },
    )
    .map(country => {
      const countryFlag = flags.find(flag => flag[country.flag]);
      if (countryFlag && countryFlag[country.flag]) {
        return { ...country, flag: countryFlag[country.flag] };
      }
      return country;
    });
};
