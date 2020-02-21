import React from 'react';
import { shallow } from 'enzyme';
import DefaultWallet from './defaultWallet';

describe('Default Wallet', () => {
  it('should render correctly', () => {
    const props = {
      setShowWallet: jest.fn(),
      showWallet: false,
      data: {
        loading: false,
        data: [],
      },
    };
    const wrapper = shallow(<DefaultWallet {...props} />);
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
