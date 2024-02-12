import React ,{useState}from 'react'
import {Form,Modal,Checkbox,Select} from 'antd'
import { setReportLayout, setPaperSize } from '../../Store/slices/chartSlice/chartSlice'
import {useSelector, useDispatch } from 'react-redux';

const { Option } = Select;
const Settings = ({ open, onCreate, onCancel }) => {
  const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { reportLayout, paperSize} = useSelector((state) => state.charts); 
   const [fullScreen,setFullscreen]=useState()
    // const reportLayout = useSelector((state) => state.charts.reportLayout); 
    // const paperSize = useSelector((state)=>state.charts.paperSize)
    // console.log(reportLayout,paperSize,"jjjjjjjjjjjj")
    const handleFormChange = (_, values) => {
      dispatch(setReportLayout(values['Report Layout']));
      dispatch(setPaperSize(values['Paper Size']));
      
    };
    const onChange = (e) => {
      // console.log(`checked = ${e.target.checked}`);
      setFullscreen(!fullScreen)
    };
   
  return (
    <>
      <Modal
        open={open}
        maskClosable={false}
        // title={<span><SettingOutlined />Page Configuration</span>}
        title="Page Configuration"
        okText="Save"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              // form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              // console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            'Report Layout': reportLayout, 
            'Paper Size': paperSize ,
            'fullScreen':fullScreen ,
          }}
          onValuesChange={handleFormChange}
        >
          <Form.Item
            name="Report Layout"
            label="Report Layout"
            rules={[
              {
                required: false,
                message: 'Please select the layout type!',
              },
            ]}
          >
             <Select placeholder="Select the layout" allowClear>
                <Option value="portrait">Portrait</Option>
                <Option value="landscape">Landscape</Option>
                
        </Select>
          </Form.Item>
          <Form.Item name="Paper Size" label="Paper Size">
          <Select placeholder="Select the size of the paper" allowClear>
          <Option value="legal">Legal</Option>
                <Option value="letter">Letter</Option>
                <Option value="tabloid">Tabloid</Option>
                <Option value="landscape">Landscape</Option>
                <Option value="A0">A0</Option>
                <Option value="A1">A1</Option>
                <Option value="A2">A2</Option>
                <Option value="A3">A3</Option>
                <Option value="A4">A4</Option>
                <Option value="A5">A5</Option>
                
        </Select>
          </Form.Item>
          <Form.Item name="fullScreen" className="collection-create-form_last-form-item">
            
          <Checkbox onChange={onChange} value="fullScreen">Auto height</Checkbox>

             
          </Form.Item>
        </Form>
      </Modal></>
  )
}

export default Settings;
