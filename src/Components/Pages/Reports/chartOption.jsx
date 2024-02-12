import React from "react";
import { Checkbox, Form, Input } from "antd";
const ChartOption = () => {
  return (
    <>
      <Form>
        <Form.Item name="chartTitle" label="Chart Title">
          <Checkbox />
          <Input />
        </Form.Item>
        <Form.Item name="xAxis" label="X-Axis">
          <Checkbox />
          <Input />
        </Form.Item>
        <Form.Item name="yAxis" label="Y-Axis">
          <Checkbox />
          <Input />
        </Form.Item>
        <Form.Item name="Rotate" label="Rotate">
          <Checkbox />
        </Form.Item>
        <Form.Item name="GridLine" label="GridLines">
          <Checkbox />
        </Form.Item>
        <Form.Item name="legent" label="Legent">
          <Checkbox />
        </Form.Item>
        <div>
        <Form.Item name="pointlabels" label="Point Labels">
          <Checkbox />
        </Form.Item>
        <Form.Item name="argument" label="Argument">
          <Checkbox />
        </Form.Item>
        <Form.Item name="seriesName" label="Series Name">
          <Checkbox />
        </Form.Item>
        <Form.Item name="value" label="Value">
          <Checkbox />
        </Form.Item>
        </div>
        <Form.Item name="roundoff" label="Value Roundoff">
          <Checkbox />
        </Form.Item>
        <Form.Item name="noOfDecimal" label="No Of Decimal">
          <Checkbox />
          <Input/>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChartOption;
