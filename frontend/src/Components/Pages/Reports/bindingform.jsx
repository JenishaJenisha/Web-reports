import React, { useState,useEffect } from "react";
import { Button, Checkbox, Form, Radio, Select, TimePicker,Popover } from "antd";
import { DeleteOutlined,EditOutlined,} from '@ant-design/icons';
import {setAddPointPopover, setAddingPoints,setDeleteaddpoint,setselectedTagtoEdit,setUpdateAddingPoint} from "../../Store/slices/ReportSlice/reportslice";
import {useDispatch, useSelector} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Durationcontent from './durationContentForm';
const {Option}=Select;
export const AddPoints=({ id,initialValues, onFinish,onFormValuesChange  })=>{
  const items = useSelector((state)=>state.charts.columnName)
  console.log(id,initialValues, onFinish ,'id,initialValues, onFinish ')
  const [searchTerm, setSearchTerm] = useState('');
  const [addpointform] = Form.useForm();
 const dispatch = useDispatch();
  useEffect(() => {
    addpointform.setFieldsValue(initialValues);
  }, [initialValues, addpointform]);
  const handleSearch=(value)=>{
    setSearchTerm(value);
  }
  // const items = [
  //   "Tag1",
  //   "Tag2",
  //   "Tag3",
  //   "Tag4",
  //   "Tag5",
  //   "Tag6",
  //   "Tag7",
  //   "Tag8",
  //   "Tag9",
  //   "Tag10",
  // ];
  const editedchanges=()=>{
    console.log("rfvwervwerv")
  }
  const handleFormValuesChange = (changedValues, allValues) => {
    // Dispatch an action or call a function to handle form values change
    const newval=allValues;
    console.log(newval,changedValues,"newval,changedValues")
    dispatch(setUpdateAddingPoint(newval))
  };
  return(<>
   <Form name="AddPoints" 
   className="addpointform"
   form={addpointform} 
   onFinish={(values) => onFinish(values, id)}
    initialValues={initialValues} id={id}
   onValuesChange={handleFormValuesChange} >
  <Form.Item name={"tag"}>

  <Select
          showSearch
          placeholder="Select Tag"
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
  <h4>Operation</h4>
  <Form.Item  name="operations">
    <Select placeholder="Select" mode="multiple">
     <Checkbox value="Raw Data">Raw Data</Checkbox>
     <Checkbox value="Average">Average</Checkbox>
     <Checkbox value="Minimum">Minimum</Checkbox>
    </Select>
    {/* <input type="color"></input> */}
</Form.Item>
<Button htmlType="submit" onClick={editedchanges}>
        Save
      </Button>
</Form>
  </>)
 
}

