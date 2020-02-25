import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '.';

describe('Carousel', () => {
  it('should render without crashing', () => {
    const data = [{ id: 'test', test: 'test' }];
    const wrapper = shallow(<Carousel data={data} />);
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
