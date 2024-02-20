import React,{useState,useRef} from 'react';
import { Layout,  theme,Row,Col,message,Modal,Input, Form} from 'antd';
import './dashboard.scss';
import DraggableSiderItem from './DraggableSiderItem';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DropTargetContent from './DropTargetContent';
import { Button } from 'antd';
import SpreadSheet from '../SpreadSheet/SpreadSheet';
import { v4 as uuidv4 } from 'uuid';
import { useSelector,useDispatch } from 'react-redux';
import { setReportLayout,setPaperSize,resetDroppedCharts } from '../../Store/slices/chartSlice/chartSlice';
import Settings from '../Settings/Settings';
import { setReportdata,resetDroppedContent, setTemplateList} from '../../Store/slices/settingSlice/settingSlice';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { setIsReportModalOpen,setReportId,setReportName,setReports } from '../../Store/slices/ReportSlice/reportslice';
import { setTemplate,setTemplateName,setTemplateId} from "../../Store/slices/TemplateSlice/templateslice";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { Header, Content } = Layout;
const Dashboard = () => {
  const [form] = Form.useForm();
  const [reportnameform] = Form.useForm();
  const dispatch = useDispatch();
  const spreadsheetData =  useSelector((state)=>state.spreadsheetData)
  const droppedCharts = useSelector((state) => state.charts.droppedCharts);
  // console.log(chartdata,'chartdatadashboardgenbtn',droppedCharts,"droppedChartsLayout")
  const controls = useSelector((state)=>state.settings);
  const {headerTextboxes,footerTextboxes,droppedLabels,droppedLogos,pageBreaks,detailTextboxes,detailReportTextboxes,detailLogos,detailLabels,detailreportLogos,detailreportLabels,footerlabels,footerlogos} = controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const templatedata = useSelector((state)=>state.templates);
  const {templateId,templateName} = templatedata;
  const reportModal = useSelector((state)=>state.reports);
  const {isreportModalOpen,reportName,reportId} = reportModal
  // const layoutSettings = useSelector((settings)=>settings.charts)
  // const reportlayout = layoutSettings.reportLayout
  // const paperSizesettings = layoutSettings.paperSize
  // console.log(paperSizesettings,"ps")
  // console.log(reportlayout,"rl")
  // console.log(layoutSettings,'layoutSettings')
  const chartPositionsRef = useRef([]);

  // const [reportLayout, setReportLayout] = useState('portrait'); 
  // const [paperSize, setPaperSize] = useState('A5');
  const layoutStyles = {
    portrait: {
      paperStyles: {
        letter: { width: '100vw', height: '11in' },
        legal: { width: '100vw', height: '14in' },
        tabloid: { width: '100vw', height: '17in' },
        landscape: { width: '14in', height: '8.5in' }, 
        A0: { width: '33.1in', height: '46.8in' },
        A1: { width: '23.4in', height: '33.1in' },
        A2: { width: '16.5in', height: '23.4in' },
        A3: { width: '11.7in', height: '16.5in' },
        A4: { width: '8.3in', height: '11.7in' },
        A5: { width: '5.8in', height: '8.3in' },
       
      },
      contentStyles: { backgroundColor: '#efefef' },
    },
    landscape: {
      paperStyles: {
      letter: { width: '8.5in', height: '100vw' }, 
      legal: { width: '11in', height: '100vw' }, 
      tabloid: { width: '17in', height: '100vw' }, 
      landscape: { width: '100vw', height: '8.5in' },
      A0: { width: '46.8in', height: '33.1in' },
      A1: { width: '33.1in', height: '23.4in' },
      A2: { width: '23.4in', height: '16.5in' },
      A3: { width: '16.5in', height: '11.7in' },
      A4: { width: '11.7in', height: '8.3in' },
      A5: { width: '8.3in', height: '5.8in' },
      },
      contentStyles: { backgroundColor: '#b0efb04a' },
    },
    fullScreen:{
      width:'100%',height:'100%',
      contentStyles: { backgroundColor: 'red' },
    }
   
  };
  const fullScreen={
    width:'100%',height:'100%',
   backgroundColor: 'red' 
  }
  // const handleFormSubmit = (values) => {
  //   setReportLayout(values['Report Layout']);
  //   setPaperSize(values['Paper Size']);
    
  // };
  const droptargetcontent = uuidv4();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This template is generated successfully',
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    const newReportLayout =values['Report Layout'];
  const newPaperSize = values['Paper Size'];
    // console.log('Received values of form: ', values);
    // const selectedReportLayout =values['Report Layout'];
    // console.log('Selected Layout:',selectedReportLayout)
    // const selectedPaperSize = values['Paper Size']; 
    // console.log('Selected Paper Size:', selectedPaperSize);
    // setReportLayout(values['Report Layout']);
    // setPaperSize(values['Paper Size']);
    dispatch(setReportLayout(newReportLayout));
    dispatch(setPaperSize(newPaperSize ));
    setOpen(false);
  };
  const getCurrentChartPositions = () => {
    // console.log("position",chartPositionsRef.current)
    return chartPositionsRef.current;
  };
  const chartPositions = getCurrentChartPositions();
  // console.log(chartPositions,'cp')
  
 
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleBreakPointChange = (breakpoint) => {
    // breakpoint logic 
  };

  const handleLayoutChange = (newLayout) => {
    //layout change logic 
  };
  const data = [
    // data items 
  ];

  const layouts = {
    // layout definitions 
  };
  const drops = useRef();
  const generatePDF = () => {
    const contentRef = drops.current;
    const content = contentRef.innerHTML;
  

    // Define the document definition
    const documentDefinition = {
      content: [
        { text: 'Report Content', style: 'header' },
        { text: content, style: 'body' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        body: {
          fontSize: 14
        }
      }
    };
  
    // Create the PDF
    pdfMake.createPdf(documentDefinition).download('report.pdf');
  };
    const reportData = {
    droppedCharts,
    headerTextboxes,
    droppedLabels,
    droppedLogos,
    pageBreaks,
    detailTextboxes,
    detailReportTextboxes,
    detailLogos,
    detailLabels,
    detailreportLogos,
    detailreportLabels,
    footerlabels,
    footerlogos
  };
 
   // const handleSaveReport = (reportData) => {
  //   console.log('Saving report data:', reportData);
  //   dispatch(setReportdata(reportData))
  //   messageApi.open({
  //     type: 'success',
  //     content: 'Report saved Successfully !',
  //   });
  //   setTimeout(() => {
  //     generatePDF();
  //     console.log("pdf generated")
  //     const pdfWindow = window.open('', '_blank');
  //     pdfWindow.document.open();
  //     pdfWindow.document.write('<html><head><title>Generated PDF</title></head><body>');
  //     pdfWindow.document.write('<embed width="100%" height="100%" src="data:application/pdf;base64,' + generatePDF() + '" type="application/pdf" />');
  //     pdfWindow.document.write('</body></html>');
  //     pdfWindow.document.close();
  //   }, 1000); 
  //   // Optionally, show a success message or handle other UI updates after saving
  // };
  const handleSavePdf = () => {
    const contentRef = document.getElementById(droptargetcontent); // access the id passed as prop
    const content = contentRef.innerHTML;
    dispatch(setReportdata(reportData))
    // Define the document definition
    const documentDefinition = {
      content: [
        { text: 'Report Content', style: 'header' },
        { text: content, style: 'body' },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        body: {
          fontSize: 14,
        },
      },
    };
    const fileName = 'report.pdf';

    html2canvas(contentRef).then((canvas) => {
      // Create a PDF document
      const pdf = new jsPDF('l', 'mm', 'a4');
  
      // Add the captured content as an image to the PDF
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 10, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save(fileName);
    });
    // Create the PDF
    // pdfMake.createPdf(documentDefinition).download('report.pdf');
  };
  // window.jsPDF = window.jspdf.jsPDF;
  // const handleSaveReport = () => {
  //   var doc = new jsPDF();
  //   var elementHTML = document.getElementById(droptargetcontent);
  //   // const contentRef = document.getElementById(droptargetcontent); // access the id passed as prop
  //   // const content = contentRef.innerHTML;
  
  //   // Define the document definition
  //   doc.html(elementHTML, {
  //     callback: function(doc) {
  //         doc.save('document-html.pdf');
  //     },
  //     margin: [10, 10, 10, 10],
  //     autoPaging: 'text',
  //     x: 0,
  //     y: 0,
  //     width: 190, 
  //     windowWidth: 675 ,
  //     backgroundColor:'red'
  // });
   

    
    // Create the PDF
    //  pdfMake.createPdf(documentDefinition).download('report.pdf');
  // };
  const extractComponentData = () => {
    // const templateName = "Template Name";
    const componentData = {
      templateId: templateId,
      name:templateName,
      droppedCharts,
      headerTextboxes,
      droppedLabels,
      droppedLogos,
      pageBreaks,
      detailTextboxes,
      detailReportTextboxes,
      detailLogos,
      detailLabels,
      detailreportLogos,
      detailreportLabels,
      footerlabels,
      footerlogos,
      footerTextboxes
    };
    return componentData;
  };
  const generatetemplateId = uuidv4();
  
  
 const handleChange=(e)=>{
  dispatch(setTemplateName(e.target.value))
  dispatch(setTemplateId(generatetemplateId));
  
 }
 const componentData = extractComponentData();
  const handleSaveTemplateClick = () => {
    dispatch(setTemplate(componentData))
    dispatch(resetDroppedContent());
    dispatch(resetDroppedCharts());
    localStorage.setItem('templateList',JSON.stringify(componentData))
    // saveTemplateToServer(componentData);
    // const newWindowUrl = `${window.location.origin}/template/${encodeURIComponent(templateName)}`;
    // const newWindow = window.open(newWindowUrl, '_blank');
    // newWindow.onload = function() {
    //   newWindow.location.href = newWindowUrl;
    //   newWindow.document.write('<h1>Template Viewer </h1>');
    //   const componentDataString = JSON.stringify(componentData);
    //   newWindow.document.write(`<pre>${componentDataString}</pre>`);
    // };
  };
  
   
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
   
      form
        .validateFields()
        .then((values) => {
          setIsModalOpen(false);
          handleSaveTemplateClick();
          const createdAt = new Date().getTime();
          const modifiedAt = document.lastModified
         dispatch(setTemplateList({templateId,templateName,createdAt,modifiedAt}));
          form.resetFields();
          onCreate(values);
          
         
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
  
   
    // dispatch(setTemplate(componentData))
   
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSaveReport=()=>{
    reportnameform.validateFields()
      .then((values)=>{
        const createdAt = new Date().getTime();
        const modifiedAt = document.lastModified
       dispatch(setIsReportModalOpen(false));
       dispatch(setReports({reportId,reportName,reportData,createdAt,modifiedAt}));
       dispatch(resetDroppedContent());
       dispatch(resetDroppedCharts());
       reportnameform.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
    
    
  }
  const generateReportId = uuidv4()+`${reportName}`;
  const handlereportChange=(e)=>{
    dispatch(setReportName(e.target.value))
    dispatch(setReportId(generateReportId))
  }
  const handlereportCancel=()=>{
    dispatch(setIsReportModalOpen(false))
  }
  
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinishReport = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailedReport = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
   <>

    <Layout>
       <DndProvider backend={HTML5Backend}>
       <div style={{ width: '200px', float: 'left' }}>
       <DraggableSiderItem/> 
       </div>
       </DndProvider>
      <Layout>
      <div  className='contentlayout'>
      <Header className='headercontent'
          style={{
            background: colorBgContainer,
            marginTop: '0px'
          }}
        >
         
          <Row justify="space-between" align="middle">
                <Col>
                    <h2>***Template/Report Designer***</h2>
                </Col>

            </Row>
         
         <div className='headermenu'>
          {contextHolder}
         <Button className='genbtn' onClick={showModal}>Save template</Button>
         <Modal title="Template Name" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='Save' className="templatenameform">
          <Form form={form}
          id="tempnameform" name='tempnameform' onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
            <label><h3>Enter the Template Name:</h3></label>
            <Form.Item name="templatename"
            rules={[
              {
                required: true,
                message: "Please Enter the Template name!"
              }
            ]}>
            <Input type="text" value={templateName} onChange={handleChange} allowClear id={templateId}/> 
            </Form.Item>
          </Form>
      {/* <label><h3>Enter the Template Name:</h3></label>
        <Input type="text" value={templateName} onChange={handleChange} allowClear id={templateId}/> */}
      </Modal>
          {/* <Button className='genbtn'onClick={()=>handleSavePdf(reportData)}>Save PDF</Button> */}
          <Button className='genbtn'onClick={()=>dispatch(setIsReportModalOpen(true))}>Save Report</Button>
          {/* <Modal title="Report Name" open={isreportModalOpen} onOk={handleSaveReport(reportData)} onCancel={handlereportCancel} okText='Save' className="templatenameform">
      <label><h3>Enter the Report Name:</h3></label>
        <Input type="text" value={reportName} onChange={handlereportChange} allowClear id={reportId}/>
      </Modal> */}
        <Modal title="Report Name" open={isreportModalOpen}  onOk={handleSaveReport} onCancel={handlereportCancel}okText='Save' className="templatenameform">
          <Form  form={reportnameform}
          id="reportnameform" name="reportnameform"
          onFinish={onFinishReport}
          onFinishFailed={onFinishFailedReport}>
          <label><h3>Enter the Report Name:</h3></label>
            <Form.Item  name="reportname"  rules={[
              {
                required: true,
                message: "Please Enter the Report name!"
              }
            ]}>
            <Input type="text" value={reportName} onChange={handlereportChange}allowClear id={reportId}/>
            </Form.Item>
          </Form>
      
        
      </Modal>
          {/* <Button className='genbtnicon'><UploadOutlined /></Button> */}
          <div>
          {/* <Button className='genbtnicon'onClick={() => {
          setOpen(true);
        }}><SettingOutlined /></Button>  */}

        <Settings
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        
      />
     
          </div>
          
          </div>
          </Header>
        <Content
          style={{
            margin: '0 16px',
            overflow:'hidden',
            
          }}
        >
            <div style={{ display: 'flex', flex: 1 }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              flexGrow: 1, 
             
            }}
          >
             <DropTargetContent 
             id={droptargetcontent}
             
            //  reportLayout={reportlayout}
            //   paperSize={paperSizesettings}
            //   layoutStyles={layoutStyles}
              fullscreen={fullScreen} 
              data={data}
              layouts={layouts} 
              handleBreakPointChange={handleBreakPointChange} 
              handleLayoutChange={handleLayoutChange}
              spreadsheetData={spreadsheetData} 
              position={getCurrentChartPositions}
              // onSave={handleSaveReport}
              onSave={generatePDF}
            />
              {/* <GetAllSheets onDataUpdate={updateSpreadsheetData}/> */}
              {/* <SpreadSheet/> */}
          </div>
          </div>
        </Content>
      </div>

      </Layout>
    </Layout></>
   
   
   
  ); 
};
export default Dashboard;