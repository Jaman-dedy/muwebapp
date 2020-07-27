import moment from 'moment';

export default (date, langue) => {
  if (langue === 'fr') {
    return moment(date).format('DD/MM/YYYY');
  }
  return moment(date).format('YYYY/MM/DD');
};
