import React, { useState,useEffect } from "react";
import {Space,Button,Form,Input,Modal,Radio,Table,Checkbox,Select,TimePicker,Empty,} from "antd";
import {EditOutlined,DeleteOutlined,PlusCircleOutlined,} from "@ant-design/icons";
import "./dataset.scss";
import Search from "antd/es/input/Search";
import {setDatasetList,setDataseteditform,setTagModalOpen,setDatasetformopen,setDeletedatasetbyId,setdatasetaddTag,setEditdatasetbyid,setEditDatasetList,
} from "../../Store/slices/datasetSlice/datasetslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const CollectionCreateForm = ({ id,initialValues,open, onCreate, onCancel }) => {
  console.log(initialValues,"initialValues")
  const [radioValue, setRadioValue] = useState();
  const [realhistorical,setRealhistorical] = useState();
  const [isManual, setIsManual] = useState(false);
  const [isTagmaster, setIsTagmaster] = useState(false);
  const [ishistorical, setIsHistorical] = useState(false);
  const [durationType, setDurationType] = useState(null);
  const [enableSlidingTime, setEnableSlidingTime] = useState(false);
  const [enableSlidingDay, setEnableSlidingDay] = useState(false);
  const [tableValue,setTablevalue] = useState([])
  const [enableSlidingMonth, setEnableSlidingMonth] = useState(false);
  const datasetreport = useSelector((state) => state.datasets);
  const { tagmodalOpen, dataseteditform ,datasetaddTag,editdatasetList,editdatasetbyid} = datasetreport;
  console.log(datasetaddTag,"datasetaddTag")
  const [datasetmodalform] = Form.useForm();
 const [tagmodalform] = Form.useForm();
//  useEffect(()=>{
//   datasetmodalform.setFieldsValue(initialValue)
//   // datasetmodalform.setFieldsValue({
//   //   datasetName: initialValues.datasetname.datasetName,
//   //   // Other fields...
//   // });
//  },[initialValue,datasetmodalform])
  const dispatch = useDispatch();
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: {span: 24,},
      sm: {span: 24,},
    },
    wrapperCol: {
      xs: {span: 24,},
      sm: {span: 24,},
    },
  };
  

useEffect(() => {
  if (Array.isArray(datasetaddTag)) {
    setTablevalue(
      datasetaddTag.map((data, index) => ({
        key: index + 1,
        tagname: data.values.tagName,
        realTime: <Checkbox />,
        Historical: <Checkbox />,
        RangeLow: data.values.rangelow,
        RangeHigh: data.values.rangeHigh,
        Aggregate: data.values.aggregate,
        DurationType: data.values.durationType,
        IntervalType: data.values.intervalType,
        id:data.id,
      }))
    );
  } else {
    console.error("datasetaddTag is not an array");
  }
}, [datasetaddTag]);
 
