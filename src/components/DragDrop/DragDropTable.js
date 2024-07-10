import React, { useState, useCallback, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const type = 'DragableBodyRow';

const DraggableRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  }, [index]);

  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }, [index]);

  drag(drop(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const DragDropTable = () => {
  const [data, setData] = useState([
    { key: '1', name: 'John Brown sr.', age: 60, address: 'India' },
    { key: '2', name: 'Jim Green sr.', age: 72, address: 'U.S.A' },
    { key: '3', name: 'Joe Black sr.', age: 93, address: 'U.K' },
    { key: '4', name: 'Jim Red sr.', age: 67, address: 'Germany' },
    { key: '5', name: 'Jake White sr.', age: 44, address: 'Germany' }
  ]);

  const moveRow = useCallback((dragIndex, hoverIndex) => {
    const dragRow = data[dragIndex];
    setData(update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    }));
  }, [data]);

  return (
    <DndProvider backend={HTML5Backend}>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <DraggableRow
              key={item.key}
              index={index}
              moveRow={moveRow}
              className="custom-row"
              style={{cursor: 'auto'}}
              {...item}
            >
              <td>{index+1} - {item.name}</td>
              <td>{item.age}</td>
              <td>{item.address}</td>
            </DraggableRow>
          ))}
        </tbody>
      </table>
    </DndProvider>
  );
};

export default DragDropTable;