const Bindingform = () => {
  const dispatch = useDispatch();
  const addingpointslist= useSelector((state)=>state.reports);
  const{addingpoints,addPointPopover,selectedTagtoEdit } =addingpointslist;
  console.log(addingpoints,addPointPopover,"add point",selectedTagtoEdit )
  const [showColumnType, setShowColumnType] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  const handleCheckboxChange = (checkedValues) => {
    const isValueChecked = checkedValues.includes('Value');
    const isBarChecked = checkedValues.includes('Bar');
    setShowColumnType(isValueChecked && isBarChecked);
  };
  const handleFinishCreate = (values) => {
    const newPoint = {
      id: `${uuidv4()}addingpoints`,
      tag: values.tag,
      operations: values.operations,
    };
    console.log("Form values for creating:", values, newPoint);
    dispatch(setAddingPoints(newPoint));
  };
  const handleEdit = (tagId) => {
    console.log(tagId,"tagid")
    dispatch(setAddPointPopover(true))
    // dispatch(setselectedTagtoEdit(tag))
    // const pointToEdit = addingpoints.find((point) => point.id === tagId);
    const selectedPoints = addingpoints?.filter((point) => point.id === tagId);
    console.log("Edit:", addingpoints,tagId,"addPointPopover",selectedPoints,"selectedPoints");
    const indexToEdit = addingpoints?.findIndex((point) => point.id === tagId);
console.log(indexToEdit,"indexToEditindexToEdit")
    if (indexToEdit !== -1) {
    
      const pointToEdit = addingpoints[indexToEdit];
      dispatch(setselectedTagtoEdit(tagId))
      console.log("Point to edit:", pointToEdit);
    
     
    } else {
      // The object with the specified id was not found in the array
      console.log("Object not found");
    }
  };
 
  
  const handleDelete = (tag) => {
    const index = addingpoints?.findIndex(item => item.tag === tag);
  console.log(index,"index")
    if (index !== -1) {
    const updatedPoints = [...addingpoints.slice(0, index), ...addingpoints.slice(index + 1)];
      console.log("Delete:", tag,updatedPoints);
      dispatch(setDeleteaddpoint(tag));
    }
  };
  const openPopover=()=>{
    dispatch(setAddPointPopover(true))
  }
 

// const handleFinishEdit = (tagid) => {
//   const editedPointIndex = addingpoints.findIndex((point) => point.id === tagid);
//   if (editedPointIndex !== -1) {
//     dispatch(setselectedTagtoEdit(editedPointIndex));
    
//  const editedpoint = addingpoints[editedPointIndex] 
//  console.log(editedpoint,"editedpoint")
//   }
// }

// const handleFinishEdit = (values, id) => {
//   if (selectedTagtoEdit !== null) {
//     // Editing an existing point
//     const editedPointIndex = addingpoints.findIndex(
//       (point) => point.id === selectedTagtoEdit
//     );

//     if (editedPointIndex !== -1) {
//       dispatch(setAddingPoints({ ...values, id: selectedTagtoEdit }));
//       // Optionally, clear the selectedTagtoEdit after editing
//       dispatch(setselectedTagtoEdit(null));
//     }
//   } else {
//     // Creating a new point
//     const newPoint = {
//       id: uuidv4() + id,
//       tag: values.tag,
//       operations: values.operations,
//     };
//     dispatch(setAddingPoints(newPoint));
//   }
// };
  return (
    <>
    <div className="bindingFormgrid">
    <Form
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
        <h5>Points</h5>
        <Form.Item name="points">
        {/* <Button className="drawerbtn"  onClick={openPopover}>Add Point</Button> */}
         <Popover  title="Add Point" placement="right" content={<AddPoints onFinish={handleFinishCreate} />}trigger={"click"}> 
          <Button className="drawerbtn" >Add Point</Button>
        </Popover>
        
        </Form.Item>
        {addingpoints?.map((data, index) => (
            <div key={data.id}>
              <Form.Item name={data.tag}>
                <div className="tagcontainer">
                  {data.tag}
                  <div className="tagcontrolicon">
                  
                    {/* Open popover by tag */}
                     <Popover key={data.id} id={data.id} 
                     title="Edit Point"
                      placement="right"
                       content={<AddPoints 
                       id={data.id} 
                       initialValues={data} 
                      //  onFinish = handleFinishEdit(data.id)
                      //  onFinish={(values, id) => handleFinishEdit(values, id)}
                       />
                       }trigger={"click"}> 
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                         onClick={() => handleEdit(data.id)}
                      />
                      </Popover>
                      <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() =>  handleDelete(data.tag)}
                      />
                  </div>
                </div>
                <div className="tagcontainer">
                {data.operations?.map((operation, opIndex) => (
                  <div key={opIndex} className="tagcontainer">
                    {operation}
                  </div>
                ))}
              </div>
              </Form.Item>
              
             
            </div>
          ))}

        <h5>Duration</h5>
        <Form.Item name="duration">
          <Popover title="Set Duration" placement="right" content={<Durationcontent/>} trigger={"click"}>  
          <Button  className="drawerbtn">set Duration</Button>
          </Popover>
        
        </Form.Item>

        <h5>Show Type</h5>
        <Form.Item name="showtype" valuePropName="checked" className="displaytype">
        <Checkbox.Group onChange={handleCheckboxChange}>
          <Checkbox value="Value">Value</Checkbox>
          
          <Checkbox value="Bar">Bar</Checkbox>
        
        </Checkbox.Group>
      </Form.Item>

      {showColumnType && (
        <Form.Item name="columntype" className="columntype">
          <Radio.Group>
            <Radio value="Seperate Column">Seperate Column</Radio>
            <Radio value="Same Column">Same Column</Radio>
          </Radio.Group>
        </Form.Item>
      )}
      </Form>
    </div>
     
    </>
  );
};

export default Bindingform;
