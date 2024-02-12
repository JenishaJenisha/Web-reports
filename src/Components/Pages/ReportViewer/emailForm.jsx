// EmailForm.js
import React, { useState } from 'react';
import {setRecipient,setSubject,setMessage,}  from '../../Store/slices/ScheduleReports/scheduleReportSlice';
import {Input,Button } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
const EmailForm = () => {
  // const [recipient, setRecipient] = useState('');
  // const [subject, setSubject] = useState('');
  // const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const send = useSelector((state)=>state.scheduledReport)
  const {recipient,subject,message} = send;

  const {Textarea}= Input
  
 

  return (
    <>
    
    <h2>Email Sender</h2>
      <label>
        Recipient:
        <Input type="email" value={recipient} onChange={(e) => dispatch(setRecipient(e.target.value))} />
      </label>
      <br />
      <label>
        Subject:
        <Input type="text" value={subject} onChange={(e) => dispatch(setSubject(e.target.value))} />
      </label>
      <br />
      <label>
        Message:
        <Input value={message} onChange={(e) => dispatch(setMessage(e.target.value))} />
      </label>
      <br />
     
    
      
    </>
  );
};

export default EmailForm;
