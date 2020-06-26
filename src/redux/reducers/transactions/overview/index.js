import initialState from 'redux/initial-states/transactions';
import transactionsOverview from './transactionsOverview';
import transactionsOverviewWithContact from './transactionsOverviewWithContact';

export default (state = initialState.overview, action = {}) => ({
  ...state,
  ...transactionsOverview(state, action),
  ...transactionsOverviewWithContact(state, action),
});
