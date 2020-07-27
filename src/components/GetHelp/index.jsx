import React from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  Grid,
  Segment,
  List,
  Image,
  Button,
} from 'semantic-ui-react';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import fakerUserIcon from 'assets/images/fakeUser.png';
import TextEditor from './Editor';
import classes from './GetHelp.module.scss';

const GetHelp = ({ submitText, setText, loading, isSent }) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  return (
    <DashboardLayout>
      <WelcomeBar>
        <span className="lighter">
          {global.translate('Get help')}
        </span>
      </WelcomeBar>
      <GoBack onClickHandler={onClickHandler} />
      <div className={classes.GetHelp}>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column tablet={12} computer={6}>
              <Segment className={classes.PhoneBox}>
                <h3>Contact</h3>
                <Segment>
                  <List divided relaxed>
                    <List.Item className={classes.PhoneList}>
                      <List.Icon
                        name="call"
                        size="large"
                        verticalAlign="middle"
                        flipped="horizontally"
                      />
                      <List.Content>
                        <span className={classes.Action}>
                          Call us on
                        </span>
                        <span className={classes.PhoneNumber}>
                          +250-788-000-111
                        </span>
                      </List.Content>
                    </List.Item>
                    <List.Item className={classes.PhoneList}>
                      <List.Icon
                        name="whatsapp"
                        size="large"
                        verticalAlign="middle"
                        flipped="horizontally"
                      />
                      <List.Content>
                        <span className={classes.Action}>
                          Chat with us on whatsApp
                        </span>
                        <span className={classes.PhoneNumber}>
                          +250-788-000-111
                        </span>
                      </List.Content>
                    </List.Item>
                  </List>
                </Segment>
              </Segment>
              {/* <Segment>
                <h3>Live chat</h3>
                <Segment>
                  <List divided relaxed>
                    <List.Item>
                      <Image size="mini" avatar src={fakerUserIcon} />
                      <List.Content>Rachel Junior</List.Content>
                    </List.Item>
                    <List.Item>
                      <Image size="mini" avatar src={fakerUserIcon} />
                      <List.Content>Rachel Junior</List.Content>
                    </List.Item>
                  </List>
                </Segment>
              </Segment> */}
            </Grid.Column>
            <Grid.Column tablet={12} computer={10}>
              <Segment className={classes.Feedback}>
                <h3>Send us an email</h3>
                <span className={classes.Action}>
                  We love to hear from our beloved visitors. If you
                  have any inquiry, please send us an email right
                  away!
                </span>
                <Segment className={classes.TextEditor}>
                  <TextEditor setText={setText} isSent={isSent} />
                  <Button
                    loading={loading}
                    onClick={() => {
                      submitText();
                    }}
                    color="orange"
                  >
                    Send
                  </Button>
                </Segment>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </DashboardLayout>
  );
};

GetHelp.propTypes = {
  submitText: propTypes.func.isRequired,
  setText: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  isSent: propTypes.bool.isRequired,
};

export default GetHelp;
