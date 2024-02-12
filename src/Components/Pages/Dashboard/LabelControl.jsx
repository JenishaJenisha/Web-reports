import React, { useState,useEffect } from 'react';
import { DatePicker, Input, Select } from 'antd';
import './dashboard.scss';
const { Option } = Select;
const LabelComponent = ({initialPosition,id}) => {
  const [selectedFormat, setSelectedFormat] = useState('null');
  // const [inputValue, setInputValue] = useState('');
  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition ||{ x: 0, y: 0 });
  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);
  const handleFormatChange = (value) => {
    setSelectedFormat(value);
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
  
    const offsetX = event.clientX - position.x;
    const offsetY = event.clientY - position.y;

    const handleMouseMove = (event) => {
      if (isDragging) {
        const newX = event.clientX - offsetX;
        const newY = event.clientY - offsetY;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    
     document.addEventListener("mouseup", handleMouseUp);
  };
  const renderInputField = () => {
    switch (selectedFormat) {
      case 'date':
        return <DatePicker />;
      case 'pageNumber':
        // Logic to get current page number
        const pageNumber = 'Page 1'; 
        return <Input value={pageNumber} disabled className='lablepageinput'/>;
      case 'text':
        return <Input placeholder="Enter text" className='labletextinput'/>;
      default:
        return null;
    }
  };

  return (
    <div
    style={{
      position: "relative",
      left: position.x,
      top: position.y,
      cursor: isDragging ? "grabbing" : "grab",
          }}
    onMouseDown={handleMouseDown}
  >
        {/* <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          autoFocus
          placeholder='label1'
        />
       */}
        <div style={{ padding: 20 }}>
      <Select style={{ width: 200, marginBottom: 20 }} defaultValue="select format" onChange={handleFormatChange}>
        <Option value="text">Text</Option>
        <Option value="date">Date</Option>
        <Option value="pageNumber">Page Number</Option>
      </Select>
      {renderInputField()}
      
    </div> 
    </div>
  );
};

export default LabelComponent;
