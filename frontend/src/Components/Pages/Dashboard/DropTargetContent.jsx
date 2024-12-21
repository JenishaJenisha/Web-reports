import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { Layout } from "antd";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DataTable from "../SpreadSheet/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  setDroppedCharts,
  resetDroppedCharts,
  setDroppedChartsLayout,
  setColumnName,
} from "../../Store/slices/chartSlice/chartSlice";
import TextBoxComponent from "./TextboxComponent";
import LogoComponent from "./logocontrol";
import LabelComponent from "./LabelControl";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {
  setFooterTextboxes,
  setHeaderTextboxes,
  setDroppedLabels,
  setDroppedLogos,
  setPageBreaks,
  setDetailTextboxes,
  setDetailReportTextboxes,
  setDetailLogos,
  setDetailLabels,
  setDetailReportLogos,
  setDetailReportLabels,
  setFooterlabels,
  setFooterlogos,
  resetDroppedContent,
} from "../../Store/slices/settingSlice/settingSlice";

import { setTemplate } from "../../Store/slices/TemplateSlice/templateslice";
import "../Dashboard/dashboard.scss";
import LineChart from "../../../Assets/reportdesignericons/line-chart.svg";
import PieChart from "../../../Assets/reportdesignericons/pie-chart.svg";
import violin from "../../../Assets/reportdesignericons/violin.svg";
import table from "../../../Assets/reportdesignericons/table.svg";
import map from "../../../Assets/reportdesignericons/map.svg";
import candlestickchart from "../../../Assets/reportdesignericons/candlestick-chart.svg";
import correlationchart from "../../../Assets/reportdesignericons/chart.svg";
import surface from "../../../Assets/reportdesignericons/area-chart.svg";
import barChart from "../../../Assets/reportdesignericons/barchart.svg";
import heatmap from "../../../Assets/reportdesignericons/heatmap.svg";
import contourplot from "../../../Assets/reportdesignericons/contourplot.svg";
import lowdurationchart from "../../../Assets/reportdesignericons/lowduration.svg";
import Chartsimg from "./chartsimg";
const ResponsiveGridLayout = WidthProvider(Responsive);
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const DropTargetContent = ({ id }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const dispatch = useDispatch();
  const templatedata = useSelector((state) => state.templates);
  const { templateId, templateName } = templatedata;
  const droppedCharts = useSelector((state) => state.charts.droppedCharts);
  const droppedChartsLayout = useSelector((state) => state.charts.droppedChartsLayout);
  const filterData = useSelector((state) => state.spreadsheetData.filterData);
  const controls = useSelector((state) => state.settings);
  const {
    headerTextboxes,
    footerTextboxes,
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
    reportdata,
  } = controls;
  const chartPositionsRef = useRef([]);
  const reportheaderRef = useRef([]);
  const pagefooterRef = useRef([]);
  const detailsRef = useRef([]);
  const DetailreportRef = useRef([]);
  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 9);
    return `${timestamp}-${randomId}`;
  };

  const handleTextboxChange = (id, newText, dropZone) => {
    // Your existing code...
  };

  const [{ isOver, canDrop }, drop,] = useDrop({
    accept: "SUBMENU_ITEM",
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
        console.log(item.chartType, "ct");
        // const chartComponent = renderComponent(item.chartType);
        dispatch(setDroppedCharts([
          ...droppedCharts,
          { chartType: item.chartType},
        ])) 
        // return chartComponent;
      }
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // const renderComponent = (chartType) => {
  //   console.log(chartType, "render");
  //   switch (chartType) {
  //     case "2":
  //       return <img src={LineChart} alt="" />;
  //     case "3":
  //       return <img src={PieChart} alt="" />;
  //     case "4":
  //       return <img src={barChart} alt="" />;
  //     case "5":
  //       return <img src={map} alt="" />;
  //     case "6":
  //       return <img src={surface} alt="" />;
  //     case "7":
  //       return <img src={contourplot} alt="" />;
  //     case "8":
  //       return <img src={candlestickchart} alt="" />;
  //     case "9":
  //       return <img src={violin} alt="" />;
  //     case "10":
  //       return <img src={correlationchart} alt="" />;
  //     case "11":
  //       return <img src={lowdurationchart} alt="" />;
  //     case "12":
  //       return <img src={heatmap} alt="" />;
  //     case "13":
  //       return <img src={table} alt="" />;
  //     default:
  //       return null;
  //   }
  // };

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
                    {Array.from({ length: 55}).map((_, index5) => (
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

{droppedCharts.map((chart, index) => (
              <div
                key={`chart-${index}`}
                id={`chartContainer-${index}`}
                className="dropcontent"
                // style={{
                //   position: "absolute",
                //   left: chart.x,
                //   top: chart.y,
                //   width: chart.w,
                //   height: chart.h,
                // }}
              >
                {/* {renderComponent(chart.chartType)} */}
                <Chartsimg chartType={chart.chartType}/>
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
