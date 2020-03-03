import React from 'react';
import { shallow } from 'enzyme';
import UserCurrencies from './UserCurrencies';

describe('Default Wallet', () => {
  it('should render correctly', () => {
    global.translate = jest.fn(() => 'text');
    const props = {
      setShowWallet: jest.fn(),
      showWallet: false,
      currencies: {
        loading: false,
        data: [],
      },
      authData: {},
      userData: {},
      dispatch: jest.fn(),
    };
    const wrapper = shallow(<UserCurrencies {...props} />);
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
