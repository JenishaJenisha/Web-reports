import React, { useState } from "react";

const DraggableContent = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Your content goes here */}
      <div style={{ width: "200px", height: "200px", backgroundColor: "lightblue" }}>
        Drag me!
      </div>
    </div>
  );
};

export default DraggableContent;
