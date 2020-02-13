import React from 'react';
import { shallow } from 'enzyme';
import Login from '.';

describe('<Login />', () => {
  test('Should render without crashing', () => {
    const props = {
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      credentials: {},
      error: null,
      loading: false,
      pidError: '',
      passwordError: '',
      pinError: '',
    };
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
