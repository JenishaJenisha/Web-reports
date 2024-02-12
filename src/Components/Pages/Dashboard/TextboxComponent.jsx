import React, { useState,useEffect,useRef } from 'react';
import{Input, Modal} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {setTextboxInput,setTextboxTop,setTextboxLeft,deletetextboxbyID} from '../../Store/slices/settingSlice/settingSlice.js';
import {ExclamationCircleFilled} from '@ant-design/icons'
import {setTextboxwidth,setTextboxheight,deletetemplatetextboxbyID} from '../../Store/slices/TemplateSlice/templateslice.js'
const { TextArea } = Input;
const { confirm } = Modal;
const TextBoxComponent = ({id,initialPosition,text,onChange }) => {
  console.log(initialPosition,"initialPosition")
  const dispatch = useDispatch();
 const [input,setInput]= useState(text||'')
 const droppedtextboxes =  useSelector((state)=>state.settings);
 const {headerTextboxes,footerTextboxes,detailTextboxes,detailReportTextboxes}= droppedtextboxes
const templatesdata = useSelector((state)=>state.templates);
const {selectedTempData,templates}= templatesdata
console.log("sele",selectedTempData)
  const handleheaderinput = (e) => {
    //  setInput(e.target.value)
   
    const newText = e.target.value;
    setInput(onChange(newText)); // Update local state
    // onChange(newText);
    dispatch(setTextboxInput(id,onChange(newText)))
  };
  
// const input = useSelector((state)=>state.settings.textboxInput) ;
  // drag the text box
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition ||{ x: 0, y: 0 });
  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);
  
  const handleMouseDown = (event) => {
    setIsDragging(true);
  
    const offsetX = event.clientX - position.x;
    const offsetY = event.clientY - position.y;

    const handleMouseMove = (event) => {
      if (isDragging === true) {
        const newX = event.clientX - offsetX;
        const newY = event.clientY - offsetY;
        setPosition({ x: newX, y: newY });
        dispatch(setTextboxTop(id,newY))
        dispatch(setTextboxLeft(id,newX))
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
  var resizedElement = document.getElementById(id);

  // Get the width and height
  var resizedWidth = resizedElement?.offsetWidth;
  var resizedHeight = resizedElement?.offsetHeight;
  // dispatch(setTextboxheight(resizedHeight));
  // dispatch(setTextboxwidth(resizedWidth));
  console.log('Resized Width:',"Resized Height", resizedWidth,resizedHeight);
  
  const handledelete = (id) => {
    confirm({
      title: 'Are you sure to delete this ?',
      icon: <ExclamationCircleFilled />,
     
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
       
      const deltextboxbyId = headerTextboxes.filter((deltextbox)=>deltextbox.id===id)||templates?.headerTextboxes.filter((deltextbox)=>deltextbox.id===id)||selectedTempData?.headerTextboxes.filter((deltextbox)=>deltextbox.id===id);
      const delfooterTextboxesbyId = footerTextboxes.filter((deltextbox)=>deltextbox.id===id)||templates?.footerTextboxes.filter((deltextbox)=>deltextbox.id===id)||selectedTempData?.footerTextboxes.filter((deltextbox)=>deltextbox.id===id);
      const deldetailTextboxesbyId = detailTextboxes.filter((deltextbox)=>deltextbox.id===id)||templates?.detailTextboxes.filter((deltextbox)=>deltextbox.id===id)||selectedTempData?.detailTextboxes.filter((deltextbox)=>deltextbox.id===id);
      const deldetailReportTextboxesbyId = detailReportTextboxes.filter((deltextbox)=>deltextbox.id===id)||templates?.detailReportTextboxes.filter((deltextbox)=>deltextbox.id===id)||selectedTempData?.detailReportTextboxes.filter((deltextbox)=>deltextbox.id===id);

      console.log(id,'OK',deltextboxbyId);
      if (deltextboxbyId.length>0||delfooterTextboxesbyId.length>0 || deldetailReportTextboxesbyId.length>0 || deldetailTextboxesbyId.length > 0){
        // const updatedtextbox =  (headerTextboxes||footerTextboxes||detailTextboxes||detailReportTextboxes).filter((deltextbox)=>deltextbox.id !==id);
        dispatch(deletetextboxbyID(id));
        dispatch(deletetemplatetextboxbyID(id));
      }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <>
     {/* <div id='dragabletextbox'
    //  className='dragabletextbox'
      style={{
        position: "relative",
        left: position.x,
        top: position.y,
        resize:"both",
        // width:resizedWidth,
        // height:resizedHeight,
        cursor: isDragging ? "move" : "se-resize",
       
      }}
      onMouseDown={handleMouseDown}
      
    > */}
    
       <TextArea 
       id={id}
    rows={2} 
    allowClear
    className="headerinput"
    style={{
      border:"0.3px solid gray",
    position: "relative",
    resize:"both",
      left: position.x,
      top: position.y,
      width:'auto',
      // width:resizedWidth,
      // height:resizedHeight,
      cursor: isDragging ? "move" : "se-resize",
  }}
    value={input}
    onChange={handleheaderinput}
   onDoubleClick={()=>handledelete(id)}
    onMouseDown={handleMouseDown}
    />
 
    {/* </div> */}
    </>
   
  );
};

export default TextBoxComponent;
