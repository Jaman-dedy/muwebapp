import React from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { Grid, Segment, List, Button } from 'semantic-ui-react';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import TextEditor from './Editor';
import classes from './GetHelp.module.scss';

const GetHelp = ({
  submitText,
  setText,
  loading,
  isSent,
  disable,
}) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Get help')}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className={classes.GetHelp}>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column tablet={12} computer={6}>
              <Segment className={classes.PhoneBox}>
                <h3>{global.translate(`Contacts`)}</h3>
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
                          {global.translate(`Call us`)}
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
                          {global.translate(
                            `Chat with us on whatsApp`,
                          )}
                        </span>
                        <span className={classes.PhoneNumber}>
                          +250-788-000-111
                        </span>
                      </List.Content>
                    </List.Item>
                  </List>
                </Segment>
              </Segment>
            </Grid.Column>
            <Grid.Column tablet={12} computer={10}>
              <Segment className={classes.Feedback}>
                <h3>{global.translate(`Send us an email`, 1978)}</h3>
                <span className={classes.Action}>
                  {global.translate(
                    `We love to hear from You. Should you have any question, feel free to send us an email.`,
                  )}
                </span>
                <Segment className={classes.TextEditor}>
                  <TextEditor setText={setText} isSent={isSent} />
                  <Button
                    disabled={disable}
                    loading={loading}
                    onClick={() => {
                      submitText();
                    }}
                    color="orange"
                  >
                    {global.translate('Send Email')}
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
  disable: propTypes.bool.isRequired,
};

export default GetHelp;
