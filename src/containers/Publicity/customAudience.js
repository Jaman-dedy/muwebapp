/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import rawCountries from 'utils/countries';

const total = 100;

function updateDistribution(percent, distributions, index) {
  const arr = distributions.splice(0, index);
  arr.push(percent);
  distributions = [...arr, ...distributions];
  let oldValue = distributions.splice(index + 1, 1);

  return distributions.map((val, i) => {
    if (oldValue && i !== index) {
      const result = Number(oldValue) + Number(val);
      oldValue = 0;
      return result;
    }
    return val;
  });
}

function distribute(percent, distributions = [], index) {
  let [diff, percentToMeet] = [0, 0];
  const max = distributions.length
    ? Math.max(...distributions)
    : total;
  const maxIndex = distributions.indexOf(max);

  if (percent > max) {
    distributions = distributions.map(val => {
      if (percentToMeet >= percent) {
        return val;
      }
      percentToMeet += val;
      return percentToMeet > percent ? percentToMeet - percent : 0;
    });
    if (index || index === 0) {
      distributions = updateDistribution(
        percent,
        distributions,
        index,
      );
    } else {
      distributions.push(percent);
    }
  } else {
    diff = max - percent;
    if (diff > 0 && maxIndex >= 0) {
      distributions[maxIndex] = diff;
    }
    if (index || index === 0) {
      distributions = updateDistribution(
        percent,
        distributions,
        index,
      );
    } else {
      distributions.push(percent);
    }
  }

  return distributions;
}

export default ({
  errors,
  setErrors,
  currentPublicity,
  clearError,
  executePublicityData,
  handleInputChange,
}) => {
  const [sample, setSample] = useState([
    {
      CountryCode: '',
      Percent: '100',
      index: 0,
    },
  ]);

  const min = 0;
  const max = 100;

  const { userLocationData } = useSelector(({ user }) => user);
  const { Store } = currentPublicity;

  const countries = rawCountries.map(({ text, flag, key }) => ({
    CountryName: text,
    Flag: `https://flagcdn.com/h20/${flag}.png`,
    CountryCode: key,
  }));

  const selectedCountry = countries.find(({ CountryCode }) => {
    if (Store && Store.CountryCode) {
      return (
        CountryCode.toLowerCase() === Store.CountryCode.toLowerCase()
      );
    }

    return CountryCode === userLocationData.CountryCode;
  });

  useEffect(() => {
    setSample([
      {
        CountryCode: selectedCountry && selectedCountry.CountryCode,
        Percent: '100',
        index: 0,
      },
    ]);
  }, [Store, userLocationData]);

  const handleSampleInputChange = ({
    target: { name, value, index },
  }) => {
    if (name.includes('Percentage')) {
      if (Number(value) > max || Number(value) < min) return;

      const percentageList = sample.map(({ Percent }) =>
        Number(Percent),
      );
      const result = distribute(
        Number(value),
        percentageList,
        Number(index),
      );

      const newSample = sample.map((el, idx) => {
        return {
          ...el,
          Percent: result[idx],
        };
      });

      setSample(newSample);
    }

    if (name.includes('CountryCode')) {
      const newSample = sample.map(el => {
        if (el.index === index) {
          return {
            ...el,
            CountryCode: value,
          };
        }
        return el;
      });
      setSample(newSample);
    }
  };

  const addSampleForm = () => {
    let totalPercentage = 0;

    sample.map(el => {
      totalPercentage += Number(el.Percent);
      return totalPercentage;
    });
    setSample([
      ...sample,
      {
        CountryCode: '',
        Percent: `${100 - totalPercentage}`,
        index: sample[sample.length - 1].index + 1,
      },
    ]);
  };

  const removeSampleForm = i => {
    if (sample.length > 1 && i !== 0) {
      const removedSample = sample.find(({ index }) => index === i);
      const removedPerc = removedSample ? removedSample.Percent : 0;

      let totalPercentage = 0;

      sample.map(el => {
        totalPercentage += Number(el.Percent);
        return totalPercentage;
      });

      let newForm = sample.filter(({ index }) => index !== i);

      let smallerSample = newForm[0];
      newForm.map(el => {
        if (el.Percent < smallerSample.Percent) smallerSample = el;
        return smallerSample;
      });

      newForm = newForm.map(el => {
        if (el.index === smallerSample.index) {
          return {
            ...el,
            Percent: Number(el.Percent) + Number(removedPerc),
          };
        }
        return el;
      });

      setSample([...newForm]);
    }
  };

  useEffect(() => {
    let totalPercentage = 0;
    let error = '';

    sample.map(el => {
      totalPercentage += Number(el.Percent);
      if (!el.CountryCode)
        error = global.translate(
          'Please, fill all the countries',
          2078,
        );
      return totalPercentage;
    });

    handleInputChange({
      target: {
        name: 'Sample',
        value: sample,
      },
    });

    if (error || totalPercentage !== 100) {
      setErrors({
        ...errors,
        Sample:
          error ||
          global.translate(
            'The total percentage should be 100',
            1576,
          ),
      });
    } else {
      setErrors({
        ...errors,
        Sample: '',
      });
    }
  }, [sample]);

  return {
    errors,
    handleInputChange,
    executePublicityData,
    currentPublicity,
    clearError,
    sample,
    addSampleForm,
    removeSampleForm,
    handleSampleInputChange,
  };
};
