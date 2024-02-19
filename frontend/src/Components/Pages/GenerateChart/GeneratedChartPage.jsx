// import React from 'react';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// import { useSelector} from 'react-redux';
// import BokehChart from '../Dashboard/BokehChart';
// import './GenerateChart.scss';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// const GeneratedChartPage = (chartData) =>{
  
//     const chartdata = useSelector((state)=>state.charts.chartdata)
//     console.log(chartdata,'chartdata')
//  const datatableData = useSelector((state)=>state.spreadsheetData.filterData);
  // console.log(datatableData,'datatableData')
//     const reportDefinition = {
//       content: [
//         { text: 'Supra Controls Pvt.ltd', style: 'header' },
//         { text: 'Chart Data:', style: 'subheader' },
//         chartData, // Insert your chart data here
//       datatableData],
//       styles: {
//         header: { fontSize: 18, bold: true },
//         subheader: { fontSize: 16, bold: true, margin: [0, 15, 0, 0] },
//       },

//       };
//       const handleDownload = () => {
//         // Assuming chartData contains the data you want to download as a file
    
//         // Create a JSON blob from your data
//         const blob = new Blob([JSON.stringify(chartData)], {
//           type: 'application/json',
//         });
    
//         // Create a URL for the blob
//         const url = URL.createObjectURL(blob);
    
//         // Open a new browser window or tab with the URL
//         const newWindow = window.open(url, '_blank');
    
//         // Trigger a download
//         newWindow.location.href = url;
    
//         // Clean up resources
//         URL.revokeObjectURL(url);
//       };
//        pdfMake.createPdf(reportDefinition).download('report.pdf');
//     return (
//         <div>
//             <h2>Generated Report</h2>
//             {/* <button onClick={handleDownload}>Download Report</button> */}
//             {chartdata.map((chart, index) => (
//         <BokehChart
//           chartType={chart.chartType}
//           chartData={chart.chartData}
//           containerId={`chartContainer-${index}`}
//         />
//       ))}
//         </div>
//     )
// };
// export default GeneratedChartPage;



// import React, { useEffect, useState } from 'react';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// import { useSelector } from 'react-redux';
// import BokehChart from '../Dashboard/BokehChart';
// import './GenerateChart.scss';

// import html2canvas from 'html2canvas';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const GeneratedChartPage = () => {
//   const chartData = useSelector((state) => state.charts.chartdata);
//   const [chartImages, setChartImages] = useState([]);
//   useEffect(() => {
//     const capturePromises = chartData.map(async (chart, index) => {
//       const chartContainerId = `chartContainer-${index}`;
//       const image = await captureScreenshot(chartContainerId);
//       return image;
//     });

//     Promise.all(capturePromises).then((images) => {
//       setChartImages(images.filter((image) => image !== null));
//     });
//   }, [chartData]);
//   const captureScreenshot = async () => {
//     try {
//       const canvas = await html2canvas(document.body);
//       return canvas.toDataURL('image/png');
//     } catch (error) {
//       console.error('Error capturing screenshot:', error);
//       return null;
//     }
//   };
//   const generatePDF = async () => {
//     const screenshot = await captureScreenshot();
//     if (!screenshot) {
//       console.error('Screenshot not available.');
//       return;
//     }
  
//   const reportDefinition = {
//     content: [
//       { text: 'Supra Controls Pvt. Ltd', style: 'header' },
//       { text: 'Chart Data:', style: 'subheader' },
//       ...chartImages.map((image, index) => ({ image, width: 500 })),
//     ],
//     styles: {
//       header: { fontSize: 18, bold: true },
//       subheader: { fontSize: 16, bold: true, margin: [0, 15, 0, 0] },
//     },
//   };

 
//     pdfMake.createPdf(reportDefinition).download('report.pdf');
//   };

//   return (
//     <div>
//       <h2>Generated Report</h2>
//       <button onClick={generatePDF}>Download Report</button>
//       {chartData.map((chart, index) => (
//         <BokehChart
//           chartType={chart.chartType}
//           chartData={chart.chartData}
//           containerId={`chartContainer-${index}`}
//           key={index}
//         />
//       ))}
//     </div>
//   );
// };

