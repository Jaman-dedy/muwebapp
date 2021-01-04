import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Image, Label, List } from 'semantic-ui-react';
import helpIcon from 'assets/images/h-help.svg';
import './help.scss';
import Wrapper from 'hoc/Wrapper';
import VideoTour from './Video';
import HelpForm from './HelpForm';

const HelpDropDown = ({ setTourStep }) => {
  const history = useHistory();
  const [openVideoTour, setOpenVideoTour] = useState(false);
  const [openHelpForm, setOpenHelpForm] = useState(false);
  return (
    <Wrapper>
      <Dropdown
        title={global.translate('Help')}
        trigger={<Image src={helpIcon} />}
        className="help-dropdown"
      >
        <Dropdown.Menu direction="left">
          <Dropdown.Item
            onClick={() => {
              history.push('/get-help');
            }}
          >
            <List>
              <List.Item>
                <List.Icon name="help" />
                <List.Content>
                  {global.translate(`Get help`, 1975)}
                </List.Content>
              </List.Item>
            </List>
          </Dropdown.Item>
          <Dropdown.Item>
            <List>
              <List.Item
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
                onClick={() => setTourStep(true)}
              >
                <List.Icon name="lightbulb outline" />

                <List.Content>
                  {global.translate(`Tips for getting started`)}
                </List.Content>
                {/* </a> */}
              </List.Item>
            </List>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setOpenVideoTour(true);
            }}
          >
            <List>
              <List.Item>
                <List.Icon name="video play" />
                <List.Content>
                  {global.translate(`Watch the video tour`)}
                </List.Content>
              </List.Item>
            </List>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setOpenVideoTour(true);
            }}
          >
            <List>
              <List.Item>
                <List.Icon name="add" />
                <List.Content>
                  {global.translate(`What's new`)}
                  <Label
                    style={{ marginLeft: '.4rem' }}
                    circulor
                    color="red"
                  >
                    3
                  </Label>
                </List.Content>
              </List.Item>
            </List>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <VideoTour open={openVideoTour} setOpen={setOpenVideoTour} />
      <HelpForm open={openHelpForm} setOpen={setOpenHelpForm} />
    </Wrapper>
  );
};

export default HelpDropDown;
