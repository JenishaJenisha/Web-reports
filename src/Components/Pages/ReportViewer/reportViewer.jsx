import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { scheduleReportSlice } from './../../Store/slices/ScheduleReports/scheduleReportSlice';
import { Card, Row, Col, Empty ,Input,Modal} from "antd";
import {SendOutlined} from '@ant-design/icons';
import { setSelectedReportTemplateComponent,setExistingReportComponent,setSpreadSheatComponent,setSelectedTemplateComponent,
setTemplateComponent,setDashboardcomponent,setSchedulereportcomponent,setReportComponent,setGeneratereportcomponent, setReportViewerComponent } from '../../Store/slices/TemplateSlice/templateslice';
import {setSelectedReportData} from "../../Store/slices/ReportSlice/reportslice";
import './reportViewer.scss';
import EmailForm from './emailForm.jsx';
import axios from 'axios';
const ReportViewer = () => {
  const dispatch= useDispatch();
  const send = useSelector((state)=>state.scheduledReport)
  const {recipient,subject,message} = send;
  console.log(recipient,subject,message,"recipient,subject,message"); 
  const [searchTerm,setSearchTerm] = useState('');
  const generatedReport = useSelector((state)=>state.scheduledReport.generatedreportList);
  console.log(generatedReport,"gen report from report viewer")
  const {Search} = Input;
  
  const genreports = generatedReport.filter((item) => {
    const reportName = item?.selectedreportinreportList?.reportName || item.name ;
    return reportName?.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const handleSearch=(value)=>{
    setSearchTerm(value);

  }
  const handleReportClick=(generatedreportId)=>{
    console.log(generatedreportId,"generatedreportId")
    const selectedreport = generatedReport?.find(
      (report) => report?.selectedreportinreportList?.reportId === generatedreportId
    );
    console.log("generated report will be open soon",selectedreport,"selreport")

    const selectedreportinSaveasreportList = generatedReport?.find(
      (report) => report?.selectedreportinSaveasreportList?.saveasReportId === generatedreportId
    );
    console.log(selectedreportinSaveasreportList,"ss")
    if(selectedreport){
      dispatch(setSelectedReportData(selectedreport));
    dispatch(setGeneratereportcomponent(true));
    dispatch(setSelectedReportTemplateComponent(false));
    dispatch(setExistingReportComponent(false))
    dispatch(setSpreadSheatComponent(false))
    dispatch(setSelectedTemplateComponent(false));
    dispatch(setTemplateComponent(false));
    dispatch(setDashboardcomponent(false))
    dispatch(setSchedulereportcomponent(false))
    dispatch(setReportComponent(false));
    dispatch(setReportViewerComponent(false));
    }
    else if(selectedreportinSaveasreportList){
      dispatch(setSelectedReportData(selectedreportinSaveasreportList));
    dispatch(setGeneratereportcomponent(true));
    dispatch(setSelectedReportTemplateComponent(false));
    dispatch(setExistingReportComponent(false))
    dispatch(setSpreadSheatComponent(false))
    dispatch(setSelectedTemplateComponent(false));
    dispatch(setTemplateComponent(false));
    dispatch(setDashboardcomponent(false))
    dispatch(setSchedulereportcomponent(false))
    dispatch(setReportComponent(false));
    dispatch(setReportViewerComponent(false));
    }
    
  }
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false);

  const handleSendEmailClick = () => {
 console.log("emailForm")
    setIsEmailFormVisible(true);
  };

  const handleCloseEmailForm = () => {
    // Close the EmailForm
    setIsEmailFormVisible(false);
  };
  function sendMail(){
    if(recipient && subject && message){
      axios.post("http://localhost:3001",{
        recipient,
        subject,
        message
      }).then(()=>alert('Message Send Successfully'))
      .catch(()=>alert("Oops..."));

    }
    return alert("Fill in the all the fields to continue");
  }
  const handleSendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:3001/send-email', {
        recipient,
        subject,
        message,
      });
      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
    setIsEmailFormVisible(false);
  };

  const reportGeneratingTime = new Date();
  const items = genreports.map((report,index) => (
    // <Col span={6} key={report.reportId}>
      
    //   <Card className="reportCard" onClick={() => handleReportClick(report.reportId||report.saveasReportId)}>
    //     <h3 className="reportCardName">
       
    //      <u>{report.reportName||report.saveasReportName}</u> 
        
    //     </h3>
    //     <p>Date</p>
    //      <p>Time</p>
    //   </Card>
    // </Col>
    <div className='generatedreportlist'  key={report?.selectedreportinreportList?.reportId+index||report?.selectedreportinSaveasreportList?.saveasReportId+index}>
      <div className='genreportflex'> 
      <div className='genreportname'onClick={() => handleReportClick(report?.selectedreportinreportList?.reportId||report?.selectedreportinSaveasreportList?.saveasReportId)}>
        <p><u>{report?.selectedreportinreportList?.reportName||report?.selectedreportinSaveasreportList?.saveasReportName}({index})</u></p>
        </div> 
      {/* <p>{reportGeneratingTime.toLocaleString()}</p> */}
      <p>{report.formatReportGeneratingTime}</p>
      <div className='sendicon' onClick={handleSendEmailClick}><SendOutlined /></div>
      <Modal 
  open={isEmailFormVisible}
  onOk={handleSendEmail}
  okText="Send"
  onCancel={handleCloseEmailForm}>
<EmailForm/>
  </Modal>
   {/* {setIsEmailFormVisible && ()} */}
      </div>
     
    </div>
  ));
  const chunkSize = 4; 
  const rows = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    rows.push(
      <Row gutter={16} key={i}>
        {items.slice(i, i + chunkSize)}
      </Row>
    );
  }
  return (
    <>
      <div className="reportpageheader">
        <h2>***Report Viewer  (Generated Reports)***</h2>
       
      </div>
      <div className="cardView">
      <Search className="reportsearch"
          placeholder='Search Reports...'
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
        />
        {items.length > 0 ? (
         
        rows
       
        ) : (
          <Empty
            imageStyle={{ height: "203px", marginTop: "349px" }}
            description="Generated Report data  was not found"
            className="empty"
          />
        )}
      </div>

    </>
  )
}

export default ReportViewer