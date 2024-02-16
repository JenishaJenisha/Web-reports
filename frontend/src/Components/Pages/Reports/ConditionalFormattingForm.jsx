import React,{useState,useEffect} from 'react'
import { MinusCircleOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio,Popover,ColorPicker, Select} from 'antd';
import equalicon from '../../../Assets/ConditionalIcons/Equal_icon.svg';
import notemptyicon from '../../../Assets/ConditionalIcons/notempty.svg';
import greatericon from '../../../Assets/ConditionalIcons/greater.svg';
import lessthenicon from '../../../Assets/ConditionalIcons/lessthan.svg';
import IconsetContent from './IconsetContent';
import { useDispatch, useSelector } from 'react-redux';
import {setFormatConditions,setDeleteformatcondition,setFormatConditionEdit,setTableTextFormat} from '../../Store/slices/ReportSlice/reportslice';
import texticon from '../../../Assets/ConditionalIcons/texticon.svg';
import painticon from '../../../Assets/ConditionalIcons/painticon.svg';
import boldicon from '../../../Assets/ConditionalIcons/Boldicon.svg';
import italicicon from '../../../Assets/ConditionalIcons/Italicicon.svg';
import underlineicon from '../../../Assets/ConditionalIcons/underlineicon.svg';
import axios from 'axios';
import { BOKEH_SERVER_URL,BOKEH_SERVER_URL_ENDPOINTS} from '../../Config/config';
export const ConditionalForm=({ id,initialValues,onFinish})=>{
  
  const [selectedCondition, setSelectedCondition] = useState(null);
  const {Option}= Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [conditionType, setConditionType] = useState(null);
  const [isExpression, setIsExpression] = useState(false);
const[isconditionType,setIsconditionType]= useState(false);
const reporttable = useSelector((state)=>state.reports)
const {tabledata,tableTextFormat} = reporttable
  const onChange = (e) => {
    const selectedType = e.target.value;
    setConditionType(selectedType);
    setIsExpression(e.target.value === 2);
    setIsconditionType(e.target.value ===1);
    if (selectedType === 1) {
      setPopoverVisible(true);
    } else {
      setPopoverVisible(false);
    }
  };



  const valueConditions = [
    { label: 'Equal To', value: 'equalTo', icon: <img src={equalicon} alt='=' height="25px" width='20px'/> },
    { label: 'Not Empty',value: 'notEmpty', icon: <img src={notemptyicon} alt='not empty' height="20px" width='20px'/> },
    { label: 'Greater Than',value: 'greaterThan', icon: <img src={greatericon} alt='>' height="25px" width='20px'/> },
    { label: 'Less Than',value: 'lessThan', icon: <img src={lessthenicon} alt='<' height="30px" width='25px' style={{marginTop: "-13px",marginLeft: "-6px"}}/>},
  ]; 

  const handleConditionSelect = (selectedCondition) => {
    const condition={
      "selectedcondtionFormat":selectedCondition
    }
    console.log(selectedCondition,"selectedCondition")
    setSelectedCondition(condition)
      setPopoverVisible(false);
      
      // try {
      //   const response = await fetch('http://localhost:5000/valueCondition', {
      //       method: 'POST',
      //       headers: {
      //           'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ selectedCondition: condition}),
      //   });
  
      //   if (!response.ok) {
      //       // Handle server error
      //       throw new Error('Server error');
      //   }
  
      //   const data = await response.json();
  
      //   // Handle the response from the server if needed
  
      //   console.log('Server response selectedCondition:', data);
      // } catch (error) {
      //   console.error('Error:', error.message);
      // } 
    };
const handleConditions=()=>{
  form
          .validateFields()
          .then((values) => {
            form.resetFields();
            dispatch(setFormatConditions(values))
            handleFormattingfieldChange(values)
            // console.log(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
           
}

const handleFormattingfieldChange = async (formatconditions) => {
  const condition={
    "formatconditionsList":formatconditions,
    "valueCondition":selectedCondition,
    "conditionalOutput":tableTextFormat,
    "tabledata":tabledata,
  }
  try {
      const response = await fetch(`${BOKEH_SERVER_URL}${BOKEH_SERVER_URL_ENDPOINTS.formatconditions.url}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formatconditions: condition}),
      });

      if (!response.ok) {
          // Handle server error
          throw new Error('Server error');
      }

      const data = await response.json();

      // Handle the response from the server if needed

      // console.log('Server response:', data);
      return data;
  } catch (error) {
      console.error('Error:', error.message);
  }
  // axios.post('http://localhost:50000/formatconditions', 'save_clicked')
  //         .then(response => {
  //             console.log(response.data,"***res data");
  //         })  
  //         .catch(error => {
  //             console.error('Error sending request:', error);
  //         });        
};

const Textformatingcontent=()=>{
  const [selectedIcons, setSelectedIcons] = useState({
    bold: false,
    italic: false,
    underline: false,
    textcolor:false,
    backgroundcolor:false,
  });
  
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);


const toggleIcon = (icon) => {
  setSelectedIcons((prevIcons) => {
    const updatedIcons = {
      ...prevIcons,
      [icon]: !prevIcons[icon],
    };

    // Call handleFormChange with the updated icons
    handleFormChange(updatedIcons);

    return updatedIcons;
  });
  // console.log(selectedIcons, "selectedicons");
};
// const formatconditionslist = useSelector((state)=>state.reports.formatconditions);
// console.log(formatconditionslist,"formatconditionslistformatconditionslistformatconditionslist")
const handleFormChange = async (selectedIcons) => {
  dispatch(setTableTextFormat(selectedIcons))
  // try {
  //     const response = await fetch('http://localhost:5000/update_tableTextFormat', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ selectedStyle: selectedIcons}),
  //     });

  //     if (!response.ok) {
  //         // Handle server error
  //         throw new Error('Server error');
  //     }

  //     const data = await response.json();

  //     // Handle the response from the server if needed

  //     // console.log('Server response:', data);
  // } catch (error) {
  //     console.error('Error:', error.message);
  // }
};
const [selectedColor, setSelectedColor] = useState(''); 
const [selectedBgColor,setSelectedBgColor] = useState();
// console.log(selectedColor,"selectedColor")
  const handleColorChange =async (color) => {
     const setColor = color.toRgbString()
    setSelectedColor(setColor);
    // console.log(color.toString(),color.toRgbString(),"selectedColor string>>>")
    try {
      const response = await fetch(`${BOKEH_SERVER_URL}${BOKEH_SERVER_URL_ENDPOINTS.updatetableLetterColor.url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedColor: setColor }),
      });

      if (!response.ok) {
        throw new Error('Failed to update color on the server');
      }

      // console.log('Color updated successfully');
    } catch (error) {
      console.error('Error updating color on the server:', error);
    }
  }
const handletablebgcolor= async(bgcolor)=>{
      const setbgColor = bgcolor.toRgbString()
      setSelectedBgColor(setbgColor);
      // console.log(bgcolor.toRgbString(),"selectedbgColor string>>>")
      try {
        const response = await fetch(`${BOKEH_SERVER_URL}${BOKEH_SERVER_URL_ENDPOINTS.updatetablebgColor.url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedbgColor: setbgColor }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update color on the server');
        }
  
        // console.log('Color updated successfully');
      } catch (error) {
        console.error('Error updating color on the server:', error);
      }
}
  
  return(
    <>
   <div className='textformatingiconslist'>
   <div
        className={`textformatingiconbtn ${selectedIcons.bold ? 'selected' : ''}`}
        onClick={() => toggleIcon('bold')}
      >
        <img src={boldicon} alt='' height='20px' width='20px' />
      </div>
      <div
        className={`textformatingiconbtn ${selectedIcons.italic ? 'selected' : ''}`}
        onClick={() => toggleIcon('italic')}
      >
        <img src={italicicon} alt='' height='20px' width='20px' />
      </div>
      <div
        className={`textformatingiconbtn ${selectedIcons.underline ? 'selected' : ''}`}
        onClick={() => toggleIcon('underline')}
      >
        <img src={underlineicon} alt='' height='20px' width='20px' />
      </div>
    <ColorPicker presets={[
        {
          label: 'Recommended',
          colors: [
            '#000000',
            '#000000E0',
            '#000000A6',
            '#00000073',
            '#00000040',
            '#00000026',
            '#0000001A',
            '#00000012',
            '#0000000A',
            '#00000005',
            '#F5222D',
            '#FA8C16',
            '#FADB14',
            '#8BBB11',
            '#52C41A',
            '#13A8A8',
            '#1677FF',
            '#2F54EB',
            '#722ED1',
            '#EB2F96',
            '#F5222D4D',
            '#FA8C164D',
            '#FADB144D',
            '#8BBB114D',
            '#52C41A4D',
            '#13A8A84D',
            '#1677FF4D',
            '#2F54EB4D',
            '#722ED14D',
            '#EB2F964D',
          ],
        },
      
      ]}
      value={selectedColor}
      onChange={(e)=>handleColorChange(e.metaColor)}
      // onChange={e=>setSelectedColor(e.metaColor)}
      >
    <div className={`textformatingiconbtn ${selectedIcons.textcolor ? 'selected' : ''}`} onClick={() => toggleIcon('textcolor')}><img src={texticon} alt='' height='20px' width="20px"/></div>
    </ColorPicker>
    <ColorPicker presets={[
        {
          label: 'Recommended',
          colors: [
            '#000000',
            '#000000E0',
            '#000000A6',
            '#00000073',
            '#00000040',
            '#00000026',
            '#0000001A',
            '#00000012',
            '#0000000A',
            '#00000005',
            '#F5222D',
            '#FA8C16',
            '#FADB14',
            '#8BBB11',
            '#52C41A',
            '#13A8A8',
            '#1677FF',
            '#2F54EB',
            '#722ED1',
            '#EB2F96',
            '#F5222D4D',
            '#FA8C164D',
            '#FADB144D',
            '#8BBB114D',
            '#52C41A4D',
            '#13A8A84D',
            '#1677FF4D',
            '#2F54EB4D',
            '#722ED14D',
            '#EB2F964D',
          ],
        },
      
      ]}
      value= {selectedBgColor}
      onChange={(e)=>handletablebgcolor(e.metaColor)}><div className={`textformatingiconbtn ${selectedIcons.backgroundcolor ? 'selected' : ''}`} onClick={() => toggleIcon('textcolor')}> <img src={painticon} alt=''  height='20px' width="20px"/></div>
   </ColorPicker>
   </div>
   
    </>
  )

}
const items = useSelector((state)=>state.charts.columnName)
  const [searchTerm, setSearchTerm] = useState('');
  return(
    <>
        <Form  form={form} initialValues={initialValues} id={id} onFinish={(values) => onFinish(values, id)}>
                <h4>Condition Column</h4>
                <Form.Item name="conditionColumn" >
                <Select
          showSearch
          placeholder="Select Condition Column"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {items
            .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
        </Select>
                </Form.Item>    
                <h4>Apply Column</h4>
                <Form.Item name="ApplyColumn">
                <Select
          showSearch
          placeholder="Select Apply Column"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {items
            .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
        </Select>
                </Form.Item>
                <h4>Condition Type</h4>
                <Form.Item name="Condition Type" >
                <Radio.Group onChange={onChange} value={conditionType}>
                <Popover
        title="Select Condition"
        content={
          <>
          <div >
            {valueConditions.map(({label,value,icon}) => (
                <div  key={value} style={{ textAlign: 'left', background: selectedCondition === value ? '#d9f2f6' : 'white', }} onClick={()=>handleConditionSelect(value)} icon={icon}className='conditionslist'>{icon}&nbsp;&nbsp;  {label}</div>
            ))}
          </div></>
          
        }
        trigger="click"
        open={popoverVisible && conditionType === 1}
        onOpenChange={(visible) => setPopoverVisible(visible)}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
        <Radio name="conditionValue" value={1}>Value</Radio>
     {/* <Input type="text" disabled={!isconditionType}/> */}
        </div>
        </Popover>
    
      <Radio name="expression" value={2}>Expression</Radio>
      <Input
        placeholder="Enter Value"
        disabled={!isExpression} 
      />
    </Radio.Group>
                </Form.Item>
 
                <h4>Condition Output</h4>
                <Form.Item name="textFormatting">
                  <Popover trigger={'click'} content={Textformatingcontent}>
                  <Button className='iconsetbtn'>Text Formatting </Button>
                  </Popover>
                </Form.Item>
                <Form.Item name="iconselection" >
                  <Popover trigger={'click'} content={<IconsetContent/>}>
                  <Button className='iconsetbtn'>Icon Set </Button>
                  </Popover>
                </Form.Item>
                <Form.Item name="aliasName" label="Alias Name">
                  <Input/>
                </Form.Item>
                <Button type='submit' onClick={handleConditions}>Save</Button>
              </Form>
    </>
  )
}
const ConditionalFormattingForm = () => {
  const formatconditionslist = useSelector((state)=>state.reports.formatconditions);
  const editformatcondition = useSelector((state)=>state.reports.editformatcondition);
  const dispatch = useDispatch()
  // console.log(formatconditionslist,"formatconditionslist")
  
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 20,
            offset: 4,
          },
        },
      };
      const onFinish = (values) => {
        console.log('Received values of form:', values);
      };
     
     
      const handledeletecondition=(index)=>{
        dispatch(setDeleteformatcondition(index))
        // console.log(index,"condition deleted")
      }
      const handleEditCondition=(index)=>{
        const conditionsByIndex = formatconditionslist[index];
        console.log(conditionsByIndex,"conditionsByIndex");
        dispatch(setFormatConditionEdit(conditionsByIndex))
        // dispatch(setFormatConditionEdit({index,conditionsByIndex}))
        console.log(index," edit condition index");
      }
      
  return (
    <>
      <Form
      name="conditionalformatting_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      style={{
        maxWidth: 600, 
      }}
      initialValues={{
        remember: true,
      }}
    >
      <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('add'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            <Form.Item>
              <Popover placement='right'  content={<ConditionalForm />} trigger="click" title="Conditional Formatting" >
              <Button
                type="dashed" 
                style={{
                  width: '60%',
                }}
                icon={<PlusOutlined />}
              >
                Add
              </Button>
              </Popover>
              {formatconditionslist.map((condition,index)=>{
                
                return(
                  <>
                  <div key={index} className='conditionlist'>
                    <div>{`Format condition ${index + 1}`} </div>
                    <div className='editcondition'>
                      <Popover placement='right'  content={<ConditionalForm initialValues={editformatcondition}  />} trigger="click" title="Edit Conditional Formatting">
                      <EditOutlined onClick={(e)=>handleEditCondition(index)}/>
                        </Popover> </div>
<div> <DeleteOutlined onClick={(e)=>handledeletecondition(index)}/></div>
                    
                </div>
              
                </>
                  
                )
              
              })}
            
              <Form.ErrorList errors={errors} />
            </Form.Item>
            {fields.map((field, index) => (
              <Form.Item
                required={false}
                key={field.key}
              >
                
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
          
          </>
        )}
      </Form.List>
     
    </Form>
    </>
  )
}

export default ConditionalFormattingForm