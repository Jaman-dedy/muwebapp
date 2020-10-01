import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  SHARE_WALLET_TYPE,
  UNSHARE_WALLET_TYPE,
} from 'constants/draggable-types';
import { Image } from 'semantic-ui-react';
import RemoveExIcon from 'assets/images/ex-close.png';

import AddExIcon from 'assets/images/arrow-forward.png';

const DraggableWallet = ({
  item,
  index,
  handleItemClicked,
  columnId,
  columnIndex,
  setHoveredItem,
}) => {
  const ref = useRef(null);

  const [{ isDragging }, dragRef] = useDrag({
    item: {
      id: index,
      index,
      item,
      columnIndex,
      columnId,
      type:
        columnIndex === 0 ? SHARE_WALLET_TYPE : UNSHARE_WALLET_TYPE,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept:
      columnIndex === 0 ? [UNSHARE_WALLET_TYPE] : [SHARE_WALLET_TYPE],
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      setHoveredItem(index);

      item.index = hoverIndex;
    },
  });
  dragRef(drop(ref));
  return (
    <div
      ref={ref}
      style={{
        userSelect: 'none',
        margin: '0 0 8px 0',
        minHeight: '20px',
        backgroundColor: true ? 'rgba(51, 53, 86, 0.34)' : '#E6E8EC',
        opacity: isDragging ? 0 : 1,
      }}
    >
      <div className="draggableItem">
        <div className="left-image">
          {' '}
          <img alt="" className="flag" src={item.image} />
        </div>

        <div className="wallet-info">
          <p className="walletnumber">{item.title}</p>
          <p className="walletname">{item.subTitle}</p>
          <p className="balance">{item.balance}</p>{' '}
          {/*// format the balance */}
        </div>

        <Image
          className="actionImage"
          height={18}
          src={columnIndex === 0 ? AddExIcon : RemoveExIcon}
          onClick={() => {
            handleItemClicked(columnId, columnIndex, item);
          }}
        />
      </div>
    </div>
  );
};
export default DraggableWallet;
