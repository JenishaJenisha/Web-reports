import React ,{useState}from "react";
import { Card, Row, Col, Empty ,Input} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedReportData } from "../../Store/slices/ReportSlice/reportslice"; 
import { setExistingReportComponent,setSelectedTemplateComponent,setSpreadSheatComponent,
  setTemplateComponent,setDashboardcomponent,setSchedulereportcomponent, setReportComponent,setSelectedReportTemplateComponent } from "../../Store/slices/TemplateSlice/templateslice";

const ReportsCards = () => {
  const {Search} = Input;
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports.reportsList);
  const saveasReportsList =  useSelector((state)=>state.reports.saveasReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSaveAsTerm, setSearchSaveAsTerm] = useState("");
  const filteredReports = reports.filter((item) => {
    const reportName = item.reportName || item.name ;
    return reportName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const filteredSaveAsReports = saveasReportsList.filter((item) => {
    const reportName = item.reportName || item.saveasReportName;
    return reportName.toLowerCase().includes(searchSaveAsTerm.toLowerCase());
  });
  const handleReportClick = (selectedReport) => {
    const selectedreportinreportList = reports?.find(
      (report) => report.reportId === selectedReport
    );
    const selectedreportinSaveasreportList = saveasReportsList?.find(
      (report) => report.saveasReportId === selectedReport
    );
   
    if(selectedreportinreportList){
        dispatch(setSelectedReportData(selectedreportinreportList));
        // dispatch(setGeneratereportcomponent(true));
        dispatch(setSelectedReportTemplateComponent(true));
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
          dispatch(setSelectedReportTemplateComponent(true));
        dispatch(setExistingReportComponent(false))
        dispatch(setSpreadSheatComponent(false))
        dispatch(setSelectedTemplateComponent(false));
        dispatch(setTemplateComponent(false));
        dispatch(setDashboardcomponent(false))
        dispatch(setSchedulereportcomponent(false))
        dispatch(setReportComponent(false));

    }
    console.log(selectedReport,selectedreportinreportList,selectedreportinSaveasreportList,"srrrr","selectedreportinreportList")
    // Handle actions when a report card is clicked
  };
  const formatDate = (timestamp) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };
  
  const items = filteredReports.concat(filteredSaveAsReports).map((report) => (
    <Col span={6} key={report.reportId}>
      
      <Card className="reportCard" onClick={() => handleReportClick(report.reportId||report.saveasReportId)}>
        <h3 className="reportCardName">
       
         <u>{report.reportName||report.saveasReportName}</u> 
        </h3>
        <p><b>CreatedAt:</b>&nbsp;&nbsp;{formatDate(report.createdAt)} </p>
          <p><b>Modified at:</b>&nbsp;&nbsp;{formatDate(report.modifiedAt)}</p>
      </Card>
    </Col>
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
  const handleSearch = (value) => {
    setSearchTerm(value);
    setSearchSaveAsTerm(value);
  };
  return (
    <>
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
            description="Report data not found"
            className="empty"
          />
        )}
      </div>
    </>
  );
};

export default ReportsCards;
