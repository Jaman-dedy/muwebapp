/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
} from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import './draggable.scss';
import { Image, Flag } from 'semantic-ui-react';
import Thumbnail from 'components/common/Thumbnail';
import RemoveExIcon from 'assets/images/ex-close.png';

import AddExIcon from 'assets/images/arrow-forward.png';
import countries from 'utils/countries';

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
  const [hasError, setHasError] = useState(false);
  const unshared = getUshared(allWallets, selected);
  const shared =
    selected &&
    selected.map(item => ({
      id: uuid(),
      title: item.WalletNumber,
      subTitle: item.WalletName,
      image: item.Flag,
      balance: item.Balance,
    }));
  const unsharedItems =
    unshared &&
    unshared.map(item => ({
      id: uuid(),
      title: item.AccountNumber,
      subTitle: item.AccountName,
      image: item.Flag,
      balance: item.Balance,
    }));
  const columnsFromBackend = {
    unshared: {
      name: 'Un shared Wallets',
      items: unsharedItems,
      user: {
        countryCode: user1?.data.Country,
        image: user1?.data.PictureURL,
        lastName: user1?.data.LastName,
        firstName: user1?.data.FirstName,
        pid: user1?.data.PID,
        phoneNumber: user1?.data.MainPhone,
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

  const [columns, setColumns] = useState(columnsFromBackend);
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
      ...column.items.filter(it => it.id !== item.id),
    ];
    const newNextItems = [...nextColumn.items, item];

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
    return countries
      .filter(it => it.key)
      .find(
        it =>
          it.key.toLowerCase() ===
          column.user.countryCode.toLowerCase(),
      ).value;
  };
  return (
    <div className="wallets-area">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
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
                        {' '}
                        &nbsp; &nbsp;
                        <Flag
                          name={getUserCountry(column).toLowerCase()}
                        />
                      </span>
                    </p>
                  </div>

                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? 'rgba(51, 53, 86, 0.34)'
                                : '#E6E8EC',
                            }}
                            className="droppableColumn"
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: 'none',
                                          margin: '0 0 8px 0',
                                          minHeight: '20px',
                                          backgroundColor: snapshot.isDragging
                                            ? 'rgba(51, 53, 86, 0.34)'
                                            : '#E6E8EC',
                                          ...provided.draggableProps
                                            .style,
                                        }}
                                      >
                                        <div className="draggableItem">
                                          <div className="left-image">
                                            {' '}
                                            <img
                                              alt=""
                                              className="flag"
                                              src={item.image}
                                            />
                                          </div>

                                          <div className="wallet-info">
                                            <p className="walletnumber">
                                              {item.title}
                                            </p>
                                            <p className="walletname">
                                              {item.subTitle}
                                            </p>

                                            <p className="balance">
                                              {item.balance}
                                            </p>
                                          </div>

                                          <Image
                                            className="actionImage"
                                            height={18}
                                            src={
                                              columnIndex === 0
                                                ? AddExIcon
                                                : RemoveExIcon
                                            }
                                            onClick={() => {
                                              handleItemClicked(
                                                columnId,
                                                columnIndex,
                                                item,
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              </>
            );
          },
        )}
      </DragDropContext>
    </div>
  );
};

export default DragDropWallets;
