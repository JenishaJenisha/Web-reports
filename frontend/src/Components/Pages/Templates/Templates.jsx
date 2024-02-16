import React, { useState,useRef,useEffect} from "react";
import { useDrop } from "react-dnd";
import {Layout,theme,Button,Modal,Input,} from "antd";
import BokehChart from "../Dashboard/BokehChart";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DataTable from "../SpreadSheet/DataTable";
import { useDispatch, useSelector } from "react-redux";
import TextBoxComponent from "../Dashboard/TextboxComponent";
import LogoComponent from "../Dashboard/logocontrol";
import LabelComponent from "../Dashboard/LabelControl";
import { v4 as uuidv4 } from 'uuid';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DraggableSiderItem from "../Dashboard/DraggableSiderItem";
import { setCreatedAt ,setTempCharts,setTemplatedetailtextboxes,setTemplatedetaillogos,
  setTemplatedataillabels,setTemplateHeadertextboxes,setTemplateDroppedLabels,
  setTempDroppedLogos,setTempPagebreak,setTempDetailReportTextbox,setTempDetailreportLogos,
  setTempDetailreportLabels,setTempFooterlabels,setTempFooterlogos,setTempFooterTextboxes,
  setSaveastempName,setSaveastempId,
  setSaveastemplates,updateTemplateById,
  setIsSaveasTemplate,updateSaveasTemplateById
} from "../../Store/slices/TemplateSlice/templateslice";
import {setReportName,setReportId,setReports,setIsReportModalOpen} from '../../Store/slices/ReportSlice/reportslice';
import { BOKEH_SERVER_URL,BOKEH_SERVER_URL_ENDPOINTS } from "../../Config/config";

const ResponsiveGridLayout = WidthProvider(Responsive);
const {Header} = Layout;

