import React, { useState, useEffect } from 'react';
import {
  Modal,
  Image,
  Icon,
  Segment,
  TransitionablePortal,
  Placeholder,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import VerifiedIcon from 'assets/images/verified.png';
import Message from 'components/common/Message';
import { setGlobalChat } from 'redux/actions/chat/globalchat';
import { ONE_TO_ONE } from 'constants/general';
import AppListItem from '../ListItem/List';
import './index.scss';
import ModalHeader from '../ModalHeader';
import SearchInput from '../SearchInput';

const ChooseChatUserModal = ({ open, setOpen }) => {
  const {
    allContacts: { data: contactList, loading },
  } = useSelector(state => state.contacts);

  const [appContacts, setAppContacts] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (contactList) {
      setAppContacts(
        contactList.filter(item => item.ContactType === 'INTERNAL'),
      );
    }
  }, [contactList]);

  const [selectedContacts, setSelectedContacts] = useState([]);

  const filterItems = (e, { value }) => {
    const found = contactList
      ?.filter(item => item.ContactType === 'INTERNAL')
      ?.filter(
        item =>
          (item.FirstName &&
            item.FirstName.toLowerCase().startsWith(
              value.toLowerCase(),
            )) ||
          (item.LastName &&
            item.LastName.toLowerCase().startsWith(
              value.toLowerCase(),
            )) ||
          (item.PhoneNumber &&
            item.PhoneNumber.toLowerCase().startsWith(
              value.toLowerCase(),
            )) ||
          (item.ContactPID &&
            item.ContactPID.toLowerCase().startsWith(
              value.toLowerCase(),
            )),
      );
    setAppContacts(found);
  };

  const itemChecked = item => selectedContacts.includes(item);

  const removeFromSelected = item => {
    setSelectedContacts([
      ...selectedContacts.filter(
        contact => contact.ContactPID !== item.ContactPID,
      ),
    ]);
  };
  const addItemToSelected = item => {
    if (itemChecked(item)) {
      removeFromSelected(item);
    } else {
      setSelectedContacts([item]);
    }
  };
  return (
    <TransitionablePortal
      transition={{
        duration: 400,
        animation: 'fade',
      }}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Modal
        open={open}
        size="mini"
        onClose={() => {
          setOpen(false);
        }}
        className="chooser-modal"
      >
        <ModalHeader
          setOpen={() => setOpen(false)}
          selectedContacts={selectedContacts}
          title={global.translate('New Chat', 1650)}
          closeIcon="arrow left"
          confirmContent={global.translate('Next', 10)}
          nextDisabled={!selectedContacts.length}
          onConfirmClick={() => {
            if (selectedContacts.length === 1) {
              setGlobalChat({
                currentChatType: ONE_TO_ONE,
                currentChatTarget: selectedContacts[0],
                isChattingWithSingleUser: true,
              })(dispatch);
            }
            setOpen(false);
          }}
        />
        <Modal.Content>
          <div className="search">
            <SearchInput
              fluid
              placeholder={global.translate(
                'Search for people',
                1651,
              )}
              onChange={filterItems}
            />
          </div>

          {!!selectedContacts?.length && (
            <Segment className="search_and-results">
              <div className="user-chooser-results">
                {selectedContacts.map(item => (
                  <AppListItem
                    imageURL={item.PictureURL}
                    key={item.PictureURL}
                    itemTitle={`${item.FirstName} ${item.LastName}`}
                    noHorizontalRule={selectedContacts?.length === 1}
                    secondaryContent={
                      <span
                        title={global.translate(
                          'Remove from List',
                          1652,
                        )}
                      >
                        <Icon
                          name="delete"
                          onClick={() => removeFromSelected(item)}
                        />
                      </span>
                    }
                  />
                ))}
              </div>
            </Segment>
          )}

          <div className="bottom-recents-list">
            {loading && !contactList && (
              <>
                {Array(5)
                  .fill(1)
                  .map(() => (
                    <Placeholder key={`Item at-${new Date()}`}>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                    </Placeholder>
                  ))}
              </>
            )}

            {appContacts?.length === 0 && !loading && (
              <Message
                fluid
                message={global.translate('No results found', 1253)}
                error={false}
              />
            )}
            {appContacts &&
              appContacts.length > 0 &&
              appContacts.map(item => (
                <AppListItem
                  imageURL={item.PictureURL}
                  itemTitle={`${item.FirstName} ${item.LastName}`}
                  secondaryContent={
                    item.AccountVerified === 'YES' && (
                      <span
                        title={global.translate('Account verified')}
                      >
                        <Image
                          src={VerifiedIcon}
                          height={15}
                          style={{ display: 'inline' }}
                          width={15}
                          className="user-verified-icon"
                        />
                      </span>
                    )
                  }
                  itemDescription={global.translate(
                    'From your Contacts',
                    1653,
                  )}
                  onItemClick={() => addItemToSelected(item)}
                  bottomRightContext={
                    itemChecked(item) && <Icon name="checkmark" />
                  }
                />
              ))}
          </div>
        </Modal.Content>
      </Modal>
    </TransitionablePortal>
  );
};
ChooseChatUserModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

ChooseChatUserModal.defaultProps = {
  open: false,
  setOpen: () => {},
};
export default ChooseChatUserModal;
