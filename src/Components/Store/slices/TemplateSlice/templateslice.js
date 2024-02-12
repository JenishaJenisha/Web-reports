import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  templates: [], 
  templateDatabyId:[],
  selectedTempData:[],
  templateName:'',
  templateId: null,
  createdAt:null,
  modifiedAt:null,
  saveastempName : '',
  saveastempId: null,
  saveastemplates:[],
  saveastemplatesData:[],
  reportgenerator: false,
  generatereportcomponent:false,
  spreadSheatComponent:false,
  templateComponent:false,
  datasetComponent:false,
  dashboardcomponent:false,
  schedulereportcomponent:false,
  reportComponent: false,
  existingReportComponent:false,
  selectedtemplateComponent: false,
  selectedReportTemplateComponent: false,
  reportViewerComponent:false,
  isSaveasTemplate:false,
  textboxwidth:'',
  textboxheight:'',
  tempdetailtextboxes:[],
  tempdetaillogos:[],
  tempdataillabels:[],
  tempheaderTextboxes:[],
  tempDroppedLabels:[],
  tempDroppedLogos:[],
  tempPagebreak:[],
  tempDetailReportTextbox:[],
  tempDetailreportLogos:[],
  tempDetailreportLabels:[],
  tempFooterlabels:[],
  tempFooterlogos:[],
  tempFooterTextboxes:[],
  tempcharts:[],
};
const templateSlice = createSlice({
  name: "TEMPLATE",
  initialState, 
  reducers: {
    setTemplate: (state, action) => {
      state.templates.push(action.payload);
      
    },
    setTempCharts:(state,action)=>{
      state.tempcharts = action.payload
    },
   
    setReportViewerComponent:(state,action)=>{
      state.reportViewerComponent = action.payload
    },
    setDatasetComponent:(state,action)=>{
      state.datasetComponent = action.payload
    },
    updateTemplateById: (state, action) => {
      const { templateIndex, updatedTemplateData } = action.payload;
      state.templates = state.templates.map((template) =>
        template.index === templateIndex ? { ...template, ...updatedTemplateData } : template
      );
     state.templates[templateIndex]=updatedTemplateData
    },
    updateSaveasTemplateById: (state, action) => {
      const { saveasTempIndex, updatedsaveasTemplateData } = action.payload;
      state.saveastemplates = state.saveastemplates.map((template) =>
        template.index === saveasTempIndex ? { ...template, ...updatedsaveasTemplateData } : template
      );
  
     state.saveastemplates[saveasTempIndex]=updatedsaveasTemplateData
   
    },
    setTemplateDatabyId :(state,action)=>{
      state.templateDatabyId=action.payload
    },
    setSelectedTempData: (state,action)=>{
      state.selectedTempData=action.payload
    },
   
    setTemplateName:(state,action)=>{
      state.templateName=action.payload
    } ,
    setTemplateId:(state,action)=>{
      state.templateId = action.payload
    } ,
    setSaveastempName:(state,action)=>{
      state.saveastempName = action.payload
    },
    setSaveastempId:(state,action)=>{
      state.saveastempId = action.payload
    },
    setSaveastemplates:(state,action)=>{
      state.saveastemplates.push(action.payload);
      state.selectedTempData = action.payload
    },
    setSelectedsaveasTempData:(state,action)=>{
      state.saveastemplatesData =action.payload
    },
    setReportGenerator :(state)=>{
      state.reportgenerator = true
    },
    setGeneratereportcomponent:(state,action)=>{
      state.generatereportcomponent = action.payload
    },
    setSpreadSheatComponent:(state,action)=>{
      state.spreadSheatComponent = action.payload
    },
    setTemplateComponent:(state,action)=>{
      state.templateComponent =  action.payload
    },
    setSelectedTemplateComponent:(state,action)=>{
      state.selectedtemplateComponent = action.payload
    },
    setDashboardcomponent:(state,action)=>{
      state.dashboardcomponent =  action.payload
    },
    setSchedulereportcomponent:(state,action)=>{
      state.schedulereportcomponent = action.payload
    },
   setReportComponent:(state,action)=>{
    state.reportComponent = action.payload
  },
   setExistingReportComponent:(state,action)=>{
    state.existingReportComponent = action.payload
   },
   setCreatedAt:(state,action)=>{
    state.createdAt = action.payload
   },
   setModifiedAt:(state,action)=>{
    state.modifiedAt = action.payload
   },
   setSelectedReportTemplateComponent:(state,action)=>{
    state.selectedReportTemplateComponent = action.payload
   },
   setIsSaveasTemplate:(state,action)=>{
    state.isSaveasTemplate = action.payload
   },
   setTextboxwidth:(state,action)=>{
    state.textboxwidth = action.payload
   },
   setTextboxheight:(state,action)=>{
    state.textboxheight = action.payload
   },
   deletetemplatetextboxbyID:(state,action)=>{
    const deltemptextboxId = action.payload;
      const newtempHeaderTextboxes = state.selectedTempData?.headerTextboxes?.filter((deltextbox)=>deltextbox?.id!==deltemptextboxId);
      const newtempFooterTextboxes = state.selectedTempData?.footerTextboxes?.filter((deltextbox)=>deltextbox?.id!==deltemptextboxId);
      const newtempDetailReportTextboxes =state.selectedTempData?.detailReportTextboxes?.filter((deltextbox)=>deltextbox?.id!==deltemptextboxId);
      const newtempDetailTextboxes = state.selectedTempData?.detailTextboxes?.filter((deltextbox)=>deltextbox?.id!==deltemptextboxId);
      return{
        ...state,
        tempheaderTextboxes:newtempHeaderTextboxes,
        tempFooterTextboxes:newtempFooterTextboxes,
        tempdetailtextboxes:newtempDetailReportTextboxes,
        tempDetailReportTextbox:newtempDetailTextboxes
      }
   },
   setTemplatedetailtextboxes:(state,action)=>{
    state.tempdetailtextboxes = action.payload
   },
   setTemplatedetaillogos:(state,action)=>{
    state.tempdetaillogos = action.payload
   },
   setTemplatedataillabels:(state,action)=>{
    state.tempdataillabels = action.payload
   },
   setTemplateHeadertextboxes:(state,action)=>{
    state.tempheaderTextboxes = action.payload
   },
   setTemplateDroppedLabels:(state,action)=>{
    state.tempDroppedLabels = action.payload
   },
   setTempDroppedLogos:(state,action)=>{
    state.tempDroppedLogos = action.payload
   },
   setTempPagebreak:(state,action)=>{
    state.tempPagebreak = action.payload
   },
   setTempDetailReportTextbox:(state,action)=>{
    state.tempDetailReportTextbox = action.payload
   },
   setTempDetailreportLogos:(state,action)=>{
    state.tempDetailreportLogos = action.payload
   },
   setTempDetailreportLabels:(state,action)=>{
    state.tempDetailreportLabels = action.payload
   },
   setTempFooterlabels:(state,action)=>{
    state.tempFooterlabels = action.payload
   },
   setTempFooterlogos:(state,action)=>{
    state.tempFooterlogos = action.payload
   },
   setTempFooterTextboxes:(state,action)=>{
    state.tempFooterTextboxes = action.payload
   },
  },
});

export const { setTemplate,setTemplateDatabyId,setSelectedTempData,setTemplateName ,setTemplateId,setSaveastempName,setSaveastempId,setSaveastemplates,setSelectedsaveasTempData,setReportGenerator,setGeneratereportcomponent,
  setSpreadSheatComponent,setTemplateComponent,setDashboardcomponent,setSchedulereportcomponent,setReportComponent,setExistingReportComponent,setSelectedTemplateComponent,
  setCreatedAt,setModifiedAt,updateTemplateById,updateSaveasTemplateById,setSelectedReportTemplateComponent,setIsSaveasTemplate,
  setTextboxheight,setTextboxwidth,deletetemplatetextboxbyID,
  setTemplatedetailtextboxes,setTemplatedetaillogos,
  setTemplatedataillabels,setTemplateHeadertextboxes,setTempDetailreportLogos,
  setTemplateDroppedLabels,setTempDroppedLogos,setTempPagebreak,setTempDetailReportTextbox,setTempDetailreportLabels,
  setTempFooterlabels,setTempFooterlogos,setTempFooterTextboxes,setTempCharts,setReportViewerComponent,setDatasetComponent,
} = templateSlice.actions;
  
export default templateSlice.reducer;
