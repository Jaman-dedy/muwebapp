import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '.';

describe('LoginForm', () => {
  it('should render correctly', () => {
    const props = {
      handleChange: jest.fn(),
      credentials: {},
      onSubmit: jest.fn(),
      isLoading: false,
      error: 'test',
      pidError: '',
      passwordError: '',
      pinError: '',
    };
    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
