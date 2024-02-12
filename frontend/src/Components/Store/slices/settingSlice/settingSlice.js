import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collapsed:false,
    footerTextboxes:[],
    headerTextboxes:[],
    droppedLabels:[],
    droppedLogos:[],
    pageBreaks:[],
    detailTextboxes:[],
    detailReportTextboxes:[],
    detailLogos:[],
    detailLabels:[],
    detailreportLogos:[],
    detailreportLabels:[],
    footerlabels:[],
    footerlogos:[],
    reportdata:[],
    templatelist:[],
    textboxInput:{},
    logosrc:{},
    textboxTop:'',
    textboxLeft:'',

}
export const settingSlice = createSlice({
  name: 'SETTINGS',
  initialState,
  reducers: {
    clickCollapsed:(state)=>{
      state.collapsed = !state.collapsed
    },
    setFooterTextboxes:(state,action)=>{
      state.footerTextboxes = action.payload
    },
    setHeaderTextboxes:(state,action)=>{
      state.headerTextboxes = action.payload
    },
    setDroppedLabels:(state,action)=>{
      state.droppedLabels = action.payload
    },
    setDroppedLogos:(state,action)=>{
      state.droppedLogos = action.payload
    },
    setPageBreaks:(state,action)=>{
      state.pageBreaks = action.payload
    },
    setDetailTextboxes:(state,action)=>{
      state.detailTextboxes = action.payload
    },
    setDetailReportTextboxes:(state,action)=>{
      state.detailReportTextboxes = action.payload
    },
    setDetailLogos:(state,action)=>{
      state.detailLogos = action.payload
    },
    setDetailLabels:(state,action)=>{
      state.detailLabels = action.payload
    },
    setDetailReportLogos:(state,action)=>{
      state.detailreportLogos = action.payload
    },
    setDetailReportLabels:(state,action)=>{
      state.detailreportLabels = action.payload
    },
    setFooterlabels:(state,action)=>{
      state.footerlabels = action.payload
    },
    setFooterlogos:(state,action)=>{
      state.footerlogos = action.payload
    },
    setReportdata:(state,action)=>{
      state.reportdata = action.payload
    },
    loadTemplate:(state,action)=>{
      state.reportdata = action.payload
    },
    setTemplateList:(state,action)=>{
      state.templatelist.push(action.payload); 
    },
    resetDroppedContent:(state)=>{
      state.footerTextboxes=[];
      state.footerlogos=[];
      state.footerlabels=[];
      state.headerTextboxes=[];
      state.droppedLabels=[];
      state.droppedLogos =[];
      state.pageBreaks =[];
      state.detailTextboxes=[];
      state.detailReportTextboxes=[];
      state.detailLogos=[];
      state.detailLabels =[];
      state.detailreportLogos=[];
      state.detailreportLabels =[];
      
    },
    setTextboxInput:(state,action)=>{
      const {id,text} =action.payload
      state.textboxInput[id] = text
    },
    setLogosrc:(state,action)=>{
      const { id, src } = action.payload;
      state.logosrc[id] = src;
     
    },
    setTextboxTop:(state,action)=>{
      const {id,top} =action.payload
      state.textboxTop[id] = top
    },
    
    setTextboxLeft:(state,action)=>{
      const {id,left} =action.payload
      state.textboxLeft[id] = left
    },
    deletetextboxbyID:(state,action)=>{
      const deletedtextboxId = action.payload;
      const newHeaderTextboxes = state.headerTextboxes?.filter((deltextbox)=>deltextbox?.id!==deletedtextboxId);
      const newFooterTextboxes = state.footerTextboxes?.filter((deltextbox)=>deltextbox?.id!==deletedtextboxId);
      const newDetailReportTextboxes =state.detailReportTextboxes?.filter((deltextbox)=>deltextbox?.id!==deletedtextboxId);
      const newDetailTextboxes = state.detailTextboxes?.filter((deltextbox)=>deltextbox?.id!==deletedtextboxId);
      return{
        ...state,
        headerTextboxes:newHeaderTextboxes,
        footerTextboxes:newFooterTextboxes,
        detailTextboxes:newDetailTextboxes,
        detailReportTextboxes:newDetailReportTextboxes
      }
    }

  }
})


export const {clickCollapsed,setFooterTextboxes,
  setHeaderTextboxes,setDroppedLabels,setDroppedLogos,
  setPageBreaks,setDroppedTextboxes,setDetailTextboxes,
  setDetailReportTextboxes,setDetailLogos,setDetailLabels,
  setDetailReportLogos,setDetailReportLabels,setFooterlabels,
  setFooterlogos,setReportdata,loadTemplate,setTemplateList,resetDroppedContent,
  setTextboxInput,setLogosrc,setTextboxTop,setTextboxLeft,deletetextboxbyID} = settingSlice.actions

export default settingSlice.reducer