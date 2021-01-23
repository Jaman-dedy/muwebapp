import React from 'react';
import styled from 'styled-components';
import {
  fontFamily,
  headingSizes,
  themeColors,
} from 'components/Dashboard/Tour/Settings';

export default styled(({ h, ...props }) => {
  const H = `h${h}`;
  return h ? <H {...props} /> : <span {...props} />;
})`
  font-size: ${props => headingSizes[props.h - 1]};
  font-family: ${fontFamily};
  font-weight: 300;
  color: ${props => themeColors[props.color] || themeColors.dark};
  letter-spacing: 1px;
  line-height: 1.375;
`;
