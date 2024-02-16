import React, { useEffect, useRef,useState} from "react";
import { useDrop } from "react-dnd";
import {Layout} from "antd";
import BokehChart from "./BokehChart";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DataTable from "../SpreadSheet/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {setDroppedCharts,resetDroppedCharts,setDroppedChartsLayout,setColumnName} from "../../Store/slices/chartSlice/chartSlice";
import TextBoxComponent from "./TextboxComponent";
import LogoComponent from "./logocontrol";
import LabelComponent from "./LabelControl";
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { setFooterTextboxes,setHeaderTextboxes,setDroppedLabels,setDroppedLogos,setPageBreaks,setDetailTextboxes,
  setDetailReportTextboxes,setDetailLogos,setDetailLabels,setDetailReportLogos,setDetailReportLabels,setFooterlabels,
  setFooterlogos, 
  resetDroppedContent,} from "../../Store/slices/settingSlice/settingSlice";

import { setTemplate,} from "../../Store/slices/TemplateSlice/templateslice";
import '../Dashboard/dashboard.scss';
import { setTableData } from "../../Store/slices/ReportSlice/reportslice";
import { BOKEH_SERVER_URL,BOKEH_SERVER_URL_ENDPOINTS } from "../../Config/config";
const ResponsiveGridLayout = WidthProvider(Responsive);
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// const generatePDF = () => {
//   const content = document.getElementById("contentcontainer"); 
//   const pdfOptions = {
//     margin: 10,
//     filename: "document.pdf",
//     image: { type: "jpeg", quality: 0.98 },
//     jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
//     html2canvas: { scale: 2, logging: true, scrollY: -window.scrollY },
//   };

//   html2pdf(content, pdfOptions);
// };

const DropTargetContent =({id})  => {
  const [offsetX, setOffsetX] = useState(0);
const [offsetY, setOffsetY] = useState(0);
  const dispatch = useDispatch();
  const templatedata = useSelector((state)=>state.templates);
  const {templateId,templateName} = templatedata;
  const droppedCharts = useSelector((state) => state.charts.droppedCharts);
  const droppedChartsLayout = useSelector((state) => state.charts.droppedChartsLayout);
  const filterData = useSelector((state) => state.spreadsheetData.filterData);
  const controls = useSelector((state)=>state.settings);
  const {headerTextboxes,footerTextboxes,droppedLabels,droppedLogos,pageBreaks,detailTextboxes,detailReportTextboxes,detailLogos,detailLabels,detailreportLogos,detailreportLabels,footerlabels,footerlogos,reportdata} = controls
 
  const swapColumn = useSelector((state)=>state.reports.swapColumn)
  const chartPositionsRef = useRef([]);
  const reportheaderRef = useRef([]);
  const pagefooterRef = useRef([]);
  const detailsRef = useRef([]);
  const DetailreportRef = useRef([]);

  const captureComponentAsImage = () => {
    const componentRef = document.getElementById('contentcontainer');
    html2canvas(componentRef).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      const newWindow = window.open();
      newWindow.document.write('<img src="' + image + '" style="width:100vw;height:100vh;" />');
    });
  };
 
