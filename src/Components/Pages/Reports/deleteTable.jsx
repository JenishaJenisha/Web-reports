// import React from 'react'
// import { Button, Form } from 'antd'
// import { useDispatch, useSelector } from 'react-redux';
// import {deletedroppedChartById,setReports,setSelectedReportData} from '../../Store/slices/ReportSlice/reportslice';
// import {setTempCharts} from "../../Store/slices/TemplateSlice/templateslice"
// const DeleteTable = ({chartId,reportId}) => {
//     // const tempcharts = useSelector((state)=>state.templates.templates)
//     const selectedreportData = useSelector((state)=>state.reports.selectedReportData)
//     const selecreportId = selectedreportData.reportId
//     console.log(selecreportId,"rid")
//     const dispatch = useDispatch()
//     console.log(chartId,reportId,'reportId',selecreportId,"reportDatabyId",selectedreportData,"ci")
//     const deletechart = (id) => {
//         console.log(id,"iii")
        
//         const delchartbyId = selectedreportData?.reportData?.droppedCharts?.findIndex((delchart) => delchart.chartId === id);
//         console.log(delchartbyId,"delchartbyId")
//         if (delchartbyId !== -1) {
//           console.log(delchartbyId)
//           const updatedCharts = selectedreportData?.reportData?.droppedCharts?.filter((delchart) => delchart.chartId !== id);
//           console.log(updatedCharts,"updatedCharts")
//           selectedreportData = updatedCharts
//           // dispatch(setSelectedReportData([...updatedCharts]));
//           dispatch(deletedroppedChartById(id));
//           console.log("Chart deleted with id:", id);
//         } else {
//           console.log("Chart not found with id:", id);
//         }
//       };
//       const closeconfirmation=()=>{
        
//       }
//   return (
//     <>
//     <Form>
//         <h4>Are You sure to delete this?</h4>
//         <Form.Item name="Confirmation">
//             <div className='deltable'>
//             <Button onClick={()=>deletechart(chartId)}>Yes</Button>
//             <Button onClick={closeconfirmation}>No</Button>
//             </div>
           
//         </Form.Item>
//         </Form></>
//   )
// }

// export default DeleteTable

import React from 'react';
import { Button, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deletedroppedChartById, setReports, setSelectedReportData } from '../../Store/slices/ReportSlice/reportslice';
import { setTempCharts } from '../../Store/slices/TemplateSlice/templateslice';

const DeleteTable = ({ chartId, reportId }) => {
  const selectedreportData = useSelector((state) => state.reports.selectedReportData);
  const dispatch = useDispatch();

  const deletechart = (id) => {
    const delchartIndex = selectedreportData?.reportData?.droppedCharts?.findIndex(
      (delchart) => delchart.chartId === id
    );

    if (delchartIndex !== -1) {
      // Remove chart from selectedReportData
      const updatedCharts = [...selectedreportData.droppedCharts||selectedreportData.reportData.droppedCharts];
      updatedCharts.splice(delchartIndex, 1);
      dispatch(setSelectedReportData({ ...selectedreportData, reportData: { ...selectedreportData.reportData, droppedCharts: updatedCharts } }));

      // Remove chart from reportsList
      dispatch(deletedroppedChartById(id));
      console.log("Chart deleted with id:", id);
    } else {
      console.log("Chart not found with id:", id);
    }
  };

  const closeconfirmation = () => {
    // Implement any logic for closing the confirmation if needed
  };

  return (
    <>
      <Form>
        <h4>Are You sure to delete this?</h4>
        <Form.Item name="Confirmation">
          <div className="deltable">
            <Button onClick={() => deletechart(chartId)}>Yes</Button>
            <Button onClick={closeconfirmation}>No</Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default DeleteTable;
