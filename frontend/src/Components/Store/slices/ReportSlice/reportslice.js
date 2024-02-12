import { createSlice } from "@reduxjs/toolkit";
const initialState={
    reportName:"",
    reportId:'',
    reportsList:[],
    selectedReportData:[],
    isreportModalOpen:false,
    saveasReports:[],
    saveasReportName:'',
    saveasReportId:null,
    isSaveasReport : false,
    settingsdrawerOpen: false,
    conditionalFormatingDrawer: false,
    optiondrawer:false,
    tableConfiguration:false,
    reportdetailtextboxes:[],
  reportdetaillogos:[],
  reportdataillabels:[],
  reportheaderTextboxes:[],
  reportDroppedLabels:[],
  reportDroppedLogos:[],
  reportPagebreak:[],
  reportDetailReportTextbox:[],
  reportDetailreportLogos:[],
  reportDetailreportLabels:[],
  reportFooterlabels:[],
  reportFooterlogos:[],
  reportFooterTextboxes:[],
  reportcharts:[],
  addingpoints:[],
  formatconditions:[],
  addPointPopover: false,
  selectedTagtoEdit:'',
  editformatcondition:'',
  // conditiontypeValueIcon:'',
  swapcolumn:false,
  tableTextFormat:[],
  tabledata:[],
  
};
const reportSlice = createSlice({
    name:"REPORTS",
    initialState,
    reducers:{
        setReportName:(state,action)=>{
            state.reportName = action.payload
        },
        setReportId:(state,action)=>{
            state.reportId = action.payload
        },
        setReports:(state,action)=>{
            state.reportsList.push(action.payload) 
        },
       
        setSelectedReportData:(state,action)=>{
            state.selectedReportData = action.payload
        },
        setIsReportModalOpen:(state)=>{
            state.isreportModalOpen = !state.isreportModalOpen
        },
        updateReportTemplateById: (state, action) => {
            const { reportIndex, updatedReportData } = action.payload;
            state.reportsList = state.reportsList.map((report) =>
            report.index === reportIndex ? { ...report, ...updatedReportData } : report
            );
           state.reportsList[reportIndex]=updatedReportData
          
          },
          updateSaveasReportTemplateById: (state, action) => {
            const { saveasreportIndex, updatedsaveasReportData } = action.payload;
            state.saveasReports = state.saveasReports.map((report) =>
            report.index === saveasreportIndex ? { ...report, ...updatedsaveasReportData } : report
            );
           state.saveasReports[saveasreportIndex]=updatedsaveasReportData
          
          },
          setSaveasReportList:(state, action)=>{
            state.saveasReports.push(action.payload)
            state.selectedReportData = action.payload
          },
          setSaveasReportName:(state,action)=>{
            state.saveasReportName = action.payload
          },
          setSaveasReportId:(state,action)=>{
            state.saveasReportId = action.payload
          },
          setIsSaveasReport: (state,action)=>{
            state.isSaveasReport = action.payload
          },
          setSettingDrawerOpen:(state,action)=>{
            state.settingsdrawerOpen = action.payload
          },
          setConditionalFormatingDrawer:(state,action)=>{
            state.conditionalFormatingDrawer = action.payload
          },
          setOptiondrawer:(state,action)=>{
            state.optiondrawer = action.payload
          },
          setTableconfiguartion:(state,action)=>{
            state.tableConfiguration = action.payload
          },
          deletedroppedChartById: (state, action) => {
            const deletingchartId = action.payload;
            const newReportsList = state.reportsList?.filter((delchart) => delchart.reportData?.droppedCharts?.chartId !== deletingchartId);
            const newSelectedReportData = Array.isArray(state.selectedReportData)
    ? state.selectedReportData.filter((delchart) => delchart.chartId !== deletingchartId)
    : state.selectedReportData;
          
            return {
              ...state,
              reportsList: newReportsList,
              selectedReportData: newSelectedReportData,
            };
          },
          setreportCharts:(state,action)=>{
            state.reportcharts = action.payload
          },  
          setreportdetailtextboxes:(state,action)=>{
            state.reportdetailtextboxes = action.payload
           },
           setreportdetaillogos:(state,action)=>{
            state.reportdetaillogos = action.payload
           },
           setreportdataillabels:(state,action)=>{
            state.reportdataillabels = action.payload
           },
           setreportHeadertextboxes:(state,action)=>{
            state.reportheaderTextboxes = action.payload
           },
           setreportDroppedLabels:(state,action)=>{
            state.reportDroppedLabels = action.payload
           },
           setreportDroppedLogos:(state,action)=>{
            state.reportDroppedLogos = action.payload
           },
           setreportPagebreak:(state,action)=>{
            state.reportPagebreak = action.payload
           },
           setreportDetailReportTextbox:(state,action)=>{
            state.reportDetailReportTextbox = action.payload
           },
           setreportDetailreportLogos:(state,action)=>{
            state.reportDetailreportLogos = action.payload
           },
           setreportDetailreportLabels:(state,action)=>{
            state.reportDetailreportLabels = action.payload
           },
           setreportFooterlabels:(state,action)=>{
            state.reportFooterlabels = action.payload
           },
           setreportFooterlogos:(state,action)=>{
            state.reportFooterlogos = action.payload
           },
           setreportFooterTextboxes:(state,action)=>{
            state.reportFooterTextboxes = action.payload
           },
           setAddingPoints:(state,action)=>{
            state.addingpoints.push(action.payload) 
           },
           setselectedTagtoEdit: (state, action) => {
            state.selectedTagtoEdit = action.payload;
          // console.log(tagIdToEdit)
          //   // Find the index of the point to edit
          //   const indexToEdit = state?.addingpoints.findIndex((point) => point.id === tagIdToEdit);
          
          //   if (indexToEdit !== -1) {
          //     const pointToEdit = state.addingpoints[indexToEdit];
          //     state.addingpoints[indexToEdit]= pointToEdit;
         
          //   } 
          },
           setDeleteaddpoint:(state,action)=>{
            const deletingtag = action.payload;
            const index = state.addingpoints.findIndex(data => data.tag === deletingtag);
            if (index !== -1) {
                state.addingpoints.splice(index, 1);  
            }
           },
           setUpdateAddingPoint:(state,action)=>{
            const updatedtag = action.payload;
            console.log(updatedtag,"updatedtag")
            const { tag, operations } = updatedtag;
            console.log(tag,"tag",operations,"operations")
            // Find the index of the point to edit
            const indexToEdit = state.addingpoints.findIndex((point) => point.id === state.selectedTagtoEdit);
      
            if (indexToEdit !== -1) {
              // Update the point in the array
              state.addingpoints[indexToEdit] = updatedtag;
            }

           },
           setFormatConditions:(state,action)=>{
            state.formatconditions.push(action.payload)
           },
           setFormatConditionEdit:(state,action)=>{
      //  const indextoedit = action.payload;
      //  const {index,conditionsByIndex} = indextoedit
      // //  state.formatconditions[index]= conditionsByIndex
          state.editformatcondition = action.payload
       
           },
           setDeleteformatcondition:(state,action)=>{
            const deleteConditionIndex = action.payload;
            const updatedFormatConditions = [
              ...state.formatconditions.slice(0, deleteConditionIndex),
              ...state.formatconditions.slice(deleteConditionIndex + 1),
            ];
            state.formatconditions = updatedFormatConditions;
           },
           setAddPointPopover:(state,action)=>{
            state.addPointPopover = action.payload;
           },
          // setConditiontypeValueIcon:(state,action)=>{
          //   state.conditiontypeValueIcon = action.payload;
          // }
          setSwapColumn:(state,action)=>{
            state.swapcolumn = action.payload
          },
          setTableTextFormat:(state,action)=>{
            state.tableTextFormat = action.payload
          },
          setTableData:(state,action)=>{
            state.tabledata = action.payload
          },

         
    },

});
export const {setReportName,setReportId,
  setReports,setSelectedReportData,setIsReportModalOpen,
  updateReportTemplateById,setSaveasReportList,
  setSaveasReportName,setSaveasReportId,setIsSaveasReport,
  updateSaveasReportTemplateById,setSettingDrawerOpen,
  setConditionalFormatingDrawer,setOptiondrawer,
  setTableconfiguartion,deletedroppedChartById,setreportCharts,
  setreportdetailtextboxes,setreportdetaillogos,setreportdataillabels,
  setreportHeadertextboxes,setreportDroppedLabels,setreportDroppedLogos,
  setreportPagebreak,setreportDetailReportTextbox,setreportDetailreportLogos,
  setreportDetailreportLabels,setreportFooterlabels,setreportFooterlogos,setreportFooterTextboxes,setAddingPoints,
  setDeleteaddpoint,setFormatConditions,setAddPointPopover,setselectedTagtoEdit,setUpdateAddingPoint,setDeleteformatcondition,
  setFormatConditionEdit,setSwapColumn,setTableTextFormat,setTableData,
}= reportSlice.actions;
export default reportSlice.reducer;