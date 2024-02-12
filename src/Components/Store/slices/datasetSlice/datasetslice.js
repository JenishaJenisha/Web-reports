import { createSlice } from "@reduxjs/toolkit";
const initialState={
    datasetList:[],
  dataseteditform:false,
  tagmodalOpen:false,
  datasetformopen:false,
 deletedatasetbyid:'',
 datasetaddTag:[],
 editdatasetbyid:[],
 editdatasetList:[]
};
const datasetSlice = createSlice({
    name:"DATASETS",
    initialState,
    reducers:{
        setDatasetList:(state,action)=>{
            state.datasetList.push(action.payload)
          },
          setDataseteditform:(state,action)=>{
            state.dataseteditform = action.payload
          },
          setTagModalOpen:(state,action)=>{
            state.tagmodalOpen= action.payload
          },
          setDatasetformopen:(state,action)=>{
            state.datasetformopen = action.payload
          },
          setDeletedatasetbyId:(state,action)=>{
            state.deletedatasetbyid = action.payload
            state.datasetList = state.datasetList.filter(data => data.id !== state.deletedatasetbyid);
            
          },
          setdatasetaddTag:(state,action)=>{
            state.datasetaddTag.push(action.payload)
          },
          setEditDatasetList:(state,action)=>{
            state.editdatasetList = action.payload
          },

          setEditdatasetbyid:(state,action)=>{
            const {datasetName,id} = action.payload
            state.editdatasetbyid= action.payload;
            const editdatasetIndex = state.datasetList.findIndex(data => data.id === id)
            if (editdatasetIndex !== -1) {
              
              // state.datasetList[editdatasetIndex] = state.editdatasetList;
            }
          
          
          },
    }
});
export const {setDatasetList,setDataseteditform,setTagModalOpen,setDatasetformopen,
    setDeletedatasetbyId,setdatasetaddTag,setEditdatasetbyid,setEditDatasetList
  } = datasetSlice.actions;
export default datasetSlice.reducer;
