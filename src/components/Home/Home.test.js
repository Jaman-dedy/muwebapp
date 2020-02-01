import React from 'react';
import { shallow } from 'enzyme';
import Home from '.';

describe('<Home />', () => {
  test('Should render without crashing', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toHaveLength(1);
  });
});
