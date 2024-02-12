
import { createSlice } from '@reduxjs/toolkit';
const initialState={
    sheetdata: null,
    sheetName:'datatable',
    filterData: null
}
const spreadsheetDataSlice = createSlice({
  name: 'SPREADSHEETDATA',
  initialState, 
  reducers: {
    setSpreadsheetData: (state, action) => {
      state.sheetdata = action.payload
    },
    clearSpreadsheetData: (state) => {
      // Clear the spreadsheet data when needed
      state.sheetdata = null
    },
    setSheetName: (state, action) => {
        state.sheetName = action.payload;
      },
      setfilterData:(state,action)=>{
        state.filterData = action.payload;
      }
  },
});

export const { setSpreadsheetData, clearSpreadsheetData,setSheetName ,setfilterData} = spreadsheetDataSlice.actions;
export const setDataTableAction = (dataTable) => ({
    type: 'SET_DATA_TABLE', // Replace with your actual action type
    payload: dataTable,
  });
export default spreadsheetDataSlice.reducer;
