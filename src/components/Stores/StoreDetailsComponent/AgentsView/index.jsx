import './style.scss';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Segment } from 'semantic-ui-react';
import Message from 'components/common/Message';
import removeStoreAgentAction from 'redux/actions/stores/removeStoreAgent';
import LoaderComponent from 'components/common/Loader';

import ListItem from './List/ListItem';

const AgentsView = (currentStore, onEditChange, isOpenAddAgent) => {
  const [isSearching, setIsSearching] = useState(false);
  const [initialInternalUsers, setIUsers] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [thisItem, setThisItem] = useState({});

  const dispatch = useDispatch();
  const { data: agentsData, loading: agentsLoading } = useSelector(
    state => state.stores.listStoreAgents,
  );

  const { loading: deleteAgentLoading } = useSelector(
    state => state.stores.deleteStoreAgents,
  );
  useEffect(() => {}, [isOpenAddAgent]);

  const initializeContacts = () => {
    setIUsers(agentsData);
    setIsSearching(false);
  };

  const handleKeyUp = (e, { value }) => {
    const search = value?.toLowerCase().replace(/"+"/g, '');
    const data = initialInternalUsers;

    if (search.trim().length > 0) {
      try {
        setIsSearching(true);
        const found = data.filter(
          item =>
            (item.FirstName &&
              item.FirstName.toLowerCase().search(search) !== -1) ||
            (item.LastName &&
              item.LastName.toLowerCase().search(search) !== -1) ||
            (item.PhoneNumber &&
              item.PhoneNumber.toLowerCase().search(search) !== -1) ||
            (item.ContactPID &&
              item.ContactPID.toLowerCase().search(search) !== -1),
        );

        setIUsers(found);
      } catch (error) {
        initializeContacts();
      }
    } else {
      initializeContacts();
    }
  };

  useEffect(() => {
    if (agentsData) {
      setIUsers(agentsData);
    }
  }, [agentsData]);

  return (
    <>
      <div className="search-area">
        {Array.isArray(agentsData) &&
          !agentsLoading &&
          agentsData &&
          agentsData.length >= 2 &&
          agentsData[0]?.Error !== '2016' && (
            <Input
              placeholder={global.translate('Search')}
              icon="search"
              iconPosition="left"
              disabled={!agentsData}
              onChange={handleKeyUp}
            />
          )}
      </div>
      {Array.isArray(agentsData) &&
        !agentsLoading &&
        agentsData &&
        agentsData.length <= 1 &&
        agentsData[0]?.Error === '2016' && (
          <Message
            message={global.translate('The store has no agent')}
            error={false}
            style={{ margin: '0px 25px' }}
          />
        )}

      {Array.isArray(agentsData) &&
        !agentsLoading &&
        isSearching &&
        agentsData.length === 0 && (
          <Message
            message={global.translate(
              'The search returned no result',
              1253,
            )}
            error={false}
            style={{ margin: '0px 25px' }}
          />
        )}
      {deleteAgentLoading ? (
        <LoaderComponent
          loaderContent={global.translate('Working…', 412)}
        />
      ) : (
        <>
          {initialInternalUsers &&
            initialInternalUsers.filter(item => !item.Error).length >
              0 && (
              <Segment>
                <div className="contact-list">
                  {initialInternalUsers &&
                    initialInternalUsers
                      .filter(item => !item.Error)
                      .sort((a, b) =>
                        a.FirstName.localeCompare(b.FirstName),
                      )
                      .map(item => (
                        <ListItem
                          item={{
                            ...item,
                            StoreID:
                              currentStore.currentStore.StoreID,
                          }}
                          onItemClick={item => {
                            setThisItem(item);
                          }}
                          thisItem={thisItem}
                          onDelete={() => {
                            const postData = {
                              StoreID: thisItem.StoreID,
                              AgentPID: thisItem.ContactPID,
                              Delete: 'Yes',
                            };
                            removeStoreAgentAction(postData)(
                              dispatch,
                            );
                          }}
                          isModalOpened={isModalOpened}
                          setIsModalOpened={setIsModalOpened}
                        />
                      ))}
                </div>
              </Segment>
            )}
        </>
      )}
    </>
  );
};
export default AgentsView;
