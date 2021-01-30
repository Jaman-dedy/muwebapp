import React, { useEffect, useState } from 'react';
import uuid from 'uuid/v4';
import './draggable.scss';
import { Flag } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Thumbnail from 'components/common/Thumbnail';
import countries from 'utils/countries';
import {
  SHARE_WALLET_TYPE,
  UNSHARE_WALLET_TYPE,
} from 'constants/draggable-types';
import DraggableArea from './DraggableArea';
import DraggableWallet from './DraggableWallet';

function comparer(otherArray) {
  return current => {
    return (
      otherArray.filter(other => {
        return other.WalletNumber === current.AccountNumber;
      }).length === 0
    );
  };
}

const getUshared = (allWallets, selected) => {
  if (!allWallets || !selected) {
    return [];
  }
  const onlyInA = allWallets.filter(comparer(selected));
  const onlyInB = selected.filter(comparer(allWallets));
  const result = onlyInA.concat(onlyInB);
  return result;
};

const DragDropWallets = ({
  user1,
  user2,
  selected,
  allWallets,
  itemsUpdated,
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hasError, setHasError] = useState(false);
  const unshared = getUshared(allWallets, selected);

  const shared =
    selected &&
    selected
      .filter(item => item.WalletNumber.length > 1)
      .map(item => ({
        id: uuid(),
        title: item.WalletNumber,
        subTitle: item.WalletName,
        image: item.Flag,
        balance: item.Balance,
      }));

  const unsharedItems =
    unshared &&
    unshared
      .filter(item => item?.AccountNumber?.length > 1)
      .map(item => ({
        id: uuid(),
        title: item.AccountNumber,
        subTitle: item.AccountName,
        image: item.Flag,
        balance: item.Balance,
      }));

  const columnsFromBackend = {
    user2: {
      name: 'Un shared Wallets',
      items: unsharedItems,
      user: {
        countryCode: user1?.data?.Country,
        image: user1.data?.PictureURL,
        lastName: user1.data?.LastName,
        firstName: user1.data?.FirstName,
        pid: user1.data?.PID,
        phoneNumber: user1.data?.MainPhone,
      },
    },
    shared: {
      name: 'Visible Wallets',
      items: shared,
      user: {
        countryCode: user2.CountryCode,
        image: user2.PictureURL,
        lastName: user2.LastName,
        firstName: user2.FirstName,
        pid: user2.ContactPID,
        phoneNumber: user2.PhoneNumber,
      },
    },
  };

  const [columns, setColumns] = useState({});

  const { userData: user } = useSelector(state => state.user);
  const { allContacts: contacts } = useSelector(
    state => state.contacts,
  );

  useEffect(() => {
    if (contacts && user) {
      if (columnsFromBackend.shared.items) {
        setColumns(columnsFromBackend);
      }
    }
  }, [contacts, user]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  React.useEffect(() => {
    itemsUpdated(columns);
  }, [columns]);

  const handleItemClicked = (columnId, index, item) => {
    const column = columns[columnId];
    const next = Object.keys(columns).find(col => col !== columnId);
    const nextColumn = columns[next];
    const newItems = [
      ...columns[columnId].items.filter(it => it.id !== item.id),
    ];
    const nextItems = [...nextColumn.items];
    let newNextItems;
    if (hoveredItem) {
      nextItems.splice(hoveredItem, 0, item);
      newNextItems = nextItems;
      setHoveredItem(null);
    } else {
      newNextItems = [...nextItems, item];
    }

    setColumns({
      unshared: {
        name: 'Un shared Wallets',
        items: index === 0 ? newItems : newNextItems,
        user: {
          countryCode: user1.data.Country,
          image: user1.data.PictureURL,
          lastName: user1.data.LastName,
          firstName: user1.data.FirstName,
          pid: user1.data.PID,
          phoneNumber: user1.data.MainPhone,
        },
      },
      shared: {
        ...column,
        items: index === 0 ? newNextItems : newItems,
        user: {
          countryCode: user2.CountryCode,
          image: user2.PictureURL,
          lastName: user2.LastName,
          firstName: user2.FirstName,
          pid: user2.ContactPID,
          phoneNumber: user2.PhoneNumber,
        },
      },
    });
  };
  const getUserCountry = column => {
    if (!column.user?.countryCode) {
      return '';
    }
    return countries
      .filter(it => it.key)
      .find(
        it =>
          it?.key?.toLowerCase() ===
          column.user.countryCode.toLowerCase(),
      )?.value;
  };

  return (
    <div className="wallets-area">
      {Object.entries(columns).map(
        ([columnId, column], columnIndex) => {
          return (
            <>
              <div className="columns" key={columnId}>
                <div className="person-details">
                  <Thumbnail
                    name={column.user.firstName}
                    secondName={column.user.lastName}
                    avatar={column.user.image}
                    className="thumbnail"
                    hasError={hasError}
                    setHasError={setHasError}
                  />
                  <p className="person-title">
                    {column.user.firstName} {column.user.lastName}
                  </p>
                  <p className="person-sub-title">
                    {column.user.pid}
                  </p>
                  <p className="person-street">
                    {getUserCountry(column)}
                    <span>
                      &nbsp; &nbsp;
                      <Flag
                        name={getUserCountry(column).toLowerCase()}
                      />
                    </span>
                  </p>
                </div>

                <div style={{ margin: 8 }}>
                  <DraggableArea
                    types={
                      columnIndex !== 0
                        ? [SHARE_WALLET_TYPE]
                        : [UNSHARE_WALLET_TYPE]
                    }
                    onDrop={({ columnId, columnIndex, item }) => {
                      handleItemClicked(columnId, columnIndex, item);
                    }}
                  >
                    {column.items.map((item, index) => {
                      return (
                        <DraggableWallet
                          item={item}
                          index={index}
                          handleItemClicked={handleItemClicked}
                          columnId={columnId}
                          columnIndex={columnIndex}
                          setHoveredItem={setHoveredItem}
                        />
                      );
                    })}
                  </DraggableArea>
                </div>
              </div>
            </>
          );
        },
      )}
    </div>
  );
};

export default DragDropWallets;
