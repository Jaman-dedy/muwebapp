import moment from 'moment';

export default time => {
  const todaysDate = moment().format('YYYY/MM/DD');
  const chatDate = moment(time).format('YYYY/MM/DD');

  if (todaysDate === chatDate) {
    return moment(time).format('HH:mm');
  }
  return moment(time).format('YYYY/MM/DD  HH:mm');
};
