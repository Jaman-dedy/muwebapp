import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
  Button,
  Modal,
  Grid,
  Header,
  Image,
  Menu,
  Segment,
  Sidebar,
  Icon,
  Form,
  List,
  Label,
} from 'semantic-ui-react';
import AvataImg from 'assets/images/fakeUser.png';
import TextEditor from '../TextEditor';

const HelpForm = ({ open, setOpen }) => {
  const handleCloseModal = () => {
    setOpen(false);
  };
  const [visible, setVisible] = useState(false);
  const [dmUsContent, setDmUsContent] = useState(true);
  const [chatContent, setChatContent] = useState(false);
  const [callContent, setCallContent] = useState(false);
  return (
    <div>
      <Modal size="small" open={open} onClose={handleCloseModal}>
        <Modal.Header style={{ textAlign: 'center' }}>
          We are hear to support you
        </Modal.Header>
        <Modal.Content>
          <Grid columns={1}>
            <Grid.Column>
              <Button
                basic
                color="green"
                onClick={() => setVisible(true)}
              >
                More actions
              </Button>
            </Grid.Column>

            <Grid.Column>
              <Sidebar.Pushable as={Segment}>
                <Sidebar
                  as={Menu}
                  animation="slide along"
                  icon="labeled"
                  onHide={() => setVisible(false)}
                  vertical
                  visible={visible}
                  width="thin"
                >
                  <Menu.Item
                    as="a"
                    onClick={() => {
                      setDmUsContent(true);
                      setChatContent(false);
                      setCallContent(false);
                    }}
                  >
                    <Icon name="envelope" />
                    DM Us
                  </Menu.Item>
                  <Menu.Item
                    as="a"
                    onClick={() => {
                      setChatContent(true);
                      setCallContent(false);
                      setDmUsContent(false);
                    }}
                  >
                    <Icon name="chat" />
                    Chat with Us
                  </Menu.Item>
                  <Menu.Item
                    as="a"
                    onClick={() => {
                      setCallContent(true);
                      setChatContent(false);
                      setDmUsContent(false);
                    }}
                  >
                    <Icon name="call" />
                    Call Us
                  </Menu.Item>
                </Sidebar>

                {dmUsContent && (
                  <Sidebar.Pusher>
                    <Segment
                      style={{
                        paddingBottom: '1.5rem',
                        paddingTop: '1.5rem',
                      }}
                      basic
                    >
                      <Header as="h3">How should we help you</Header>

                      <Form>
                        {/* <Form.TextArea placeholder="What do you think about 2U money..." /> */}
                        <TextEditor />
                        <Form.Button basic color="green">
                          Submit
                        </Form.Button>
                      </Form>
                    </Segment>
                  </Sidebar.Pusher>
                )}
                {chatContent && (
                  <Sidebar.Pusher>
                    <Segment basic>
                      <Header as="h3">Could you chat with us</Header>
                      <List selection animated verticalAlign="middle">
                        <List.Item>
                          <Image avatar src={AvataImg} />
                          <List.Content>
                            <List.Header>Helen</List.Header>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <Image avatar src={AvataImg} />
                          <List.Content>
                            <List.Header>Christian</List.Header>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <Image avatar src={AvataImg} />
                          <List.Content>
                            <List.Header>Daniel</List.Header>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <Image avatar src={AvataImg} />
                          <List.Content>
                            <List.Header>Daniel</List.Header>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <Image avatar src={AvataImg} />
                          <List.Content>
                            <List.Header>Daniel</List.Header>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Segment>
                  </Sidebar.Pusher>
                )}
                {callContent && (
                  <Sidebar.Pusher>
                    <Segment basic>
                      <Header as="h3">Feel free to call us</Header>
                      <List divided selection>
                        <List.Item>
                          <Label color="yellow" horizontal>
                            MTN Number
                          </Label>
                          (+250) 78 37 32 214
                        </List.Item>
                        <List.Item>
                          <Label color="orange" horizontal>
                            Airtel Number
                          </Label>
                          (+250) 78 37 32 214
                        </List.Item>
                        <List.Item>
                          <Label color="blue" horizontal>
                            Tigo Number
                          </Label>
                          (+250) 78 37 32 214
                        </List.Item>
                      </List>
                    </Segment>
                  </Sidebar.Pusher>
                )}
              </Sidebar.Pushable>
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            basic
            color="orange"
            content="Close"
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
HelpForm.propTypes = {
  setOpen: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
};

export default HelpForm;
