import React from 'react';
import { shallow } from 'enzyme';
import AuthWrapper from './AuthWrapper';

describe('AuthWrapper', () => {
  it('should render correctly', () => {
    global.translate = jest.fn(() => 'text');
    const props = {
      rightHeadlineText: 'Test',
    };
    const wrapper = shallow(
      <AuthWrapper {...props}>
        <></>
      </AuthWrapper>,
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