const generateUniqueId = () => {
  const timestamp = new Date().getTime(); 
  const randomId = Math.random().toString(36).substring(2, 9); // Random number (converted to base 36)

  return `${timestamp}-${randomId}`;
};
  const handleTextboxChange = (id, newText, dropZone) => {
    switch (dropZone) {
      case "reportheader":
      const updatedHeaderTextboxes = headerTextboxes.map((textbox) =>
      textbox.id === id ? { ...textbox, text: newText } : textbox
      );
      dispatch(setHeaderTextboxes(updatedHeaderTextboxes));
      break;
      case "pagefooter":
      const updatedFooterTextboxes = footerTextboxes.map((textbox) =>
      textbox.id === id ? { ...textbox, text: newText } : textbox
      );
      dispatch(setFooterTextboxes(updatedFooterTextboxes));
      break;
      case "details":
        const updatedDetailsTextboxes = detailTextboxes.map((textbox) =>
          textbox.id === id ? { ...textbox, text: newText } : textbox
        );
        dispatch(setDetailTextboxes(updatedDetailsTextboxes));
        break;
      case "Detailreport":
        const updatedDetailReportTextboxes = detailReportTextboxes.map(
          (textbox) =>
            textbox.id === id ? { ...textbox, text: newText } : textbox
        );
        dispatch(setDetailReportTextboxes(updatedDetailReportTextboxes));
        break;
      default:
        break;
    }
  };
  // useEffect(() => {
  
     
  //   const detailreportDocument = document.getElementById('details');
  //  const detailreportscroll = document.getElementById('detailreportscale')
  //   if (detailreportDocument) {
  //     const handleMouseMove = (event) => {
  //       const rect = detailreportDocument.getBoundingClientRect();
  //       // const mouseX = event.clientX - rect.left + detailreportDocument.scrollLeft;
  //       // const mouseY = event.clientY - rect.top + detailreportscroll.scrollTop;
  //       const mouseX = event.clientX - document.documentElement.scrollLeft- rect.left - detailreportDocument.scrollLeft;
  //       const mouseY = event.clientY - document.documentElement.scrollTop- rect.top - detailreportDocument.scrollTop;
  //       if (
  //         mouseX >= 0 &&
  //         mouseX <= rect.width &&
  //         mouseY >= 0 &&
  //         mouseY <= rect.height
  //       ) {
  //         setOffsetX(mouseX);
  //   setOffsetY(mouseY);
  //         console.log(mouseX,mouseY,"mouseX,mouseY")
  //         console.log('scroll->l->t->docscroll->l->T', detailreportDocument.scrollLeft, detailreportDocument.scrollTop, document.documentElement.scrollLeft, document.documentElement.scrollTop,);
  //       }
  //     };
  
  //     document.addEventListener('mousemove', handleMouseMove);
  
  //     return () => {
  //       document.removeEventListener('mousemove', handleMouseMove);
  //     };
  //   }
  // }, []);
  const [{ isOver, canDrop }, drop,] = useDrop({
    accept: "SUBMENU_ITEM",
    // canDrop: (item) => {
    //   return item.chartType !== "invalid";
    // },
    canDrop: (item, monitor) => {
      const allowedDropZones = ['details', 'reportheader', 'Detailreport', 'pagefooter','topmargin','marginbottom'];
      const dropPosition = monitor.getClientOffset();
      const dropTargetElement = document.elementFromPoint(dropPosition.x, dropPosition.y);
  
    //  console.log(dropPosition.x , '-',dropPosition.y ,"dropTargetElement");
   
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
      // else if(item.id === 15){
      //   if(dropTargetElement.id === 'details' || dropTargetElement.id === 'Detailreport' ){
      //     return true;
      //   }
      // }
      return false;
      // return item.chartType !== "invalid";
    },
    drop: async (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      // console.log(clientOffset,'clientoffset',item)
      const initialPosition = monitor.getInitialClientOffset();
      // console.log('Initial position:', initialPosition);
      const { x, y } = clientOffset;
      // const Pagex= x-100;
      // const PageY = y+40;
      const dropTargetElement = document.elementFromPoint(x, y);
    const rect = dropTargetElement.getBoundingClientRect();
   
    const offsetX = x - document.documentElement.scrollLeft -rect.left + dropTargetElement.scrollLeft;
    const offsetY = y - document.documentElement.scrollTop -rect.top + dropTargetElement.scrollTop;
    setOffsetX(offsetX)
    setOffsetY(offsetY)
    console.log(offsetX,offsetY,dropTargetElement.scrollTop,"offsetX,offsetY")
        console.log(x,y)
        const addPageBreak = (offsetX,offsetY) => {
          dispatch(setPageBreaks([...pageBreaks, { offsetX,offsetY }]));
        };
       
      if (item.chartType === 14) {
        addPageBreak(x,y);
      } 
      const dropZoneId = dropTargetElement.id;
      if (item.chartType === 15) {
        const newTextbox = {
          id: generateUniqueId(),
          text: "",
          position: { x: offsetX, y: offsetY }, 
          
          
        };
      
        console.log(newTextbox,"newTextbox")
        if (dropZoneId === 'reportheader') {
          dispatch(setHeaderTextboxes([...headerTextboxes, newTextbox]));
        } else if (dropZoneId === 'details') {
          
          dispatch(setDetailTextboxes([...detailTextboxes, newTextbox]));
        }
        else if(dropZoneId === 'Detailreport'){
          dispatch(setDetailReportTextboxes([...detailReportTextboxes,newTextbox]))
        }
        else if(dropZoneId === 'pagefooter'){
          dispatch(setFooterTextboxes([...footerTextboxes,newTextbox]));
        }
      } else if (item.chartType === 16) {
        const newLabel = {
          id: generateUniqueId(),
          position: { x: offsetX, y: offsetY },
        };
        if (dropZoneId === 'reportheader') {
          dispatch(setDroppedLabels([...droppedLabels, newLabel]));
        } else if (dropZoneId === 'details') {
          dispatch(setDetailLabels([...detailLabels, newLabel]));
        }
        else if(dropZoneId === 'Detailreport'){
          dispatch(setDetailReportLabels([...detailreportLabels,newLabel]))
        }
        else if(dropZoneId === 'pagefooter'){
          dispatch(setFooterlabels([...footerlabels,newLabel]));
        }
    
      } else if (item.chartType === 17) {
        const newLogo = {
          id: generateUniqueId(),
          position:{ x: offsetX, y: offsetY }
        };
        if (dropZoneId === 'reportheader') {
          dispatch(setDroppedLogos([...droppedLogos, newLogo]));
        } else if (dropZoneId === 'details') {
          dispatch(setDetailLogos([...detailLogos, newLogo]));
        }else if(dropZoneId === 'Detailreport'){
          dispatch(setDetailReportLogos([...detailreportLogos,newLogo]))
        }
        else if(dropZoneId === 'pagefooter'){
          dispatch(setFooterlogos([...footerlogos,newLogo]));
        }
        
      }
       
  
      if (item.chartType !== 14 && item.chartType !== 15 && item.chartType !== 16 && item.chartType !== 17) {
        try {
          const token = localStorage.getItem('token');
          const endpoint = BOKEH_SERVER_URL_ENDPOINTS.generatechart;
          // console.log("Sending chart type:", item.chartType);
          const response = await fetch(`${BOKEH_SERVER_URL}${endpoint.url}`, {
            method: endpoint.method.includes('POST') ? 'POST' : 'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({                                                                  
              chartType: item.chartType,
              chartData: item.chartData,
            }),
          });

          if (response.ok) {
            const { chartData } = await response.json();
            console.log(chartData,"chartdata")
            // console.log(chartData, "response chartdata");
            const chartId = generateUniqueId()+item.chartType
            // const tabledata =async()=>{
            //   try {
            //     const response = await fetch('http://restapi.adequateshop.com/api/Tourist?page=2');
            //     if (!response.ok) {
            //       throw new Error('Network response was not ok');
            //     }
        
            //     const data = await response.json();
            //     setTableData(data.data);
            //     await fetch('http://localhost:5000/fetch_table_data', {
            //       method: 'POST',
            //       headers: {
            //         'Content-Type': 'application/json',
            //       },
            //       body: JSON.stringify(data.data),
            //     });
            //     return data;
            //   } catch (error) {
            //     console.error('Error fetching table data:', error);
            //   }
            // };

            if(item.chartType === 13){
              // tabledata()
             
          
            const tablecolumns =JSON.parse(chartData);
            dispatch(setTableData(tablecolumns));                                             
            console.log(tablecolumns,"tbc")
            const columns = tablecolumns.doc.roots[0].attributes.columns.map(column => column.attributes.title);
            console.log(columns,"columns")
            dispatch(setColumnName(columns))
          }
             dispatch(setDroppedCharts([
              ...droppedCharts,
              { chartType: item.chartType, chartData: chartData,chartId:chartId },
            ])) 
           

            // dispatch(
            //   setChartData([
            //     ...droppedCharts,
            //     { chartType: item.chartType, chartData: chartData },
            //   ])
            // );
            // const newLayout = [...droppedChartsLayout];

            // // Add layout information for the newly dropped chart
            // newLayout.push({
            //   chartType: item.chartType,
            //   chartData: chartData,
            //   x: 0,
            //   y: 0,
            //   w: 4,
            //   h: 4,
            //   i: `chartContainer-${newLayout.length}`,
            // });

            // dispatch(setDroppedChartsLayout(newLayout));
            // localStorage.setItem(
            //   "droppedChartsLayout",
            //   JSON.stringify(newLayout)
            // );
            // renderBokehChart(item.chartType,chartData);
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
  const backgroundColor = isOver ? (canDrop ? "gray" : "red") : "transparent";

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


  // const saveTemplateToServer = (templateData) => {
  //   // Send a POST request to your server to save the templateData
  //   fetch("http://localhost:5001/save_template", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({templateId,templateData}),
  //   })
  //     .then((response) =>{if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();})
  //     .then((data) => {
  //       console.log("Template saved successfully:", data);
        
       
  //     })
  //     .catch((error) => {
  //       console.error("Error saving template:", error);
  //     });
      
  
  // };
const handleSaveClick=()=>{
  const contentRef = document.getElementById('Detailreport'); 
    const content = contentRef.innerHTML;
      //  dispatch(setTemplate(componentData))
    // Define the document definition
    const documentDefinition = {
      content: [
        { text: 'Report Content', style: 'header' },
        { image: contentRef, style: 'body' },
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
    // pdfMake.createPdf(documentDefinition).download('report.pdf'); //for download
    pdfMake.createPdf(documentDefinition).open(); //Open the PDF in a new window
      // pdfMake.createPdf(documentDefinition).print(); //for print

}


  return (
    <>
    
    <div id={id} >
       <Layout.Content
        ref={drop}
        className="content-container"
        id="contentcontainer"
      >
        
        <div id="rulers_and_block">
          <div className="ruler_top">
            {Array.from({ length: 10 }).map((_, index1) => (
              <div key={index1} className="cm">
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
                  {Array.from({ length: 9 }).map((_, index2) => (
                    <div key={index2} className="cm" style={{ backgroundColor: "yellow" }}>
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
                    {Array.from({ length: 9 }).map((_, index3) => (
                      <div key={index3} className="cm" style={{ backgroundColor: "yellow" }}>
                        {Array.from({ length: 9 }).map((_, index) => (
                          <div key={index} className="mm"></div>
                        ))}
                      </div>
                    ))}
                    <div className="cm"></div>
                  </div>
                  <div id="reportheader"style={{width: "100%"}} ref={reportheaderRef}>
                  {headerTextboxes?.map((textbox) => (
            // <div className="rh" key={textbox.id} style={{left:textbox.position.x,top:textbox.position.y}}>
              <TextBoxComponent
                id={textbox.id}
                text={textbox.text}
                onChange={(newText) => handleTextboxChange(textbox.id, newText, 'reportheader')}
                initialPosition={textbox.position} 
              />
            // </div>
          ))}
          {droppedLogos?.map((logo,index)=>(
          //<div className="rh"key={logo.id}>
            <LogoComponent id={logo.id} /> 
           // </div>
            ))}
          {droppedLabels?.map((label,index)=>(
         // <div className="rh"key={label.id}>
            <LabelComponent id={label.id}/> 
           // </div>
            ))} 
</div>
                </div>
              </div>
            </div>
            <div className="rulerflex">
              <div className="verticalcontent">Details</div>
              <div className="detailsruler" >
              <div className="contentflex"id="details" ref={detailsRef}>
                <div className="ruler_left">
                  {Array.from({ length: 15 }).map((_, index4) => (
                    <div key={index4} className="cm" style={{ backgroundColor: "yellow" }}>
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="mm"></div>
                      ))}
                    </div>
                  ))}
                  <div className="cm"></div>
                  
                </div>
              
                {detailTextboxes?.map((textbox) => (
            <div className="detailtextbox" key={textbox.id} style={{left:offsetX,top:offsetY}} >
              <TextBoxComponent
                id={textbox.id}
                 text={textbox.text}
                onChange={(newText) => handleTextboxChange(textbox.id, newText, "details")}
                initialPosition={textbox.position} 
              />
            </div>
          ))}    
          {detailLogos?.map((logo,index)=>(
          // <div className="rh"key={logo.id}>
            <LogoComponent id={logo.id} initialPosition={logo.position} /> 
            // </div>
            ))}
          {detailLabels?.map((label,index)=>(
          // <div className="rh"key={label.id}>
            <LabelComponent id={label.id}initialPosition={label.position}/>
            //  </div>
             ))}
                </div>
                
              </div>
            </div>
            <div className="rulerflex" >
              <div className="verticalcontent">Detail Report</div>
              <div className="detailreportruler"  id="detailreportscale">
                <div className="contentflex">
                  <div className="ruler_left">
                    {Array.from({ length: 15}).map((_, index5) => (
                      <div  key={index5} className="cm" style={{ backgroundColor: "yellow" }}>
                        {Array.from({ length: 9 }).map((_, index) => (
                          <div key={index} className="mm">
                          </div>
                        ))}
                      </div>
                    ))}
                    <div className="cm"></div>
                  </div>
                  <div style={{width: "100%",}}id="Detailreport" ref={DetailreportRef} >
                  
                    {pageBreaks?.map((pageBreak, index) => (

                      <div
                        key={index+1+"break"}
                        className="page-break-container"
                        style={{ marginTop: `${pageBreak.position}px` }}
                      >
                        <p className="page-break" />
                        &nbsp;
                      </div>
                    ))}
                  

                    <ResponsiveGridLayout
                      ref={chartPositionsRef}
                      breakpoints={{
                        lg: 1280,
                        md: 992,
                        sm: 767,
                        xs: 480,
                        xxs: 0,
                      }}
                     
                      // cols={{ lg: 6, md: 6, sm: 4, xs: 2, xxs: 1 }}
                      // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                      // cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 1 }}
                      cols={{lg:1,md:1,sm:1,xs:1,xxs:1}}
                      rowHeight={300}
                      isDraggable
                      isRearrangeable
                      isResizable
                      autoSize
                      style={{ cursor: "move" }}
                      layout={droppedChartsLayout}
                      onLayoutChange={(newLayout) => {
                        dispatch(setDroppedChartsLayout(newLayout));
                        chartPositionsRef.current = newLayout.map((chart) => ({
                          chartType: chart.chartType,
                          position: { x: chart.x, y: chart.y },
                          dimensions: { width: chart.w, height: chart.h },
                        }));
                      }}
                    >
                      {/* <div key="h13-container"style={{border:"2px solid green"}}>
    <h1>Graph3 </h1>
  </div> */}

                      {filterData && filterData.length > 0 ? (
                        <div
                          key="h1-container"
                          style={{ border: "2px solid green" }}
                        >
                          <DataTable data={filterData} />
                        </div>
                      ) : null}

                      {droppedCharts?.map((chart, index) => (
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
                            className="dashboard-chart"
                            chartType={chart.chartType}
                            chartData={chart.chartData}
                            containerId={`chartContainer-${index}`}
                            chartId={chart.chartId}
                            chartKey={`chart-${index}`}
                          />
                        </div>
                      ))}
                    </ResponsiveGridLayout>

                    {detailReportTextboxes?.map((textbox) => (
            // <div className="rh" key={textbox.id} style={{left:textbox.position.x,top:textbox.position.y}}>
              <TextBoxComponent
                id={textbox.id}
                text={textbox.text}
                onChange={(newText) => handleTextboxChange(textbox.id, newText, "Detailreport")}
                initialPosition={textbox.position} 
               
              />
            // </div>
          ))}    
          {detailreportLogos?.map((logo,index)=>(
          // <div className="rh"key={logo.id}>
            <LogoComponent id={logo.id}initialPosition={logo.position}  />
            //  </div>
             ))}
          {detailreportLabels?.map((label,index)=>(
          // <div className="rh"key={label.id}>
            <LabelComponent id={label.id}initialPosition={label.position}/>
            // </div>
            ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="rulerflex" >
              <div className="verticalfooter">Page footer</div>
              <div className="pagefooterruler">
                <div className="contentflex" id="pagefooter" ref={pagefooterRef}>
                  <div className="ruler_left">
                    {Array.from({ length: 9 }).map((_, index6) => (
                      <div  key={index6} className="cm" style={{ backgroundColor: "yellow" }}>
                        {Array.from({ length: 9 }).map((_, index) => (
                          <div key={index} className="mm"></div>
                        ))}
                      </div>
                    ))}
                    <div className="cm"></div>
                  </div>
                  {footerTextboxes?.map((textbox) => (
            <div className="fc" key={textbox.id}  >
              <TextBoxComponent
                id={textbox.id}
                text={textbox.text}
                onChange={(newText) => handleTextboxChange(textbox.id, newText, 'pagefooter')}
                initialPosition={textbox.position} 
              />
            </div>
          ))}   
            {footerlogos?.map((logo,index)=>(
            <div className="rh" key={logo.id}>
              <LogoComponent id={logo.id}initialPosition={logo.position}  />
               </div>
               ))}
          {footerlabels?.map((label,index)=>(
          // <div className="rh"key={label.id}>
            <LabelComponent id={label.id}initialPosition={label.position}/>
            //  </div>
             ))}  
                </div>
              </div>
            </div>
            <div className="rulerflex" >
              <div className="verticalfooter">Margin bottom</div>
              <div className="marginbottomfooterruler" id="marginbottom">
                <div className="ruler_left">
                  {Array.from({ length: 9 }).map((_, index6) => (
                    <div  key={index6} className="cm" style={{ backgroundColor: "yellow" }}>
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
    </div>
    </>
  );
};

export default DropTargetContent;


