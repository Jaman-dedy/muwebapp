import { useEffect } from 'react';

export default ({ setScreenNumber }) => {
  const handleNext = () => {
    setScreenNumber(2);
  };

  useEffect(() => {}, []);

  const goBack = () => {
    setScreenNumber(1);
  };

  return {
    handleNext,
    goBack,
  };
};
