import React from 'react';
import { Dropdown, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const EllipseMenu = ({ options, iconSize, menuStyle }) => {
  return (
    <div className="icons">
      <Dropdown
        icon={<Icon name="ellipsis vertical" size={iconSize} link />}
      >
        <Dropdown.Menu className="options" style={menuStyle}>
          {options &&
            options.map((item, i) => (
              <div
                onKeyPress={() => {}}
                key={i.toString()}
                className="innerOptions"
                onClick={item.onClick}
              >
                <Image
                  src={item.image}
                  height={20}
                  className="iconItem"
                />
                <p className="itemName">{item.name}</p>
              </div>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
EllipseMenu.propTypes = {
  menuStyle: PropTypes.objectOf(PropTypes.any),
  options: PropTypes.arrayOf(PropTypes.any),
  iconSize: PropTypes.string,
};

EllipseMenu.defaultProps = {
  menuStyle: {},
  options: null,
  iconSize: 'small',
};
export default EllipseMenu;
