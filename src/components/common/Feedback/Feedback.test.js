import React from 'react';
import { shallow } from 'enzyme';
import Feedback from './Feedback';
import store from '__mocks__/store';
import { Provider } from 'react-redux';

describe('Feedback', () => {
  it('should render correctly', () => {
    const props = {
      setShowWallet: jest.fn(),
      showWallet: false,
      data: {
        loading: false,
        data: [],
      },
    };
    const wrapper = shallow(
      <Provider store={store}>
        {' '}
        <Feedback {...props} />
      </Provider>,
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
