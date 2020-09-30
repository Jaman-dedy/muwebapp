import React from 'react';
import { useDrop } from 'react-dnd';
import './draggableArea.scss';

const DraggableAreaComponent = ({
  types,
  onDrop,
  canDrop,
  children,
  wrapperStyle,
  contentStyle,
}) => {
  const [{ isOver, canDrop: canDropHere }, dropRef] = useDrop({
    accept: types,
    drop: (item, monitor) => {
      onDrop(item);
    },
    canDrop: canDrop,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className="droppableColumn"
      // className={`draggable-content ${
      //   isOver && !canDropHere ? 'no-drop' : ''
      // }`}
      style={{
        ...contentStyle,
        background: isOver ? 'rgba(51, 53, 86, 0.34)' : '#E6E8EC',
      }}
    >
      {children}
    </div>
  );
};

export default DraggableAreaComponent;