const Templates =({id, selectedTemplatedetail})  => {
  const dispatch = useDispatch();
  const [delICon,setDelIcon] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log(selectedTemplatedetail,"selectedTemplatedetail",id)
  const templatedata = useSelector((state)=>state.templates);
  // console.log(templatedata,"templatedata")
  const {saveastempId,saveastempName,templates,saveastemplates,isSaveasTemplate,
    tempdetailtextboxes,
    tempdetaillogos,
    tempdataillabels,tempheaderTextboxes,tempDroppedLabels,tempDroppedLogos,
    tempPagebreak,tempDetailReportTextbox,tempDetailreportLogos,tempDetailreportLabels,
    tempFooterlabels,tempFooterlogos,tempFooterTextboxes,} = templatedata;
  const reportModal = useSelector((state)=>state.reports);
  const {reportName,reportId,isreportModalOpen} = reportModal
  const generatedSaveasTempId = uuidv4();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chartpostioning = useSelector((state)=>state.charts.droppedChartsLayout);
  // console.log(chartpostioning,"chartpostioning")
  // const [isreportModalOpen,setIsReportModalOpen] = useState(false);
  useEffect(() => {
    if (selectedTemplatedetail) {
      // Update local state variables
    setTempCharts(selectedTemplatedetail.droppedCharts||[]);
      dispatch(setTemplatedetailtextboxes(selectedTemplatedetail.detailTextboxes || []));
      dispatch(setTemplatedetaillogos(selectedTemplatedetail.detailLogos || []));
      dispatch(setTemplatedataillabels(selectedTemplatedetail.detailLabels || []));
      dispatch(setTemplateHeadertextboxes(selectedTemplatedetail.headerTextboxes || []));
      dispatch(setTemplateDroppedLabels(selectedTemplatedetail.droppedLabels || []));
      dispatch(setTempDroppedLogos(selectedTemplatedetail.droppedLogos || []));
      dispatch(setTempPagebreak(selectedTemplatedetail.pageBreaks || []));
      dispatch(setTempDetailReportTextbox(selectedTemplatedetail.detailReportTextboxes || []));
      dispatch(setTempDetailreportLogos(selectedTemplatedetail.detailreportLogos || []));
      dispatch(setTempDetailreportLabels(selectedTemplatedetail.detailreportLabels || []));
      dispatch(setTempFooterlabels(selectedTemplatedetail.footerlabels || []));
      dispatch(setTempFooterlogos(selectedTemplatedetail.footerlogos || []));
      dispatch(setTempFooterTextboxes(selectedTemplatedetail.footerTextboxes || []));
     
      
      // Update Redux state
      // dispatch(setDroppedCharts(selectedTemplatedetail.droppedCharts || []));
      // dispatch(setHeaderTextboxes(selectedTemplatedetail.headerTextboxes || []));
      // dispatch(setFooterTextboxes(selectedTemplatedetail.footerTextboxes || []));
      // dispatch(setDetailTextboxes(selectedTemplatedetail.detailTextboxes || []));
      // dispatch(setDetailReportTextboxes(selectedTemplatedetail.detailReportTextboxes || []));
      // dispatch(setDroppedLabels(selectedTemplatedetail.droppedLabels || []));
      // dispatch(setDetailLabels(selectedTemplatedetail.detailLabels || []));
      // dispatch(setDetailReportLabels(selectedTemplatedetail.detailreportLabels || []));
      // dispatch(setDroppedLogos(selectedTemplatedetail.droppedLogos || []));
      // dispatch(setDetailLogos(selectedTemplatedetail.detailLogos || []));
      // dispatch(setDetailReportLogos(selectedTemplatedetail.detailreportLogos || []));
      // dispatch(setFooterlabels(selectedTemplatedetail.footerlabels || []));
      // dispatch(setFooterlogos(selectedTemplatedetail.footerlogos || []));
    }
  }, [dispatch,selectedTemplatedetail]);
  
 
  const filterData = useSelector((state) => state.spreadsheetData.filterData);
  const chartPositionsRef = useRef([]);

const generateUniqueId = () => {
  const timestamp = new Date().getTime(); 
  const randomId = Math.random().toString(36).substring(2, 9); 

  return `${timestamp}-${randomId}`;
};
useEffect(()=>{
//  dispatch(setTempCharts(selectedTemplatedetail.droppedCharts));
 dispatch(setTemplatedetailtextboxes(selectedTemplatedetail.detailTextboxes));
 dispatch(setTemplatedetaillogos(selectedTemplatedetail.detailLogos));
 dispatch(setTemplatedataillabels(selectedTemplatedetail.detailLabels));
 dispatch(setTemplateHeadertextboxes(selectedTemplatedetail.headerTextboxes));
 dispatch(setTemplateDroppedLabels(selectedTemplatedetail.droppedLabels));
 dispatch(setTempDroppedLogos(selectedTemplatedetail.droppedLogos));
 dispatch(setTempPagebreak(selectedTemplatedetail.pageBreaks));
 dispatch(setTempDetailReportTextbox(selectedTemplatedetail.detailReportTextboxes));
 dispatch(setTempDetailreportLogos(selectedTemplatedetail.detailreportLogos));
 dispatch(setTempDetailreportLabels(selectedTemplatedetail.setDetailLabels));
 dispatch(setTempFooterlabels(selectedTemplatedetail.footerlabels));
 dispatch(setTempFooterlogos(selectedTemplatedetail.footerlogos));
 dispatch(setTempFooterTextboxes(selectedTemplatedetail.footerTextboxes))
},[])
 const [tempcharts, setTempCharts] = useState(selectedTemplatedetail.droppedCharts);
// const [tempdetailtextboxes, setTemplatedetailtextboxes] = useState(selectedTemplatedetail.detailTextboxes);
// const [tempdetaillogos, setTemplatedetaillogos] = useState(selectedTemplatedetail.detailLogos);
// const [tempdataillabels, setTemplatedataillabels] = useState(selectedTemplatedetail.detailLabels);
// const [tempheaderTextboxes,setTemplateHeadertextboxes]= useState(selectedTemplatedetail.headerTextboxes);
// const [tempDroppedLabels,setTemplateDroppedLabels]= useState(selectedTemplatedetail.droppedLabels);
// const [tempDroppedLogos,setTempDroppedLogos]= useState(selectedTemplatedetail.droppedLogos);
// const [tempPagebreak,setTempPagebreak]= useState(selectedTemplatedetail.pageBreaks);
// const [tempDetailReportTextbox,setTempDetailReportTextbox] = useState(selectedTemplatedetail.detailReportTextboxes);
// const [tempDetailreportLogos,setTempDetailreportLogos] = useState(selectedTemplatedetail.detailreportLogos);
// const [tempDetailreportLabels,setTempDetailreportLabels] = useState(selectedTemplatedetail.setDetailLabels);
// const [tempFooterlabels,setTempFooterlabels] =useState(selectedTemplatedetail.footerlabels);
// const [tempFooterlogos,setTempFooterlogos]= useState(selectedTemplatedetail.footerlogos);
// const [tempFooterTextboxes,setTempFooterTextboxes] = useState(selectedTemplatedetail.footerTextboxes)
// const [temptextboxInput,setTempTextboxInput]= useState(selectedTemplatedetail.text);
// console.log(temptextboxInput,"ttttt")
  const handleTextboxChange = (id, newText, dropZone) => {
    switch (dropZone) {
      case "reportheader":
      const updatedHeaderTextboxes = tempheaderTextboxes.map((textbox) =>
      textbox.id === id ? { ...textbox, text: newText } : textbox
      );
      // setTemplateHeadertextboxes(updatedHeaderTextboxes);
      // dispatch(setHeaderTextboxes(updatedHeaderTextboxes));
       dispatch(setTemplateHeadertextboxes(updatedHeaderTextboxes));
      break;
      case "pagefooter":
      const updatedFooterTextboxes = tempFooterTextboxes.map((textbox) =>
      textbox.id === id ? { ...textbox, text: newText } : textbox
      );
      // setTempFooterTextboxes(updatedFooterTextboxes)
      // dispatch(setFooterTextboxes(updatedFooterTextboxes));
       dispatch(setTempFooterTextboxes(updatedFooterTextboxes))
      break;
      case "details":
        const updatedDetailsTextboxes = tempdetailtextboxes.map((textbox) =>
          textbox.id === id ? { ...textbox, text: newText } : textbox
        );
        // setTemplatedetailtextboxes(updatedDetailsTextboxes)
        // dispatch(setDetailTextboxes(updatedDetailsTextboxes));
       dispatch(setTemplatedetailtextboxes(updatedDetailsTextboxes))
        break;
      case "Detailreport":
        const updatedDetailReportTextboxes = tempDetailReportTextbox.map(
          (textbox) =>
            textbox.id === id ? { ...textbox, text: newText } : textbox
        );
        // setTempDetailReportTextbox(updatedDetailReportTextboxes)
        // dispatch(setDetailReportTextboxes(updatedDetailReportTextboxes));
         dispatch(setTempDetailReportTextbox(updatedDetailReportTextboxes))
        break;
      default:
        break;
    }
  };
  
  const [{ isOver, canDrop }, drop,] = useDrop({
    accept: "SUBMENU_ITEM",
    canDrop: (item, monitor) => {
      const allowedDropZones = ['details', 'reportheader', 'Detailreport', 'pagefooter','topmargin','marginbottom'];
      const dropPosition = monitor.getClientOffset();
      const dropTargetElement = document.elementFromPoint(dropPosition.x, dropPosition.y);
      
      if (!dropTargetElement || !allowedDropZones.includes(dropTargetElement.id)) {
        return false;
      }
      
      if (item.id >= 14 && item.id <= 17) {
        if (dropTargetElement.id === 'reportheader' || dropTargetElement.id === 'pagefooter'|| dropTargetElement.id === 'details' || dropTargetElement.id === 'Detailreport' ) {
         
          return true;
        }
      } else if (item.id >= 2 && item.id <= 13) {
        if (dropTargetElement.id === 'Detailreport') {
          
          return true;
        }
      }
     
      return false;
    },
    drop: async (item, monitor) => {
      const clientOffset = monitor.getClientOffset(); 
      const { x, y } = clientOffset;
      const dropTargetElement = document.elementFromPoint(x, y);
    const rect = dropTargetElement.getBoundingClientRect();
    const offsetX = x - rect.left;
    const offsetY = y - rect.top;
        const addPageBreak = (offsetX,offsetY) => {
        //  setTempPagebreak([...tempPagebreak, { offsetX,offsetY }])
          // dispatch(setPageBreaks([...pageBreaks, { offsetX,offsetY }]));
         dispatch(setTempPagebreak([...tempPagebreak, { offsetX,offsetY }]))
        };
       
      if (item.chartType === 14) {
        const clientOffset = monitor.getClientOffset();
        const { x, y } = clientOffset;   
        addPageBreak(x,y);
      } 
      const dropZoneId = dropTargetElement.id;
      if (item.chartType === 15) {
        const newTextbox = {
          id: generateUniqueId(),
          text: "",
          position: { x: offsetX, y: offsetY }, 
        };
        if (dropZoneId === 'reportheader') {
          dispatch(setTemplateHeadertextboxes([...tempheaderTextboxes, newTextbox]))          
        } else if (dropZoneId === 'details') {
          dispatch(setTemplatedetailtextboxes([...tempdetailtextboxes, newTextbox]))
        }
        else if(dropZoneId === 'Detailreport'){
          dispatch(setTempDetailReportTextbox([...tempDetailReportTextbox,newTextbox]))         
        }
        else if(dropZoneId === 'pagefooter'){
          dispatch(setTempFooterTextboxes([...tempFooterTextboxes,newTextbox]))
        }
      } else if (item.chartType === 16) {
        const newLabel = {
          id: generateUniqueId(),
          position: { x: offsetX, y: offsetY },
        };
        if (dropZoneId === 'reportheader') {
          dispatch(setTemplateDroppedLabels([...tempDroppedLabels, newLabel]))
          
        } else if (dropZoneId === 'details') {
          dispatch(setTemplatedataillabels([...tempdataillabels, newLabel]))
        
        }
        else if(dropZoneId === 'Detailreport'){
          dispatch(setTempDetailreportLabels([...tempDetailreportLabels,newLabel]))
          
        }
        else if(dropZoneId === 'pagefooter'){
          dispatch(setTempFooterlabels([...tempFooterlabels,newLabel]))
         
        }
    
      } else if (item.chartType === 17) {
        const newLogo = {
          id: generateUniqueId(),
          position:{ x: offsetX, y: offsetY }
        };
        if (dropZoneId === 'reportheader') {
          dispatch(setTempDroppedLogos([...tempDroppedLogos, newLogo]))
        } else if (dropZoneId === 'details') {
          dispatch(setTemplatedetaillogos([...tempdetaillogos, newLogo]))
        }else if(dropZoneId === 'Detailreport'){
          dispatch(setTempDetailreportLogos([...tempDetailreportLogos,newLogo]))
        }
        else if(dropZoneId === 'pagefooter'){
          dispatch(setTempFooterlogos([...tempFooterlogos,newLogo])) 
        }
        
      }
       
    //   if (item.chartType === 13) {
    //     try {
    //         const tableres = await fetch("http://restapi.adequateshop.com/api/Tourist?page=2", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 chartType: item.chartType,
    //                 chartData: item.chartData, // Pass the obtained table data
    //             }),
    //         });
    
    //         if (tableres.ok) {
    //             const responseData = await tableres.json();
    //             const tableData = responseData.data; // Assuming the data array contains the table data
    
    //             // Now, call the Flask app's generate_chart API with chartType 13 and chartData
    //             const generateChartRes = await fetch("http://localhost:5000/generate_chart", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     chartType: 13,
    //                     chartData: tableData, // Pass the obtained tableData as chartData
    //                 }),
    //             });
    
    //             if (generateChartRes.ok) {
    //                 const { chartData } = await generateChartRes.json();
    //                 console.log("Generated Chart Data for chartType 13:", chartData);
    
    //                 // Dispatch the generated chartData to your state or perform any other actions
    //                 // dispatch(setGeneratedChartData(chartData));
    
    //             } else {
    //                 console.error("Error generating chart for chartType 13.");
    //             }
    //         } else {
    //             console.error("Error fetching table data.");
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // }
      if (item.chartType !== 14 && item.chartType !== 15 && item.chartType !== 16 && item.chartType !== 17) {
        
        try {
          // console.log("Sending chart type:", item.chartType);
          const response = await fetch(`${BOKEH_SERVER_URL}${BOKEH_SERVER_URL_ENDPOINTS.generatechart.url}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chartType: item.chartType,
              chartData: item.chartData,
            }),
          });

          if (response.ok) {
            const { chartData } = await response.json();
            // console.log(chartData, "response chartdata");
            
          const chartId = generateUniqueId()+item.chartType;
          dispatch(setTempCharts([
            ...tempcharts,
            { chartType: item.chartType, chartData: chartData,chartId:chartId },
          ]))
          } else {
            console.error("Error generating chart.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
        
      }

      
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const handleChange=(e)=>{
  
    dispatch(setSaveastempName(e.target.value))
   dispatch(setSaveastempId(generatedSaveasTempId));
   }
   const generateReportId = uuidv4()+`${reportName}`;
 const handlereportChange=(e)=>{
   dispatch(setReportName(e.target.value))
   dispatch(setReportId(generateReportId))
 }
  const saveascomponentData = {
    saveastempId: saveastempId,
    saveastempName:saveastempName,
    droppedCharts:selectedTemplatedetail?.droppedCharts && tempcharts,
    headerTextboxes:selectedTemplatedetail?.headerTextboxes &&tempheaderTextboxes,
    droppedLabels:selectedTemplatedetail?.droppedLabels && tempDroppedLabels,
    droppedLogos:selectedTemplatedetail?.droppedLogos && tempDroppedLogos,
    pageBreaks:selectedTemplatedetail?.pageBreaks && tempPagebreak,
    detailTextboxes:selectedTemplatedetail?.detailTextboxes && tempdetailtextboxes,
    detailReportTextboxes:selectedTemplatedetail?.detailReportTextboxes && tempDetailReportTextbox,
    detailLogos:selectedTemplatedetail?.detailLogos && tempdetaillogos,
    detailLabels:selectedTemplatedetail?.detailLabels && tempdataillabels,
    detailreportLogos:selectedTemplatedetail?.detailreportLogos && tempDetailreportLogos ,
    detailreportLabels:selectedTemplatedetail?.detailreportLabels && tempDetailreportLabels,
    footerlabels:selectedTemplatedetail?.footerlabels && tempFooterlabels,
    footerlogos:selectedTemplatedetail?.footerlogos && tempFooterlogos,
    footerTextboxes:selectedTemplatedetail?.footerTextboxes && tempFooterTextboxes,
    createdAt:new Date().getTime(),
    modifiedAt: document.lastModified,
  };
  const handleTemplateOk = () => {
    setIsModalOpen(false);
    // const createdAt = new Date().getTime();
    //  const modifiedAt = document.lastModified
    dispatch(setCreatedAt(saveascomponentData.createdAt));
    dispatch(setSaveastemplates(saveascomponentData));
    dispatch(setIsSaveasTemplate(true));
    
  };
  const handleTemplateCancel = () => {
    setIsModalOpen(false);
  };
 
  const handlereportOk=()=>{
    dispatch(setIsReportModalOpen(false));
    const selectedReport = templates?.find((template)=>template.templateId === selectedTemplatedetail.templateId)|| saveastemplates?.find((saveastemp)=>saveastemp.saveastempId === selectedTemplatedetail.saveastempId);
    // console.log(selectedReport,"selectedReport")
    const createdAt = new Date().getTime();
    const modifiedAt = document.lastModified
    dispatch(setReports({selectedReport,reportId,reportName,createdAt,modifiedAt}));
   
  }
  const handlereportCancel=()=>{
    dispatch(setIsReportModalOpen(false));
  }
  const handleSaveAsTemplate=(e)=>{
    setIsModalOpen(true); 
  }
  const handlesave=()=>{
    // const templateId = selectedTemplatedetail.id;
    const templateIndex = templates.findIndex(template => template.templateId === id);
    const saveasTempIndex = saveastemplates.findIndex(temp=>temp.saveastempId === saveastempId);
    // console.log(templateIndex,saveasTempIndex,"templateIndex")
    if (templateIndex !== -1 ) {
      const updatedTemplateData = {
        templateId: id,
        name:selectedTemplatedetail.name,
        droppedCharts: selectedTemplatedetail.droppedCharts && tempcharts,
        headerTextboxes: selectedTemplatedetail.headerTextboxes && tempheaderTextboxes,
        droppedLabels: selectedTemplatedetail.droppedLabels && tempDroppedLabels,
        droppedLogos: selectedTemplatedetail.droppedLogos && tempDroppedLogos,
        pageBreaks: selectedTemplatedetail.pageBreaks && tempPagebreak,
        detailTextboxes: selectedTemplatedetail.detailTextboxes && tempdetailtextboxes,
        detailReportTextboxes: selectedTemplatedetail.detailReportTextboxes && tempDetailReportTextbox,
        detailLogos: selectedTemplatedetail.detailLogos && tempdetaillogos,
        detailLabels: selectedTemplatedetail.detailLabels && tempdataillabels,
        detailreportLogos: selectedTemplatedetail.detailreportLogos && tempDetailreportLogos,
        detailreportLabels: selectedTemplatedetail.detailreportLabels && tempDetailreportLabels,
        footerlabels: selectedTemplatedetail.footerlabels && tempFooterlabels,
        footerlogos: selectedTemplatedetail.footerlogos && tempFooterlogos,
        footerTextboxes: selectedTemplatedetail.footerTextboxes && tempFooterTextboxes,
        createdAt: selectedTemplatedetail.createdAt,
        modifiedAt: new Date().getTime(),
      };
  
    //   // Update the template data at the found index in your state
      dispatch(updateTemplateById({templateIndex, updatedTemplateData}));
     
    //   dispatch(setModifiedAt(updatedTemplateData.modifiedAt));
    }
    else if (saveasTempIndex !== -1){
      const updatedsaveasTemplateData = {
        saveastempId:selectedTemplatedetail.saveastempId,
        saveastempName:selectedTemplatedetail.saveastempName,      
        droppedCharts: selectedTemplatedetail.droppedCharts && tempcharts,
        headerTextboxes: selectedTemplatedetail.headerTextboxes && tempheaderTextboxes,
        droppedLabels: selectedTemplatedetail.droppedLabels && tempDroppedLabels,
        droppedLogos: selectedTemplatedetail.droppedLogos && tempDroppedLogos,
        pageBreaks: selectedTemplatedetail.pageBreaks && tempPagebreak,
        detailTextboxes: selectedTemplatedetail.detailTextboxes && tempdetailtextboxes,
        detailReportTextboxes: selectedTemplatedetail.detailReportTextboxes && tempDetailReportTextbox,
        detailLogos: selectedTemplatedetail.detailLogos && tempdetaillogos,
        detailLabels: selectedTemplatedetail.detailLabels && tempdataillabels,
        detailreportLogos: selectedTemplatedetail.detailreportLogos && tempDetailreportLogos,
        detailreportLabels: selectedTemplatedetail.detailreportLabels && tempDetailreportLabels,
        footerlabels: selectedTemplatedetail.footerlabels && tempFooterlabels,
        footerlogos: selectedTemplatedetail.footerlogos && tempFooterlogos,
        footerTextboxes: selectedTemplatedetail.footerTextboxes && tempFooterTextboxes,
        createdAt: selectedTemplatedetail.createdAt,
        modifiedAt: new Date().getTime(),
      };
      dispatch(updateSaveasTemplateById({saveasTempIndex,updatedsaveasTemplateData}))
      // console.log(updatedsaveasTemplateData,"updatedsaveasTemplateData")
    }
   
    
    // dispatch(setSelectedTempData(newTemplateData))
    //  dispatch(setTemplate(updatedTemplateData))
    // dispatch(setModifiedAt(newTemplateData.modifiedAt))
  }

  const handlegeneratereport=()=>{
    dispatch(setIsReportModalOpen(true))
    
  }
 const handledelete=(id)=>{
 console.log(id,"del id")
 setDelIcon(true)

 }
  return (
    <>
    
    <div id={id} className="templatedashboard">
      <Layout>
      <DndProvider backend={HTML5Backend}>
              <div style={{ width: '200px', float: 'left' }}>
              <DraggableSiderItem/> 
              </div>
              </DndProvider>
      <Layout>
          
      <Header 
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
         >
          <div className='tempheader'>
             <h2 className='tempname'>Template Name:  
             {/* {isSaveasTemplate === true ?(<><u>{saveastempName}</u></>):( <><u>{selectedTemplatedetail.name||selectedTemplatedetail.saveastempName}</u></>)} */}
            <><u>{selectedTemplatedetail.name||selectedTemplatedetail.saveastempName}</u></>
              </h2>
             <div className="btntemplate">
              <Button className="saveasbtn" onClick={handlesave}>Save</Button>
             <Button className='saveasbtn'onClick={handleSaveAsTemplate}>Save as</Button>
          <Button className="saveasbtn" onClick={handlegeneratereport}>Save Report</Button>
             </div>
         
          </div>
          <Modal title="Template Name" open={isModalOpen} onOk={handleTemplateOk} onCancel={handleTemplateCancel} okText='Save' className="templatenameform">
      <label><h3>Enter the Template Name:</h3></label>
        <Input type="text" value={saveastempName} onChange={handleChange} allowClear id={saveastempId}/>
      </Modal>
      <Modal title="Report Name" open={isreportModalOpen} onOk={handlereportOk} onCancel={handlereportCancel} okText='Save' className="templatenameform">
      <label><h3>Enter the Report Name:</h3></label>
        <Input type="text" value={reportName} onChange={handlereportChange} allowClear id={reportId}/>
      </Modal>
         </Header>
        
       
    
        
      <Layout.Content
        ref={drop}
        className="content-container"
        id="contentcontainer"
      >
        
        <div id="rulers_and_block">
          <div className="ruler_top">
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="cm">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="mm"></div>
                ))}
              </div>
            ))}
            <div className="cm"></div>
          </div>

          <div
            id="ruler_left_and_block"
            style={{ marginLeft: "-228px", overflow: "true" }}
          >
            <div className="rulerflex" >
              <div className="verticalheader">Top Margin</div>
              <div className="topmargin" id="topmargin">
                <div className="ruler_left">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div className="cm" style={{ backgroundColor: "yellow" }}>
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="mm"></div>
                      ))}
                    </div>
                  ))}
                  <div className="cm"></div>
                </div>
              </div>
            </div>
            <div className="rulerflex" >
              <div className="verticalheader">Report Header</div>
              <div className="reportheader">
                <div className="contentflex">
                  <div className="ruler_left">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <div className="cm" style={{ backgroundColor: "yellow" }}>
                        {Array.from({ length: 9 }).map((_, index) => (
                          <div key={index} className="mm"></div>
                        ))}
                      </div>
                    ))}
                    <div className="cm"></div>
                  </div>
                  <div id="reportheader"style={{width: "100%"}}>
                  {tempheaderTextboxes?.map((textbox) => (
            <div className="rh" key={textbox.id} style={{width:" 75%" }} >
              <TextBoxComponent
                id={textbox.id}
                text={textbox.text}
                onChange={(newText) => handleTextboxChange(textbox.id, newText, 'reportheader')}
                initialPosition={textbox.position} 
              />
            </div>
          ))}
          {tempDroppedLogos?.map((logo,index)=>(<div className="rh" key={index}><LogoComponent id={logo.id} /> </div>))}
          {tempDroppedLabels?.map((label,index)=>(<div className="rh" key={index}><LabelComponent id={label.id}/> </div>))} 
</div>
                </div>
              </div>
            </div>
            <div className="rulerflex">
              <div className="verticalcontent">Details</div>
              <div className="detailsruler" >
              <div className="contentflex"id="details">
                <div className="ruler_left">
                  {Array.from({ length: 15 }).map((_, index) => (
                    <div className="cm" style={{ backgroundColor: "yellow" }}>
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="mm"></div>
                      ))}
                    </div>
                  ))}
                  <div className="cm"></div>
                  
                </div>
              
                {tempdetailtextboxes?.map((textbox) => (
            <div className="rh" key={textbox.id} >
              <TextBoxComponent
                id={textbox.id}
                text={textbox.text}
                onChange={(newText) => handleTextboxChange(textbox.id, newText, "details")}
                initialPosition={textbox.position} 
              />
            </div>
          ))}    
          {tempdetaillogos?.map((logo,index)=>(<div className="rh" key={index}><LogoComponent id={logo.id} initialPosition={logo.position} /> </div>))}
          {tempdataillabels?.map((label,index)=>(<div className="rh"key={index}><LabelComponent id={label.id}initialPosition={label.position}/> </div>))}
                </div>
                
              </div>
            </div>
            <div className="rulerflex" >
              <div className="verticalcontent">Detail Report</div>
              <div className="detailreportruler" >
                <div className="contentflex">
                  <div className="ruler_left">
                    {Array.from({ length: 15}).map((_, index) => (
                      <div className="cm" style={{ backgroundColor: "yellow" }}>
                        {Array.from({ length: 9 }).map((_, index) => (
                          <div key={index} className="mm">
                            {/* {index} */}
                          </div>
                        ))}
                      </div>
                    ))}
                    <div className="cm"></div>
                  </div>
                  <div style={{width: "100%"}}id="Detailreport" >
                    {tempPagebreak?.map((pageBreak, index) => (
                      <div
                        key={index}
                        className="page-break-container"
                        style={{ marginTop: `${pageBreak.position}px` }}
                      >
                        <p className="page-break" />
                        &nbsp;
                      </div>
                    ))}

                    <ResponsiveGridLayout
                      className="layout"
                      ref={chartPositionsRef}
                      breakpoints={{
                        lg: 1280,
                        md: 992,
                        sm: 767,
                        xs: 480,
                        xxs: 0,
                      }}
                      // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                      // cols={{ lg: 6, md: 6, sm: 4, xs: 2, xxs: 1 }}
                      cols={{lg:1,md:1,sm:1,xs:1,xxs:1}}
                      rowHeight={300}
                      isDraggable
                      isRearrangeable
                      isResizable
                      autoSize
                      style={{ cursor: "move" }}
                    >
                      {filterData && filterData.length > 0 ? (
                        <div
                          key="h1-container"
                          style={{ border: "2px solid green" }}
                        >
                          <DataTable data={filterData} />
                        </div>
                      ) : null}
                     
                       
                    {tempcharts?.map((chart, index) => (
                      <div
                      key={`chart-${index}`}
                      id={`chartContainer-${index}`}
                      className="dropcontent"
                      style={{
                        position: "absolute",
                        left: chart.x,
                        top: chart.y,
                        width: chart.w,
                        height: chart.h,
                      }}
                    >
                      <BokehChart
                        key={index}
                        className="dashboard-chart"
                        chartType={chart.chartType}
                        chartData={chart.chartData}
                        chartId={chart.chartId}
                        containerId={`chartContainer-${index}`}
                      />
                      </div>
                    ))}
                    
                    </ResponsiveGridLayout>
 
                    {tempDetailReportTextbox?.map((textbox) => (
            <div className="rh" key={textbox.id} >
              {/* Render a textbox component for each dropped textbox */}
              <TextBoxComponent
                id={textbox.id}
                text={textbox.text}
                onChange={(newText) => handleTextboxChange(textbox.id, newText, "Detailreport")}
                initialPosition={textbox.position} 
              />
            </div>
          ))}    
          {tempDetailreportLogos?.map((logo,index)=>(<div className="rh"key={index}><LogoComponent id={logo.id}initialPosition={logo.position}  /> </div>))}
          {tempDetailreportLabels?.map((label,index)=>(<div className="rh"key={index}><LabelComponent id={label.id}initialPosition={label.position}/> </div>))}
                  </div>
                </div>
              </div>
            </div>
            <div className="rulerflex" >
              <div className="verticalfooter">Page footer</div>
              <div className="pagefooterruler">
                <div className="contentflex" id="pagefooter">
                  <div className="ruler_left">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <div className="cm" style={{ backgroundColor: "yellow" }}>
                        {Array.from({ length: 9 }).map((_, index) => (
                          <div key={index} className="mm"></div>
                        ))}
                      </div>
                    ))}
                    <div className="cm"></div>
                  </div>
                  {tempFooterTextboxes?.map((textbox) => (
            <div className="fc" key={textbox.id}  >
              <TextBoxComponent
                id={textbox.id}
                text={textbox.text}
                onChange={(newText) => handleTextboxChange(textbox.id, newText, 'pagefooter')}
                initialPosition={textbox.position} 
              />
            </div>
          ))}   
            {tempFooterlogos?.map((logo,index)=>(<div className="rh"key={index}><LogoComponent id={logo.id}initialPosition={logo.position}  /> </div>))}
          {tempFooterlabels?.map((label,index)=>(<div className="rh"key={index}><LabelComponent id={label.id}initialPosition={label.position}/> </div>))} 
                </div>
              </div>
            </div>
            <div className="rulerflex" >
              <div className="verticalfooter">Margin bottom</div>
              <div className="marginbottomfooterruler" id="marginbottom">
                <div className="ruler_left">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div className="cm" style={{ backgroundColor: "yellow" }}>
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="mm"></div>
                      ))}
                    </div>
                  ))}
                  <div className="cm">
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout.Content>
      </Layout>
      </Layout>
    </div>
    </>
  );
};

export default Templates;
