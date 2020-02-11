import React from 'react';
import { Icon, Image, Label, Form, Input } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import './NavBar.scss';
import QuestionIcon from 'assets/images/question.png';
import TalkIcon from 'assets/images/talk.png';
import toggleSideBar from 'redux/actions/dashboard/dashboard';

const NavBar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <header className="header large-v-padding">
        <button
          type="button"
          className="menu-icon cursor-pointer no-border no-outline transparent"
          onClick={() => toggleSideBar(dispatch)}
        >
          <Icon name="bars" size="big" />
        </button>

        <span className="search_icon">
          <Icon name="search" />
        </span>
        <span className="header__search navbar_item_icon">
          <Form.Field>
            <Input placeholder="Search..." />
          </Form.Field>
        </span>
        <span className="navbar_item_icon">
          <Image src={QuestionIcon} className="header__icon" />
        </span>
        <span className="navbar_item_icon">
          <Image src={TalkIcon} className="header__icon" />
        </span>

        <span className="notification navbar_item_icon">
          <Icon name="bell outline" className="u_bell" />
          <Label color="red" className="u_bell_badge">
            2
          </Label>
        </span>

        <span className="header__avatar navbar_item_icon">
          <Image
            src="https://react.semantic-ui.com/images/wireframe/square-image.png"
            size="small"
            circular
            className="header_2u_avatar"
            style={{ height: '40px', width: '40px' }}
          />
        </span>
      </header>
    </>
  );
};

export default NavBar;
