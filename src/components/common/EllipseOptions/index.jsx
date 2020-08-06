/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Dropdown, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const EllipseMenu = ({
  options,
  iconSize,
  userItemStyle,
  currentItem,
  direction,
  hadleLoadCardOptions,
  wallet,
  ...rest
}) => {
  const menustyle = {
    width: 240,
    padding: '10px 10px',
  };
  return (
    <div className="icons">
      <Dropdown
        {...rest}
        floating
        direction={direction}
        icon={<Icon name="ellipsis vertical" size={iconSize} link />}
      >
        <Dropdown.Menu
          className="options menustyle-options"
          style={menustyle}
        >
          {options &&
            options.map((item, i) => (
              <div
                onKeyPress={() => {}}
                key={i.toString()}
                className="innerOptions"
                onClick={() => {
                  item.onClick(currentItem);
                  if (i === 2) {
                    hadleLoadCardOptions(wallet);
                  }
                }}
              >
                <div
                  className="icon-image"
                  style={{ display: 'flex', ...userItemStyle }}
                >
                  <Image
                    src={item.image}
                    height={20}
                    className="iconItem"
                  />
                  <p className="itemName">
                    {wallet?.HasACreditCard === 'YES' && i === 2
                      ? global.translate(
                          'Manage my credit card',
                          1764,
                        )
                      : item.name}
                  </p>
                </div>
              </div>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
EllipseMenu.propTypes = {
  menustyle: PropTypes.objectOf(PropTypes.any),
  options: PropTypes.arrayOf(PropTypes.any),
  iconSize: PropTypes.string,
  userItemStyle: PropTypes.objectOf(PropTypes.any),
  direction: PropTypes.string,
  currentItem: PropTypes.objectOf(PropTypes.any),
  wallet: PropTypes.objectOf(PropTypes.any),
  hadleLoadCardOptions: PropTypes.func,
};

EllipseMenu.defaultProps = {
  userItemStyle: {},
  menustyle: {},
  options: null,
  iconSize: 'large',
  direction: 'left',
  currentItem: {},
  wallet: {},
  hadleLoadCardOptions: () => {},
};
export default EllipseMenu;
