/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import userSecurityQuestionsAction from 'redux/actions/users/userSecurityQuestions';
import updateSecurityQuestionsAction, {
  restoreUpdateSecurityQuestions,
} from 'redux/actions/userAccountManagement/updateSecurityQuestions';
import { updateAuthData } from 'redux/actions/users/login';

export default () => {
  const dispatch = useDispatch();
  const {
    userData,
    resetPasswordQuestions: securityQuestions,
  } = useSelector(({ user }) => user);
  const { updateSecurityQuestions } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );

  const defaultQuestions = new Array(5).fill().map((_, index) => {
    return {
      question: '',
      answer: '',
      Index: '',
      key: index,
    };
  });

  const [questionData, setQuestionData] = useState(defaultQuestions);
  const [PIN, setPIN] = useState('');
  const [pinError, setPinError] = useState('');
  const [open, setOpen] = useState(false);

  const onSelectQuestion = ({ Text, Index, key }) => {
    const newQuestionData = questionData.map(item => {
      if (item.key === key)
        return {
          question: Text,
          answer: item.answer,
          Index,
          key,
          error: null,
        };
      return item;
    });

    setQuestionData(newQuestionData);
  };

  const handleInputChange = ({ target: { key, value } }) => {
    const newQuestionData = questionData.map(item => {
      if (item.key === key)
        return {
          ...item,
          answer: value,
          error: null,
        };
      return item;
    });

    setQuestionData(newQuestionData);
  };

  const checkForDuplication = () => {
    let containsDuplicate = false;
    const newQuestionData = questionData.map(item => {
      const isDuplicate = questionData.some(
        ({ question, key }) =>
          question && question === item.question && key !== item.key,
      );
      if (isDuplicate) {
        containsDuplicate = true;
        return {
          ...item,
          error: global.translate(
            'Duplicate questions are not allowed',
            2061,
          ),
        };
      }
      return item;
    });
    setQuestionData(newQuestionData);

    return containsDuplicate;
  };

  const validateForm = () => {
    let hasError = false;

    const newQuestionData = questionData.map(item => {
      const { question, answer } = item;
      if (question && !answer) {
        hasError = true;
        return {
          ...item,
          error: global.translate(
            'Please provide the answer to all the questions',
          ),
        };
      }

      return item;
    });

    setQuestionData(newQuestionData);

    return hasError;
  };

  const validatePIN = () => {
    const pinError = PIN
      ? ''
      : global.translate('Please provide the PIN number.', 1945);
    setPinError(pinError);
    return !!pinError;
  };

  const handlePinChange = value => {
    setPinError('');
    setPIN(value);
  };

  const handleSubmit = () => {
    if (!validateForm() && !checkForDuplication() && !validatePIN()) {
      // send to the backend
      const data = { PIN };
      questionData.map(({ answer, Index }, index) => {
        data[`Q${index + 1}index`] = Index;
        data[`Answer${index + 1}`] = answer;
        return index;
      });

      updateSecurityQuestionsAction(data)(dispatch);
    }
  };

  useEffect(() => {
    const { data } = userData;
    if (data) userSecurityQuestionsAction(data.PID)(dispatch);
  }, [userData]);

  useEffect(() => {
    const { Questions } = securityQuestions;
    if (Questions) {
      const defaultQuestions = [
        ...Questions,
        ...new Array(
          Questions.length <= 5 ? 5 - Questions.length : 0,
        ),
      ].map((question, index) => {
        const { Text, Answer } = question;
        return {
          question: Text || '',
          answer: Answer || '',
          Index: question[`Q${index + 1}index`] || '',
          key: index,
        };
      });

      setQuestionData(defaultQuestions);
    }
  }, [securityQuestions]);

  useEffect(() => {
    const { data } = userData;
    if (updateSecurityQuestions.success) {
      toast.success(updateSecurityQuestions.Description);
      if (data) userSecurityQuestionsAction(data.PID)(dispatch);
      restoreUpdateSecurityQuestions()(dispatch);
      updateAuthData({ QuestionsSet: 'YES' })(dispatch);
      setOpen(false);
    }
    if (updateSecurityQuestions.error) {
      toast.error(updateSecurityQuestions.error.Description);
    }
  }, [updateSecurityQuestions]);

  return {
    userData,
    securityQuestions,
    onSelectQuestion,
    questionData,
    handleInputChange,
    handleSubmit,
    handlePinChange,
    PIN,
    pinError,
    updateSecurityQuestions,
    open,
    setOpen,
  };
};
