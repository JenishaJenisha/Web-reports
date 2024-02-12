import React from 'react';
import { useDrag } from 'react-dnd';
import { Tooltip} from 'antd';
const SubmenuItem = ({ icon, label, chartType,id,}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SUBMENU_ITEM',
    item: {id, chartType:parseInt(chartType), },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const opacity = isDragging ? 0.4 : 1;
  
  return (
    <Tooltip title={label}>
      <div
        ref={drag}
        style={{
          cursor: 'move',
          opacity,
          border: isDragging ? '2px dashed red' : 'none',
        }}
      >
        {icon}
      </div>
      <div>
  
    </div>
    </Tooltip>
  );
};

export default SubmenuItem;