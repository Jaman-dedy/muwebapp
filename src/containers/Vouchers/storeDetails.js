import { useEffect } from 'react';

export default ({ setScreenNumber }) => {
  const handleNext = () => {
    setScreenNumber(4);
  };

  useEffect(() => {}, []);

  const goBack = () => {
    setScreenNumber(2);
  };

  return {
    handleNext,
    goBack,
  };
};
