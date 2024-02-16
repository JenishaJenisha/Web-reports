import React,{useState} from 'react'
import { Button, Checkbox, Form, Input, Radio, Drawer, Select, TimePicker,DatePicker } from "antd";
import {SwapOutlined} from '@ant-design/icons';
import {setSwapColumn} from '../../Store/slices/ReportSlice/reportslice';
import { useDispatch,useSelector } from 'react-redux';
import { BOKEH_SERVER_URL,BOKEH_SERVER_URL_ENDPOINTS } from "../../Config/config";

const OptionForm = () => {
  const dispatch = useDispatch();
  const swapColumn = useSelector((state)=>state.reports.swapColumn)
    const {Option}=Select;
    const onFinish = (values) => {
        console.log("Success:", values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };
      const [form] = Form.useForm();

      const [horizontalColumn, setHorizontalColumn] = useState('Tags');
      const [verticalColumn, setVerticalColumn] = useState('Time');
      const [isTransposed,setIsTransposed] = useState('false');
    
      const handleSwapColumns = () => {
        const temp = horizontalColumn;
        setHorizontalColumn(verticalColumn);
        setVerticalColumn(temp);
        handleSwapColumnsChange()
        dispatch(setSwapColumn(!swapColumn));
      };
      const handleSwapColumnsChange = async () => {
        try {
            const response = await fetch(`${BOKEH_SERVER_URL}${BOKEH_SERVER_URL_ENDPOINTS.swapColumn.url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ horizontalColumn: verticalColumn,verticalColumn:horizontalColumn,is_transposed: true,}),
            });
      
            if (!response.ok) {
                // Handle server error
                throw new Error('Server error');
            }
      
            const data = await response.json(); 
      
            // Handle the response from the server if needed
      
            console.log('Server response:', data);
        } catch (error) {
            console.error('Error:', error.message);
        }
      };
  return (
  <>
   <Form form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        
        <Form.Item label="Horizontal Column">
        <div className="swapdiv">{horizontalColumn}</div>
      </Form.Item>
      <div className='swapicon'>
      <SwapOutlined onClick={handleSwapColumns} style={{ fontSize: '26px', cursor: 'pointer' , transform: 'rotate(90deg)',color:'rgba(0, 0, 0, 0.45)'}} />
      </div>
     
      <Form.Item label="Vertical Column">
        <div className="swapdiv">{verticalColumn}</div>
      </Form.Item>
      
      {/* <Form.Item name="verticalColumn" label="Vertical Column">
      <div>Time</div>
      </Form.Item> */}
<Form.Item name="showheader" label="Show Header" valuePropName="checked"> 
   <Checkbox value="Tags">Tags</Checkbox>
    <Checkbox  value="Time">Time</Checkbox>
</Form.Item>
      </Form>
      <Form.Item name="showquality" label="Show Quality" valuePropName="checked">
        <Checkbox value="showquality"/>
      </Form.Item> 
      <Form.Item name="showtitle" label="Show Title">
        <Input placeholder='Enter Table Title'></Input>
      </Form.Item>
      
      <Form.Item name="bandedrows" label="Banded Rows"valuePropName="checked">
        <Checkbox value="bandedrows"/>
      </Form.Item>
      <Form.Item name="columnWidthMode" label="Column Width Mode">
        <Radio>Auto Fit</Radio>
        <Radio>Manual</Radio>
      </Form.Item>
      
  </>
  )
}

export default OptionForm