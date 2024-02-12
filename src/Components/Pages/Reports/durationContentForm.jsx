import React, { useState, } from "react";
import {  Checkbox, Form, Input, Select, TimePicker } from "antd";

const {Option}=Select;
const Durationcontent = () => {
    const [durationType, setDurationType] = useState(null);
    const [enableSlidingTime, setEnableSlidingTime] = useState(false);
    const [enableSlidingDay, setEnableSlidingDay] = useState(false);
    const [enableSlidingMonth, setEnableSlidingMonth] = useState(false);
    const handleDurationTypeChange = (value) => {
      setDurationType(value);
    };
    const handleCheckboxChange = (checked, type) => {
      switch (type) {
        case "slidingTime":
          setEnableSlidingTime(checked);
          break;
        case "slidingDay":
          setEnableSlidingDay(checked);
          break;
        case "slidingMonth":
          setEnableSlidingMonth(checked);
          break;
        default:
          break;
      }
    };
  return (
    <>
      <Form name="Duration Type">
              <h5>Duration Type</h5>
              <Form.Item name="selectdurationType">
                <Select placeholder="Select Duration" onChange={handleDurationTypeChange}>
                <Option value="Minute">Minute</Option>
          <Option value="Hour">Hour</Option>
          <Option value="Day">Day</Option>
          <Option value="Week">Week</Option>
          <Option value="Month">Month</Option>
          <Option value="Year">Year</Option>
                </Select>
                
              </Form.Item>
              <Form.Item name="DurationTypeValue">
              <Input placeholder="Enter Value"></Input>
              </Form.Item>
              <h5>Interval Type</h5>
              <Form.Item name="intervalType">
                <Select placeholder="Select Interval Type">
                {durationType === "Hour" && (
            <>
              <Option value="Minute">Minute</Option>
              <Option value="Hour">Hour</Option>
            </>
          )}
          {durationType === "Day" && (
            <>
             <Option value="Minute">Minute</Option>
              <Option value="Hour">Hour</Option>
              <Option value="Minute">Day</Option>
            </>
          )}
           {durationType === "Week" && (
            <>
              <Option value="Minute"></Option>
                  <Option value="Hour"></Option>
                  <Option value="Day"></Option>
                  <Option value="Week"></Option>
            </>
          )}
          {durationType === "Month" && (
            <>
             <Option value="Minute"></Option>
             <Option value="Hour"></Option>
                  <Option value="Day"></Option>
                  <Option value="Week"></Option>
                  <Option value="Month"></Option>
            </>
          )}
            {durationType === "Year" && (
            <>
            <Option value="Minute"></Option>
                  <Option value="Hour"></Option>
                  <Option value="Day"></Option>
                  <Option value="Week"></Option>
                  <Option value="Month"></Option>
                  <Option value="Year"></Option>
            </>
          )}
                
                </Select>
              </Form.Item>
              <Form.Item name="IntervalTypeValue">
              <Input placeholder="Enter Value"></Input>
              </Form.Item>
              <div style={{display:"flex",gap:'4px'}}><Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, "slidingTime")}/><h5>Sliding Time</h5></div>
              <Form.Item name="slidingTime">
        <TimePicker disabled={!enableSlidingTime} />
      </Form.Item>
              <div style={{display:"flex",gap:'4px'}}><Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, "slidingDay")}/><h5>Sliding Day</h5></div>
              <Form.Item  name="slidingDay">
                <Select placeholder="Select Day" disabled={!enableSlidingDay}>
                  <Option value="Sunday"></Option>
                  <Option value="Monday"></Option>
                  <Option value="Tuesday"></Option>
                  <Option value="Wednesday"></Option>
                  <Option value="Thursday"></Option>
                  <Option value="Friday"></Option>
                  <Option value="Saturday"></Option>
                </Select>
              </Form.Item>
              <div style={{display:"flex",gap:'4px'}}><Checkbox  onChange={(e) =>handleCheckboxChange(e.target.checked, "slidingMonth")}/><h5>Sliding Month</h5></div>
              
              <Form.Item  name="slidingMonth" >
                <Select  placeholder="Select Month" disabled={!enableSlidingMonth}>
                  <Option value="January"></Option>
                  <Option value="February"></Option>
                  <Option value="March"></Option>
                  <Option value="April"></Option>
                  <Option value="May"></Option>
                  <Option value="June"></Option>
                  <Option value="July"></Option>
                  <Option value="August"></Option>
                  <Option value="September"></Option>
                  <Option value="Octobar"></Option>
                  <Option value="November"></Option>
                  <Option value="December"></Option>
                </Select>
                
              </Form.Item>
            </Form>
    </>
  )
}

export default Durationcontent