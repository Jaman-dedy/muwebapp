import React from 'react';
import { shallow } from 'enzyme';
import MyNetworth from './networth';
import Store from '__mocks__/store';
import { Provider } from 'react-redux';

describe('Networth', () => {
  it('should render correctly', () => {
    const props = {
      setShowWallet: jest.fn(),
      showWallet: false,
      userData: {},
      networth: {
        loading: false,
        error: null,
        data: [],
      },
    };
    const wrapper = shallow(
      <Provider store={Store}>
        <MyNetworth {...props} />
      </Provider>,
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
