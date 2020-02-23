import { useSelector, useDispatch } from 'react-redux';

import userSecurityQuestionsAction from 'redux/actions/users/userSecurityQuestions';

export default ({ resetPasswordData, setScreenNumber }) => {
  const dispatch = useDispatch();

  const { personalId } = resetPasswordData;

  const { resetPasswordQuestions } = useSelector(({ user }) => user);

  const handleNext = () => {
    setScreenNumber(3);
  };

  const userSecurityQuestionsFx = () => {
    userSecurityQuestionsAction(personalId)(dispatch);
  };

  return {
    handleNext,
    userSecurityQuestionsFx,
    resetPasswordQuestions,
  };
};
