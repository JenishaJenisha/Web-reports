import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  reportLayout:'',
  paperSize:'',
  // chartdata: [],
  chartContent: [],
  droppedChartsLayout:[],
  layoutStyle:[],
  reportHeader:'',
  reportFooter:'',
  droppedCharts:[],
  columnName:[],
  // templateCharts:[],
}

export const chartSlice = createSlice({
  name: 'CHART',
  initialState,
  reducers: {
    setReportLayout:(state,action)=>{
        state.reportLayout = action.payload
        
    },
    setPaperSize:(state,action)=>{
        state.paperSize = action.payload
    },
    // setChartData:(state,action)=>{
    //   state.chartdata = action.payload
    // },
    setChartContent:(state,payload)=>{
      state.chartContent = payload
    },
   
    setLayoutStyle:(state,action)=>{
      state.layoutStyle = action.payload
    },
    setReportHeader:(state,action)=>{
      state.reportHeader = action.payload
    },
    setReportFooter:(state,action)=>{
      state.reportFooter = action.payload
    },
    setDroppedCharts:(state,action)=>{
      state.droppedCharts = action.payload
    },
    // setDroppedTempCharts:(state,action)=>{
    //   state.templateCharts = action.payload
    // },
    resetDroppedCharts:(state)=>{
      state.droppedCharts=[]
    },
    setDroppedChartsLayout:(state,action)=>{
      state.droppedChartsLayout = action.payload
    },
    setColumnName:(state,action)=>{
      state.columnName= action.payload
    }

  },
  
})


export const {setReportLayout,setPaperSize,setChartContent,setLayoutStyle,setReportHeader,setReportFooter,setDroppedCharts,resetDroppedCharts,setDroppedChartsLayout,setColumnName} = chartSlice.actions

export default chartSlice.reducer