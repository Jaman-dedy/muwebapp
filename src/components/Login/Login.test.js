import React from 'react';
import { shallow } from 'enzyme';
import Login from '.';

describe('<Login />', () => {
  test('Should render without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toHaveLength(1);
  });
});
