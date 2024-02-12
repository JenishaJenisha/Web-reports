import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {Space, Table } from 'antd';
import {PlayCircleOutlined,DeleteOutlined} from '@ant-design/icons';
import {deleteScheduledReport,} from '../../Store/slices/ScheduleReports/scheduleReportSlice';
import dayjs from 'dayjs';
import './schedulereport.scss'
import { useNavigate } from 'react-router-dom';
import { setSelectedReportData } from '../../Store/slices/ReportSlice/reportslice';
import { setSelectedReportTemplateComponent,setExistingReportComponent,setSpreadSheatComponent,setSelectedTemplateComponent,setTemplateComponent,setDashboardcomponent
,setSchedulereportcomponent,setReportComponent,setGeneratereportcomponent } from '../../Store/slices/TemplateSlice/templateslice';
const Schedulereportlist = () => {
  const dispatch = useDispatch();
  const scheduledreport = useSelector((state) => state.scheduledReport);
  const {schedulereportdata} = scheduledreport
  
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  
  // const schedulereportinreportList = reportList?.find(
  //   (report) => report.reportId === schedulereportdata.reportId
  // );
  // console.log(schedulereportinreportList,schedulereportdata,reportList,"schedulereportinreportList,schedulereportdata,reportList")
  // const onCreate = (values) => {
  //   dispatch(updateSchedulerReportData(values));
    
  //   setOpen(false);
  //   if (values.frequency === 'Weekly') {
  //      console.log('Once a week report', values);
  //     // Set interval to run every week (604800000 milliseconds = 7 days)
  //     const interval = 604800000; 
      
  //     // Execute the function every week
  //     const intervalId = setInterval(() => {
  //       console.log('Running weekly report...');
  //       navigate('generatedChart'); 
  //     }, interval);

  //     // Clear the interval when the component is unmounted or when you want to stop the recurring task
  //     return () => clearInterval(intervalId);
    
  //   }
  //   else if (values.frequency === 'Once') {
  //     const startDateTime = dayjs(values.startdatetime);
  //     const currentTime = dayjs();

  //     // Calculate the time difference in milliseconds between the current time and the start date and time
  //     const timeDifference = startDateTime.diff(currentTime);
  //     if (timeDifference > 0) {
  //       setTimeout(() => {
  //         console.log('Running once report...');
  //         navigate('generatedChart'); 
  //       }, timeDifference);
  //     } else {
  //       console.log('Start date and time is in the past. Report will not be scheduled.');
  //     }
  //   }
  //   else if (values.frequency === '24 Hours') {
  //     const interval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  //     const intervalId = setInterval(() => {
  //       console.log('Running every 24 hours report...');
  //       navigate('generatedChart'); 
  //     }, interval);
    
  //     return () => clearInterval(intervalId);
  //   }
  //   else if (values.frequency === 'Yearly') {
  //     const startDateTime = dayjs(values.startdatetime);
  //     const currentTime = dayjs();
      
  //     // Calculate the time difference in milliseconds between the current time and the start date and time
  //     const timeDifference = startDateTime.diff(currentTime);
      
  //     if (timeDifference > 0) {
  //       setTimeout(() => {
  //         console.log('Running yearly report...');
  //         navigate('generatedChart'); 
  //       }, timeDifference);
  //     } else {
  //       console.log('Start date and time is in the past. Report will not be scheduled.');
  //     }
  //   }
    
  //   // setIsPlaying(false);
  // };
 
  useEffect(() => {
    setTableData(schedulereportdata.map((data, index) => ({
      // key: index.toString(),
      key: data.key,
      reportName: data.reportName,
      startdatetime: data.startdatetime,
      // startdatetime: dayjs(data.startdatetime).format('DD-MM-YYYY HH:mm:ss'),
      timezone: data.timezone,
      frequency: data.frequency,
      nextGenerationTime: data.nextGenerationTime,
      executionorder: data.executionorder,
    })));
  }, [schedulereportdata]);

  // const calculateEndTime = (startDateTime) => {
  //   return dayjs(startDateTime).add(1, 'hour'); 
  // };
  // const generateReport = (startDateTime) => {
  //   const endDateTime = calculateEndTime(startDateTime);
  //   // Generate report logic here based on startDateTime and endDateTime
  //   console.log(`Generating report from ${startDateTime} to ${endDateTime}`);
   
  // };

  // useEffect(() => {
  //   // Get the current date and time
  //   const currentDateTime = dayjs();
  //   console.log(currentDateTime,"currentDateTime")
  //   // Generate the report initially
  //   generateReport(currentDateTime);
    
  //   // Set up an interval to generate the report every hour
  //   const interval = setInterval(() => {
  //     generateReport(dayjs());
  //   }, 60 * 60 * 1000); 

    
  //   return () => clearInterval(interval);
  // }, []); 
  const reports = useSelector((state) => state.reports.reportsList);
  const saveasReportsList =  useSelector((state)=>state.reports.saveasReports);

const handlePlay=(selectedReport)=>{
  console.log(selectedReport,"sr")
  // setIsPlaying(!isPlaying);
  
  
  setTimeout(function() {
    // navigate('generatedChart')
console.log("report is running")
      const selectedreportinreportList = reports?.find(
        (report) => report.reportId === selectedReport.key
      );
      const selectedreportinSaveasreportList = saveasReportsList?.find(
        (report) => report.saveasReportId === selectedReport.key
      );
     
      if(selectedreportinreportList){
          dispatch(setSelectedReportData(selectedreportinreportList));
          dispatch(setGeneratereportcomponent(true));
          dispatch(setSelectedReportTemplateComponent(false));
          dispatch(setExistingReportComponent(false))
          dispatch(setSpreadSheatComponent(false))
          dispatch(setSelectedTemplateComponent(false));
          dispatch(setTemplateComponent(false));
          dispatch(setDashboardcomponent(false))
          dispatch(setSchedulereportcomponent(false))
          dispatch(setReportComponent(false));
      }
      else if(selectedreportinSaveasreportList){
            dispatch(setSelectedReportData(selectedreportinSaveasreportList))
            dispatch(setGeneratereportcomponent(true));
            dispatch(setSelectedReportTemplateComponent(false));
          dispatch(setExistingReportComponent(false))
          dispatch(setSpreadSheatComponent(false))
          dispatch(setSelectedTemplateComponent(false));
          dispatch(setTemplateComponent(false));
          dispatch(setDashboardcomponent(false))
          dispatch(setSchedulereportcomponent(false))
          dispatch(setReportComponent(false));
  
      }
      // console.log(selectedReport,selectedreportinreportList,selectedreportinSaveasreportList,"srrrr","selectedreportinreportList")
      // Handle actions when a report card is clicked
   
    // console.log("This function will be executed after 1000 milliseconds (1 seconds) delay.");
  }, 1000);
}

const handleDelete = (reportId) => {
  const index = tableData.findIndex(item => item.key === reportId.key);

  if (index !== -1) {
    tableData.splice(index, 1);
    setTableData([...tableData]);
    dispatch(deleteScheduledReport(reportId.key));
  }
};

const edithandler =()=>{
  setOpen(true)
}
// const playIcon = isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />; // Dynamic icon based on play/pause state
  const columns = [
    {
      title: 'Report name',
      dataIndex: 'reportName',
      key: 'reportName',
    },
    {
      title: 'Start Date and Time',
      dataIndex: 'startdatetime',
      key: 'startdatetime',
    },
    {
      title: 'Time Zone',
      dataIndex: 'timezone',
      key: 'timezone',
    },
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      key: 'frequency',
    },
    // {
    //   title: 'Next Generation Time',
    //   dataIndex: 'nextGenerationTime',
    //   key:'nextGenerationTime',
    // },
    {
      title: 'Execution Order',
      dataIndex: 'executionorder',
      key: 'executionorder',
    },
    {
      title: 'Action',
      key: 'action',
      render: (id,schedulereportdata) => (
        <Space size="middle">
         <PlayCircleOutlined onClick={()=>handlePlay(schedulereportdata.reportId||schedulereportdata.saveasReportId||id)} /> 
          {/* <EditOutlined onClick={edithandler}/> */}
          <DeleteOutlined onClick={() => handleDelete(id)}/>
        </Space>
      ),
    },
  ];

//  const tablemappedData = schedulereportdata.map((data, index) => ({
//     key: index.toString(),
//     schedulerName: data.schedulerName,
//     startdatetime:dayjs(data.startdatetime).format('DD-MM-YYYY HH:mm:ss'),
//     timezone: data.timezone,
//     frequency: data.frequency,
//     executionorder: data.executionorder,
//   }));

  const AddReportScheduler = () => {
    setOpen(true);
  };
  return (
    <>
     <div className="reportpageheader">
     <h2>***Sheduled Reports***</h2>
     </div>
  
    {/* <Button className='addschedulerbtn' onClick={AddReportScheduler}>+Add Report Scheduler</Button>
    <AddReportSchedulermodel open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}/> */}
    <Table columns={columns} dataSource={tableData} />
    </> 
  )
}

export default Schedulereportlist;