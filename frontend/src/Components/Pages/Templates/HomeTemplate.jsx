import React, { useState } from "react";
import {
  FolderOpenOutlined,
  AppstoreAddOutlined,
  ScheduleOutlined,
  FileDoneOutlined,
  FolderViewOutlined,
  HddOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  setGeneratereportcomponent,
  setSpreadSheatComponent,
  setTemplateComponent,
  setDashboardcomponent,
  setSchedulereportcomponent,
  setReportComponent,
  setExistingReportComponent,
  setSelectedTemplateComponent,
  setSelectedReportTemplateComponent,
  setReportViewerComponent,
  setDatasetComponent,
} from "../../Store/slices/TemplateSlice/templateslice.js";
import Templates from "./Templates.jsx";
import ReportTemplates from "../Reports/reportTemplate.jsx";
import "./Template.scss";
import Dashboard from "../Dashboard/dashboard.jsx";
import SpreadSheet from "../SpreadSheet/SpreadSheet.jsx";
import Templatecards from "./templatecards.jsx";
import GeneratedChartPage from "../GenerateChart/GeneratedChartPage.jsx";
import Schedulereportlist from "../ScheduleReports/schedulereportlist.jsx";
import Reports from "../Reports/Reports.jsx";
import ExistingReports from "../Reports/existingReports.jsx";
import ReportViewer from "../ReportViewer/reportViewer.jsx";
import Dataset from "../Dataset/dataset.jsx"
const { Content, Sider, Header, Footer } = Layout;
const TemplateList = () => {
  const dispatch = useDispatch();
  const componentpage = useSelector((state) => state.templates);
  const {
    generatereportcomponent,
    spreadSheatComponent,
    templateComponent,
    dashboardcomponent,
    schedulereportcomponent,
    reportComponent,
    existingReportComponent,
    selectedtemplateComponent,
    selectedTempData,
    selectedReportTemplateComponent,
    reportViewerComponent,
    isSaveasTemplate,
    saveastempId,
    datasetComponent,
  } = componentpage;
  const saveastemplatelist = useSelector(
    (state) => state.templates.saveastemplates
  );
  const selectedReportDetail = useSelector((state) => state.reports);
  const { saveasReports, selectedReportData, isSaveasReport } = selectedReportDetail;
  const [collapsed, setCollapsed] = useState(false);
  
  const handlespreadsheetnavigation = () => {
    dispatch(setSpreadSheatComponent(true));
    dispatch(setTemplateComponent(false));
    dispatch(setDashboardcomponent(false));
    dispatch(setSchedulereportcomponent(false));
    dispatch(setGeneratereportcomponent(false));
    dispatch(setReportComponent(false));
    dispatch(setDatasetComponent(false));
    dispatch(setExistingReportComponent(false));
    dispatch(setSelectedTemplateComponent(false));
    dispatch(setSelectedReportTemplateComponent(false));
  };
  const templatenavigation = () => {
    dispatch(setSpreadSheatComponent(false));
    dispatch(setTemplateComponent(true));
    dispatch(setDashboardcomponent(false));
    dispatch(setSchedulereportcomponent(false));
    dispatch(setGeneratereportcomponent(false));
    dispatch(setReportComponent(false));
    dispatch(setExistingReportComponent(false));
    dispatch(setSelectedTemplateComponent(false));
    dispatch(setSelectedReportTemplateComponent(false));
    dispatch(setReportViewerComponent(false));
    dispatch(setDatasetComponent(false));
  };
  const dashboardnavigation = () => {
    dispatch(setSpreadSheatComponent(false));
    dispatch(setTemplateComponent(false));
    dispatch(setDashboardcomponent(true));
    dispatch(setSchedulereportcomponent(false));
    dispatch(setGeneratereportcomponent(false));
    dispatch(setReportComponent(false));
    dispatch(setExistingReportComponent(false));
    dispatch(setSelectedTemplateComponent(false));
    dispatch(setSelectedReportTemplateComponent(false));
    dispatch(setReportViewerComponent(false));
    dispatch(setDatasetComponent(false));
  };
  const userspacenavigation = () => {
    dispatch(setSpreadSheatComponent(false));
    dispatch(setTemplateComponent(true));
    dispatch(setDashboardcomponent(false));
    dispatch(setSchedulereportcomponent(false));
    dispatch(setGeneratereportcomponent(false));
    dispatch(setReportComponent(false));
    dispatch(setExistingReportComponent(false));
    dispatch(setSelectedTemplateComponent(false));
    dispatch(setSelectedReportTemplateComponent(false));
    dispatch(setReportViewerComponent(false));
    dispatch(setDatasetComponent(false));
  };
  const handleschedulenavigation = () => {
    dispatch(setSpreadSheatComponent(false));
    dispatch(setTemplateComponent(false));
    dispatch(setDashboardcomponent(false));
    dispatch(setSchedulereportcomponent(true));
    dispatch(setGeneratereportcomponent(false));
    dispatch(setReportComponent(false));
    dispatch(setExistingReportComponent(false));
    dispatch(setSelectedTemplateComponent(false));
    dispatch(setSelectedReportTemplateComponent(false));
    dispatch(setReportViewerComponent(false));
    dispatch(setDatasetComponent(false));
  };
  const handlereportsnavigation = () => {
    dispatch(setSpreadSheatComponent(false));
    dispatch(setTemplateComponent(false));
    dispatch(setDashboardcomponent(false));
    dispatch(setSchedulereportcomponent(false));
    dispatch(setGeneratereportcomponent(false));
    dispatch(setReportComponent(true));
    dispatch(setExistingReportComponent(false));
    dispatch(setSelectedTemplateComponent(false));
    dispatch(setSelectedReportTemplateComponent(false));
    dispatch(setReportViewerComponent(false));
    dispatch(setDatasetComponent(false));
  };
 const handlereportViewernavigation=()=>{
  dispatch(setReportViewerComponent(true));
  dispatch(setSpreadSheatComponent(false));
    dispatch(setTemplateComponent(false));
    dispatch(setDashboardcomponent(false));
    dispatch(setSchedulereportcomponent(false));
    dispatch(setGeneratereportcomponent(false));
    dispatch(setReportComponent(false));
    dispatch(setExistingReportComponent(false));
    dispatch(setSelectedTemplateComponent(false));
    dispatch(setSelectedReportTemplateComponent(false));
    dispatch(setDatasetComponent(false));
 }
 const handledatasetnavigation=()=>{
  dispatch(setReportViewerComponent(false));
  dispatch(setSpreadSheatComponent(false));
    dispatch(setTemplateComponent(false));
    dispatch(setDashboardcomponent(false));
    dispatch(setSchedulereportcomponent(false));
    dispatch(setGeneratereportcomponent(false));
    dispatch(setReportComponent(false));
    dispatch(setExistingReportComponent(false));
    dispatch(setSelectedTemplateComponent(false));
    dispatch(setSelectedReportTemplateComponent(false));
    dispatch(setDatasetComponent(true));

 }
 const menuItems = [
  {
    key: "home",
    icon: <AppstoreAddOutlined style={{ fontSize: "200%" }} />,
    title: "DashBoard",
    onClick: dashboardnavigation,
    label: "DashBoard"
  },
  {
    key: "sub3",
    icon: <FolderOpenOutlined style={{ fontSize: "200%" }} />,
    title: "Templates",
    onClick: templatenavigation,
    label: "Templates"
  },
  {
    key: "report",
    icon: <FileDoneOutlined style={{ fontSize: "200%" }} />,
    title: "Reports",
    onClick: handlereportsnavigation,
    label: "Reports"
  },
  {
    key: "20",
    icon: <ScheduleOutlined style={{ fontSize: "200%" }} />,
    title: "Scheduled Reports",
    onClick: handleschedulenavigation,
    label: "Scheduled Reports"
  },
  {
    key: "21",
    icon: <FolderViewOutlined style={{ fontSize: "200%" }} />,
    title: "Report Viewer",
    onClick: handlereportViewernavigation,
    label: "Report Viewer"
  },
  {
    key: "22",
    icon: <HddOutlined style={{ fontSize: "200%" }} />,
    title: "Data Set",
    onClick: handledatasetnavigation,
    label: "Data Set"
  }
];

  return (
    <>
      <Layout>
        <Header className="homeHeader">
          <h2>Reports -Supra Controls Pvt.Ltd</h2>
        </Header>
      </Layout>

      <Layout style={{ minHeight: "calc(100vh - 50px)", marginTop: "50px" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
      <Menu
  theme="dark"
  mode="inline"
  className="sidermenulist"
  defaultSelectedKeys={["home"]}
  style={{
    width: collapsed ? "80px" : "200px", // Adjust width when collapsed
  }}
  items={menuItems.map(item => ({
    key: item.key,
    icon: item.icon,
    title: item.title,
    onClick: item.onClick,
    label: item.label
  }))}
/>
        </Sider>
        <Layout>
          <Content style={{ margin: "0 16px" }}>
            {existingReportComponent === true && (
              <>
                <ExistingReports />
              </>
            )}
            {reportComponent === true && <Reports />}

            {spreadSheatComponent === false &&
            templateComponent === false &&
            schedulereportcomponent === false &&
            generatereportcomponent === false &&
            reportComponent === false &&
            existingReportComponent === false &&
            selectedtemplateComponent === false &&
            selectedReportTemplateComponent === false &&
            reportViewerComponent===false &&
            datasetComponent === false ?(
              <Dashboard />
            ) : (
              <>
                {dashboardcomponent === true && <Dashboard />}

                {spreadSheatComponent === true && <SpreadSheet />}
                {schedulereportcomponent === true && <Schedulereportlist />}

              
                {templateComponent === true && (
                  <>
                    <Templatecards />
                  </>
                )}
                {selectedtemplateComponent === true &&
                  selectedTempData &&
                  (saveastemplatelist ? (
                    <Templates
                      selectedTemplatedetail={
                        selectedTempData || saveastemplatelist
                      }
                      id={
                        selectedTempData.templateId ||
                        saveastemplatelist.saveastempId
                      }
                    />
                  ) : null)}

                {generatereportcomponent === true && selectedReportData && (
                  <GeneratedChartPage
                    selectedReportdetail={selectedReportData}
                    id={selectedReportData.reportId}
                  />
                )}

                {selectedReportTemplateComponent === true &&
                  selectedReportData &&
                  (saveasReports ? (
                    <ReportTemplates
                      selectedTempReportdetail={
                        selectedReportData || saveasReports
                      }
                      id={selectedReportData.reportId || saveasReports.reportId}
                    />
                  ) : null)}

    {reportViewerComponent===true && <ReportViewer/>}
             {datasetComponent === true && <Dataset/>}     
                {/* {generatereportcomponent === true && selectedReportData &&(<GeneratedChartPage  selectedReportdetail={selectedReportData }
                      id={selectedReportData.reportId 
                      } />)} */}
                {/* {selectedtemplateComponent === true  && (selectedTempData !== null || saveastemplatelist !== null )&&( <Templates selectedTemplatedetail={selectedTempData||saveastemplatelist} id={selectedTempData.templateId||saveastemplatelist.saveastempId}/>)} */}
                {/* {templateComponent === true && selectedsaveastemplateId !=null &&( <Templates selectedTemplatedetail={selectedTempData} id={selectedTempData.saveastempId}/>)} */}
                {/* {reportgenerator === true && (<GeneratedChartPage/>)} */}
              </>
            )}
          </Content>
          <Footer className="footercontent">
            copyright©2023 Supra controls pvt ltd.
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default TemplateList;
