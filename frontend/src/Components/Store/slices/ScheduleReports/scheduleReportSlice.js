import { createSlice } from "@reduxjs/toolkit";
const initialState={
   schedulereportdata:[],
   generatedreportList:[],
   recipient:'',
   subject:'',
   message:'',
}
export const scheduleReportSlice = createSlice({
    name:"SCHEDULE_REPORT",
    initialState,
    reducers:{
        updateSchedulerReportData: (state, action) => {
            state.schedulereportdata.push(action.payload);
          },
         
          resetSchedulerForm: (state) => {
           state.schedulereportdata = ''
          },
        deleteScheduledReport: (state, action) => {
            const deletingreportId = action.payload;
            const index = state.schedulereportdata.findIndex(report => report.reportId === deletingreportId);
            if (index !== -1) {
                state.schedulereportdata.splice(index, 1);  
            }
        },
        setGeneratedReportList:(state,action)=>{
            // const { selectedreportinreportList, formatReportGeneratingTime } = action.payload;
            // state.generatedreportList.push({
            //     selectedreportinreportList,
            //     formatReportGeneratingTime,
            //   });
            state.generatedreportList.push(action.payload)
          },
         setRecipient:(state,action)=>{
            state.recipient = action.payload
         },
         setSubject:(state,action)=>{
            state.subject = action.payload
         },
         setMessage:(state,action)=>{
            state.message = action.payload
         }

    },
   
})
export const { updateSchedulerReportData,resetSchedulerForm,deleteScheduledReport,setGeneratedReportList,
    setRecipient,setSubject,setMessage,
}=scheduleReportSlice.actions
export default scheduleReportSlice.reducer