// export default GeneratedChartPage;
import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import LogoComponent from "../Dashboard/logocontrol";
import LabelComponent from "../Dashboard/LabelControl";
import BokehChart from "../Dashboard/BokehChart";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DataTable from "../SpreadSheet/DataTable";
import './GenerateChart.scss'
import { Button } from 'antd';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {HomeOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ResponsiveGridLayout = WidthProvider(Responsive);
const GeneratedChartPage = ({id,selectedReportdetail}) => {
  
  const textboxinput = useSelector((state)=>state.settings.textboxInput)
  // const selectedTemplatedetail = useSelector((state)=>state.templates.selectedTempData)
  const selectedTempReportdetail = useSelector ((state)=>state.reports.selectedReportData)
  console.log(selectedTempReportdetail,"reportdata")
  const filterData = useSelector((state) => state.spreadsheetData.filterData);
 
  const [tempcharts, setTempCharts] = useState(selectedTempReportdetail?.selectedReport?.droppedCharts ||selectedTempReportdetail?.reportData?.droppedCharts || selectedTempReportdetail?.droppedCharts ||selectedReportdetail?.selectedreportinreportList?.reportData?.droppedCharts);
  const [tempdetailtextboxes, setTemplatedetailtextboxes] = useState(selectedTempReportdetail?.selectedReport?.detailTextboxes ||selectedTempReportdetail?.reportData?.detailTextboxes ||selectedTempReportdetail?.detailTextboxes||selectedReportdetail?.selectedreportinreportList?.reportData?.detailTextboxes);
  const [tempdetaillogos, setTemplatedetaillogos] = useState( selectedTempReportdetail?.selectedReport?.detailLogos ||selectedTempReportdetail?.reportData?.detailLogos ||selectedTempReportdetail?.detailLogos||selectedReportdetail?.selectedreportinreportList?.reportData?.detailLogos);
  const [tempdataillabels, setTemplatedataillabels] = useState(selectedTempReportdetail?.selectedReport?.detailLabels ||selectedTempReportdetail?.reportData?.detailLabels ||selectedTempReportdetail?.detailLabels||selectedReportdetail?.selectedreportinreportList?.reportData?.detailLabels);
  const [tempheaderTextboxes, setTemplateHeadertextboxes] = useState( selectedTempReportdetail?.selectedReport?.headerTextboxes || selectedTempReportdetail?.reportData?.headerTextboxes || selectedTempReportdetail?.headerTextboxes||selectedReportdetail?.selectedreportinreportList?.reportData?.headerTextboxes);
  const [tempDroppedLabels, setTemplateDroppedLabels] = useState( selectedTempReportdetail?.selectedReport?.droppedLabels ||  selectedTempReportdetail?.reportData?.droppedLabels ||selectedTempReportdetail?.droppedLabels||selectedReportdetail?.selectedreportinreportList?.reportData?.droppedLabels);
  const [tempDroppedLogos, setTempDroppedLogos] = useState( selectedTempReportdetail?.selectedReport?.droppedLogos || selectedTempReportdetail?.reportData?.droppedLogos || selectedTempReportdetail?.droppedLogos||selectedReportdetail?.selectedreportinreportList?.reportData?.droppedLogos);
  const [tempPagebreak, setTempPagebreak] = useState( selectedTempReportdetail?.selectedReport?.pageBreaks ||selectedTempReportdetail?.reportData?.pageBreaks || selectedTempReportdetail?.pageBreaks||selectedReportdetail?.selectedreportinreportList?.reportData?.pageBreaks);
  const [tempDetailReportTextbox, setTempDetailReportTextbox] = useState(selectedTempReportdetail?.selectedReport?.detailReportTextboxes || selectedTempReportdetail?.reportData?.detailReportTextboxes || selectedTempReportdetail?.detailReportTextboxes||selectedReportdetail?.selectedreportinreportList?.reportData?.detailReportTextboxes);
  const [tempDetailreportLogos, setTempDetailreportLogos] = useState(selectedTempReportdetail?.selectedReport?.detailreportLogos ||  selectedTempReportdetail?.reportData?.detailreportLogos || selectedTempReportdetail?.detailreportLogos||selectedReportdetail?.selectedreportinreportList?.reportData?.detailreportLogos);
  const [tempDetailreportLabels, setTempDetailreportLabels] = useState( selectedTempReportdetail?.selectedReport?.setDetailLabels || selectedTempReportdetail?.reportData?.setDetailLabels || selectedTempReportdetail?.setDetailLabels||selectedReportdetail?.selectedreportinreportList?.reportData?.setDetailLabels );
  const [tempFooterlabels, setTempFooterlabels] = useState( selectedTempReportdetail?.selectedReport?.footerlabels || selectedTempReportdetail?.reportData?.footerlabels || selectedTempReportdetail?.footerlabels||selectedReportdetail?.selectedreportinreportList?.reportData?.footerlabels);
  const [tempFooterlogos, setTempFooterlogos] = useState( selectedTempReportdetail?.selectedReport?.footerlogos ||selectedTempReportdetail?.reportData?.footerlogos || selectedTempReportdetail?.footerlogos||selectedReportdetail?.selectedreportinreportList?.reportData?.footerlogos );
  const [tempFooterTextboxes, setTempFooterTextboxes] = useState( selectedTempReportdetail?.selectedReport?.footerTextboxes ||selectedTempReportdetail?.reportData?.footerTextboxes ||selectedTempReportdetail?.footerTextboxes||selectedReportdetail?.selectedreportinreportList?.reportData?.footerTextboxes );
  
  
if(selectedReportdetail){
  // console.log(selectedReportdetail,"reportdata")
}


const savereport = () => {
  const contentRef = document.getElementById('genreport');
  const content = contentRef.innerHTML;
  
  // Define the document definition
  const documentDefinition = {
    footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
   
   
    content: [
      { text: `${textboxinput}`, decoration: 'underline' , style: 'header' },
      { text: content, style: 'body' },
     
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
        color: 'blue',
        fontfamily: 'Cambria, Cochin, Georgia, Times, serif',
        padding: '20px',
      },
      
      body: {
        fontSize: 14,
        color:"red"
      },
    },
  };
  const fileName = 'report.pdf';

  // html2canvas(contentRef).then((canvas) => {
  //   // Create a PDF document
  //   const pdf = new jsPDF('l', 'mm', 'a4');

  //   // Add the captured content as an image to the PDF
  //   pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 10, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
  //   pdf.save(fileName);
  // });
  // Create the PDF
  pdfMake.createPdf(documentDefinition).open();
};

  return (
    <>
    <div id={id} >
      <div className='headerviewer'> <h2 className='genreportheader'>***Report Viewer***</h2></div>
      <div className='topbtn'>
      <Button className='savereport' onClick={savereport}>Save Report</Button>
      <Button className='savereport' onClick={savereport}>Save  As Report</Button>
      </div>
      <div className='reportpage' id='genreport'>
      <div className='r-header'>
       
       {tempheaderTextboxes?.map((textbox) => (
             <div className="rh" key={textbox.id} >
              <h3><u>{textbox.text}</u></h3>
             </div>
           ))}
           {tempDroppedLogos?.map((logo,index)=>(<div className="rh" key={index}><LogoComponent id={logo.id} /> </div>))}
           {tempDroppedLabels?.map((label,index)=>(<div className="rh" key={index}><LabelComponent id={label.id}/> </div>))} 
       </div>
       
    <div className='r-details'>
    {tempdetailtextboxes?.map((textbox) => (
             <div className="rh" key={textbox.id} >
                <p> <i>{textbox.text}</i>
                </p>
             </div>
           ))}    
           {tempdetaillogos?.map((logo,index)=>(<div className="rh" key={index}><LogoComponent id={logo.id} initialPosition={logo.position} /> </div>))}
           {tempdataillabels?.map((label,index)=>(<div className="rh"key={index}><LabelComponent id={label.id}initialPosition={label.position}/> </div>))}
    </div>

           <div style={{width: "100%"}}id="Detailreport"  className='r-detailreport'>
                     {tempPagebreak?.map((pageBreak, index) => (
                       <div
                         key={index}
                         className="page-break-container"
                       
                       >
                         <p className="page-break" />
                        
                         &nbsp;
                       </div>
                     ))}
 
                     <ResponsiveGridLayout
                       className="layout"
                       
                       breakpoints={{
                         lg: 1280,
                         md: 992,
                         sm: 767,
                         xs: 480,
                         xxs: 0,
                       }}
                       // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                      //  cols={{ lg: 6, md: 6, sm: 4, xs: 2, xxs: 1 }}
                      cols={{lg:1,md:1,sm:1,xs:1,xxs:1}}
                      rowHeight={800}
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
                         width:"100%",
                         height: chart.h,
                       }}
                     >
                       <BokehChart
                         key={index}
                         className="dashboard-chart"
                         chartType={chart.chartType}
                         chartData={chart.chartData}
                         containerId={`chartContainer-${index}`}
                       />
                       </div>
                     ))}
                     
                     </ResponsiveGridLayout>
  
                     {tempDetailReportTextbox?.map((textbox) => (
             <div className="rh" key={textbox.id} >
                <p>{textbox.text}</p>
             </div>
           ))}    
           {tempDetailreportLogos?.map((logo,index)=>(<div className="rh"key={index}><LogoComponent id={logo.id}initialPosition={logo.position}  /> </div>))}
           {tempDetailreportLabels?.map((label,index)=>(<div className="rh"key={index}><LabelComponent id={label.id}initialPosition={label.position}/> </div>))}
           </div>
       
           <div className='r-footer'>
           {tempFooterTextboxes?.map((textbox) => (
             <div className="fc" key={textbox.id}>
  <p>{textbox.text}</p>
             
             </div>
           ))}   
             {tempFooterlogos?.map((logo,index)=>(<div className="rh"key={index}><LogoComponent id={logo.id}initialPosition={logo.position}  /> </div>))}
           {tempFooterlabels?.map((label,index)=>(<div className="rh"key={index}><LabelComponent id={label.id}initialPosition={label.position}/> </div>))} 
           </div>
      </div>
    
          
                 

    </div>
      
      
    </>
  
  )
}

export default GeneratedChartPage
