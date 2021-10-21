import React, { useState } from 'react';
import { Card, Button, Item } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import { Link, useHistory } from 'react-router-dom';
import { setIsSendingMoney } from 'redux/actions/dashboard/dashboard';
import Thumbnail from 'components/common/Thumbnail';
import setCurrentContact from 'redux/actions/contacts/setCurrentContact';
import addNewContact from 'redux/actions/contacts/addNewContact';
import getContactList from 'redux/actions/contacts/getContactList';

const ProfileCard = () => {
  const [hasError, setHasError] = useState(false);
  const { data } = useSelector(({ user: { userData } }) => userData);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    myServices: { data: peerServices },
  } = useSelector(state => state.peerServices);

  const {
    allContacts: { data: allContacts },
    newContact: { loading },
  } = useSelector(state => state.contacts);

  const owner = peerServices?.Data?.[0]?.Owner || data;

  const isAuthUser =
    data?.PID === owner?.OwnerPID ||
    data?.PID === owner?.PID ||
    false;

  const isContact = () => {
    if (isAuthUser) {
      return false;
    }

    if (
      allContacts
        ?.map(item => item.ContactPID)
        .includes(owner.OwnerPID)
    ) {
      return true;
    }
    return false;
  };

  const contact = allContacts?.find(
    item => item.ContactPID === owner?.OwnerPID,
  );

  const getText = () => {
    if (data?.PID === owner?.OwnerPID) {
      return global.translate('Transfer money', 1950);
    }
    if (data?.PID === owner?.PID) {
      return global.translate('Transfer money', 1950);
    }

    if (isContact()) {
      return global.translate('More options');
    }
    return global.translate('Add to contacts');
  };

  const contactData = {
    Criteria: 'PID',
    ContactData: owner?.OwnerPID?.toUpperCase(),
  };

  const addToContact = () => {
    addNewContact(contactData, '/AddToContact')(dispatch);
  };

  const handleUserClicked = () => {
    if (isAuthUser) {
      setIsSendingMoney(dispatch);
      return history.push({
        pathname: '/contacts',
      });
    }

    if (isContact()) {
      setCurrentContact(contact)(dispatch);
      getContactList(dispatch);
      return history.push({
        pathname: '/contacts',
      });
    }
    return addToContact();
  };

  return (
    <>
      <Card className="profile-card">
        <div className="card-header" />

        <Card.Content className="card-content">
          {data && owner && (
            <Thumbnail
              width={71}
              height={71}
              name={owner.FirstName}
              secondName={owner.LastName}
              style={{ width: 71, height: 71 }}
              avatar={owner.PictureURL}
              circular
              className="image"
              setHasError={setHasError}
            />
          )}

          <Card.Description>
            {owner?.FirstName} {owner?.LastName}
            {owner && (
              <Item.Content className="pid-filled">
                @
                {owner?.OwnerPID?.toLowerCase() ||
                  owner?.PID?.toLowerCase()}
              </Item.Content>
            )}
            <Button
              disabled={loading}
              loading={loading}
              as={Link}
              className="bg-red"
              style={{ color: 'white' }}
              onClick={handleUserClicked}
            >
              {getText()}
            </Button>
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  );
};

ProfileCard.propTypes = {};

export default ProfileCard;