const deltag=(data)=>{
  console.log(data,"ifffffffffffff")
  const index =tableValue.findIndex(item=>item.id === data.id);
  if(index !==-1){
    console.log(index,"ooooo")
    tableValue.splice(index,1);
    setTablevalue([...tableValue]);

  }

}
const edittag=(data)=>{
console.log("tag edit",data)
dispatch(setTagModalOpen(true))
}
  
  // Now, dataSource contains the information from all items in datasetaddTag.values
  console.log(tableValue,"datasource");
  const columns = [
    {
      title: "Tag Name",
      dataIndex: "tagname",
      key: "tagname",
    },
    {
      title: "Real Time",
      dataIndex: "realTime",
      key: "realTime",
    },
    {
      title: "Historical",
      dataIndex: "Historical",
      key: "Historical",
    },
    {
      title: "Range Low",
      dataIndex: "RangeLow", 
      key: "RangeLow",
    },
    {
      title: "Range High",
      dataIndex: "RangeHigh",
      key: "RangeHigh",
    },
    {
      title: "Aggregate",
      dataIndex: "Aggregate",
      key: "Aggregate",
    },
    {
      title: "Duration Type",
      dataIndex: "DurationType",
      key: "DurationType",
    },
    {
      title: "Interval Type",
      dataIndex: "IntervalType",
      key: "IntervalType",
    },
    {
      title: "Edit/Delete",
      render: (id) => (
        <Space size="middle">
          <EditOutlined onClick={()=>edittag(id)}/>
          <DeleteOutlined onClick={()=>deltag(id)} />
        </Space>
      ),
      key: "editordelete",
    },
  ];

  const addTagdataset = () => {
    dispatch(setTagModalOpen(true));
  };
 
  const onradiobtnChange = (e) => {
    console.log("radio checked", e.target.value);
    setRadioValue(e.target.value);
    setIsManual(e.target.value === "Manual");
    setIsTagmaster(e.target.value === "TagMaster");
   
  };
  const onradiobtnrealtimeChange=(e)=>{
    setRealhistorical(e.target.value);
    setIsHistorical(e.target.value === "Historical");
  }
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
  const [, forceUpdate] = useState();
  // useEffect(() => {
  //   console.log("Initial Values from useeffect:", initialValues);
  //   console.log("Before setting values:", datasetmodalform.getFieldsValue());
  //   datasetmodalform.setFieldsValue({initialValues})
  //   // if (initialValues && initialValues.datasetname) {
  //   //   datasetmodalform.setFieldsValue({
  //   //     datasetName: initialValues.datasetname.datasetName,
  //   //     // Other fields...
  //   //   });

  //   // }
  // //  forceUpdate({});
  //   console.log("After setting values:", datasetmodalform.getFieldsValue());
  // }, [initialValues, datasetmodalform]);
  // useEffect(()=>{
  //   tagmodalform.setFieldsValue(initialValues);
  // },[initialValues,tagmodalform])
  // useEffect(() => {
  //   if (initialValues && initialValues.datasetname && dataseteditform) {
  //     datasetmodalform.setFieldsValue({
  //       datasetName: initialValues.datasetname,
  //     });
  //     console.log(">>>",initialValues.datasetname)
  //   }
  // }, [initialValues, dataseteditform, datasetmodalform]);
  const items = useSelector((state)=>state.charts.columnName);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Modal
        className="datasetmodal"
        open={open}
        title={dataseteditform === true ? "Edit DataSet" : "Add Dataset"}
        okText={dataseteditform === true ? "Save" : "Create"}
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          datasetmodalform
            .validateFields()
            .then((values) => {
              console.log("Form Values:", values);
        
              onCreate(values);
        
              if (dataseteditform === true) {
                console.log("Editing Dataset:", values);
                dispatch(setEditDatasetList({ datasetname: values, id: values.id }));
              } else {
                console.log("Adding Dataset:", values);
                dispatch(setDatasetList({ datasetname: values, id: uuidv4() }));
              }
        
              dispatch(setDatasetformopen(false));
              datasetmodalform.resetFields();
            })
            .catch((info) => {
              console.log("dataset Validate Failed:", info);
            });
        }}
      >
        <div className="datasetaddtag">
          <Form
            form={datasetmodalform}
            layout="vertical"
            name="form_in_modal"
            {...formItemLayout}
            className="datasetform"
            // initialValues={initialValues}
            id={id}
          
          >
            <Form.Item name="datasetName" label="Dataset Name" rules={[{ required: true, message: 'Please input dataset name!' }]}>
              {/* <div className="inputdb"> */}
                <Input/>
               

               {/* <h5> {initialValues?.datasetname?.datasetName}</h5> */}
                {/* <h5>{initialValue?.datasetname?.datasetName}</h5> */}
              {/* </div> */}
            </Form.Item>
          </Form>
          <div className="tagbtn">
            <Button onClick={addTagdataset}>
              <PlusCircleOutlined />
              Add Tag
            </Button>
          </div>
        </div>
        <div className="tagsearch">
          <Search placeholder="Search Tag" />
        </div>
        <div>
          <Table dataSource={tableValue} columns={columns} />
        </div>
      </Modal>
      <Modal
        className="datasetmodal"
        open={tagmodalOpen}
        title="Add Tag"
        okText="Add"
        cancelText="Cancel"
        onCancel={() => {
          dispatch(setTagModalOpen(false));
          dispatch(setDatasetformopen(true));
        }}
        onOk={() => {
          dispatch(setTagModalOpen(false));
          dispatch(setDatasetformopen(true));
          tagmodalform
            .validateFields()
            .then((values) => {
              tagmodalform.resetFields();
              onCreate(values);
              dispatch(setdatasetaddTag({values,id:uuidv4()+"tagname"}))
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={tagmodalform}
          // initialValues={initialValues}
        >
          <Form.Item name="tagName" label="Tag Name" rules={[{ required: true, message: 'Please select tag name!' }]}>
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
          <Form.Item name="rangeType" label="Range Type">
            <div>
              <Radio.Group onChange={onradiobtnChange} value={radioValue}>
                <Radio name="auto" value="Auto">
                  Auto
                </Radio>
                <Radio name="manual" value="Manual">
                  Manual
                </Radio>
                <Radio name="tagmaster" value="TagMaster">
                  Tag Master
                </Radio>
                <Radio name="percentage" value="Percentage">
                  Percentage
                </Radio>
                
              </Radio.Group>
            </div>

            {/* <div>
            <Checkbox.Group style={{ width: '100%' }}>
          <Checkbox value="Auto">Auto</Checkbox>
          <Checkbox value="Manual">Manual</Checkbox>
          <Checkbox value="TagMaster">Tag Master</Checkbox>
          <Checkbox value="Percentage">Percentage</Checkbox>
        </Checkbox.Group>
            </div> */}
          </Form.Item>
          <Form.Item name="reacltimeorhistorical" label="RealTime/Historical">
            <Radio.Group  onChange={onradiobtnrealtimeChange} value={realhistorical}>
            <Radio name="realTime" value="realTime">
                  Real Time
                </Radio>
                <Radio name="historical" value="Historical">
                  Historical
                </Radio>
            </Radio.Group>
        
          </Form.Item>
          <Form.Item name="rangelow" label="Range Low">
            <Input type="number" disabled={!isManual} />
          </Form.Item>
          <Form.Item name="rangeHigh" label="Range High">
            <Input type="number" disabled={!isTagmaster} />
          </Form.Item>
          {/* <Durationcontent/> */}
          <Form.Item disabled={!ishistorical} name="historicalform">
            <Form.Item name="aggregate" label="Aggregate">
              <Select></Select>
            </Form.Item>
            <Form.Item name="durationType" label="Duration Type">
              <Select
                placeholder="Select Duration"
                onChange={handleDurationTypeChange}
              >
                <Option value="Minute">Minute</Option>
                <Option value="Hour">Hour</Option>
                <Option value="Day">Day</Option>
                <Option value="Week">Week</Option>
                <Option value="Month">Month</Option>
                <Option value="Year">Year</Option>
              </Select>
            </Form.Item>
            <Form.Item name="intervalType" label="Interval Type">
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
            <div style={{ display: "flex", gap: "4px" }}>
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange(e.target.checked, "slidingTime")
                }
              />
              <h5>Sliding Time</h5>
            </div>
            <Form.Item name="slidingTime">
              <TimePicker disabled={!enableSlidingTime} />
            </Form.Item>
            <div style={{ display: "flex", gap: "4px" }}>
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange(e.target.checked, "slidingDay")
                }
              />
              <h5>Sliding Day</h5>
            </div>
            <Form.Item name="slidingDay">
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
            <div style={{ display: "flex", gap: "4px" }}>
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange(e.target.checked, "slidingMonth")
                }
              />
              <h5>Sliding Month</h5>
            </div>

            <Form.Item name="slidingMonth">
              <Select placeholder="Select Month" disabled={!enableSlidingMonth}>
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
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
const Dataset = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selecteddbid, setSlecteddbid] = useState("");
  const [field, setfield] = useState(false);
  // const [dataseteditform,setDataseteditform] = useState(false)
  const datasetListname = useSelector((state) => state.datasets);
  const { datasetformopen, datasetList,editdatasetbyid,datasetaddTag } = datasetListname;
  console.log(datasetList, "datasetList",editdatasetbyid,"editdatasetbyid");
  const { Search } = Input;
  
  const dispatch = useDispatch();
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  console.log(selecteddbid, "selecteddbid");
  // const [open, setOpen] = useState(false);
  const onCreatedatasetForm = (values) => {
    console.log("Received values of form: ", values);
   
    dispatch(setDatasetformopen(true));
  };
  const handledbadd = () => {
    dispatch(setDatasetformopen(true));
    dispatch(setDataseteditform(false));
  };

  const handledataset = (datasetuniqueid) => {
    setfield(!field);
    setSlecteddbid(datasetuniqueid);
  };
  const handleEditdataset = (datasetuniqueid) => {
    console.log(datasetuniqueid, "datasetuniqueid by edit");
    const editedataset = datasetList.find((dataset)=>dataset.id === datasetuniqueid)
    console.log(editedataset,"editedataset")
    dispatch(setEditdatasetbyid(editedataset));
    const update = datasetList.findIndex((dataset)=>dataset.id === datasetuniqueid);
    
    // if(update !==-1){
    //   datasetList[update] = editedataset
    // }
    dispatch(setDataseteditform(true));
    dispatch(setDatasetformopen(true));
    dispatch(setfield(false));
   
    
   
  };
  const deldataset = (datasetuniqueid) => {
    const updatedataset = datasetList.filter(
      (dataset) => dataset.id !== datasetuniqueid
    );
    console.log(updatedataset, "updatedataset");
    dispatch(setDeletedatasetbyId(datasetuniqueid));
    // dispatch(setDatasetList(updatedataset));
    dispatch(setfield(false));
  
  };
  const filteredDatasets = datasetList.filter((dataset) =>
  dataset.datasetname.datasetName.toLowerCase().includes(searchTerm.toLowerCase())
);
console.log(filteredDatasets,"fillterdatset")
const datasetdescription = [
  {
    fieldname: "Realtime date",
    datatype: "daytime",
  },
  {
    fieldname: "Realtime message",
    datatype: "text",
  },
  {
    fieldname: "Realtime Tagname",
    datatype: "integer",
  },
  {
    fieldname: "Realtime Quality",
    datatype: "text",
  },
  {
    fieldname: "Realtime Value",
    datatype: "double",
  },
];
const dbColumns = [
  {
    title: "Field Name",
    dataIndex: "fieldname",
    key: "fieldname",
  },
  {
    title: "Datatype",
    dataIndex: "datatype",
    key: "datatype",
  },
];
  return (
    <>
      <div className="reportpageheader">
        <h2>***Data Set***</h2>
        
        <div className="searchAddbtn">
          <div className="reportaddbtn">
            <Button className="addbtn" onClick={handledbadd}>
              <PlusCircleOutlined />
              Add
            </Button>
            <CollectionCreateForm
            initialValues={editdatasetbyid}
              open={datasetformopen}
              onCreate={onCreatedatasetForm}
              onCancel={() => {
                dispatch(setDatasetformopen(false));
              }}
            />
          </div>
        </div>
      </div>
     
      <Search
        className="searchdataset"
        placeholder="Search DataSet..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        allowClear
      />
     {filteredDatasets.length > 0 ? (
        filteredDatasets.map((data) => (
          <div className="customcascader" key={data.id}>
            <div className="datalist">
              <h3 className="dsname" onClick={() => handledataset(data.id)}>
                {data.datasetname.datasetName}
              </h3>
              <div className="editbtn" onClick={() => handleEditdataset(data.id,data)}>
                <EditOutlined />
              </div>
              <div className="delbtn" onClick={() => deldataset(data.id)}>
                <DeleteOutlined />
              </div>
            </div>
            {field === true && data.id === selecteddbid && (
              <div className="fielddiv">
                <Table
                      dataSource={datasetdescription}
                      columns={dbColumns}
                    />
              </div>
            )}
          </div>
        ))
      ) : (
        <Empty
          imageStyle={{ height: "203px", marginTop: "349px" }}
          description="Dataset not found"
          className="empty"
        />
      )}
    </>
  );
};

export default Dataset;
