import React from 'react';
import { shallow } from 'enzyme';
import PINCodeForm from '.';

describe('PinCodeForm', () => {
  it('should render correctly', () => {
    const props = {
      onChange: jest.fn(),
      pinError: '',
    };
    const wrapper = shallow(<PINCodeForm {...props} />);
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
