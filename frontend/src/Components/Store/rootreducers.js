import { combineReducers } from 'redux';
import chartReducer from './slices/chartSlice/chartSlice'
import settingReducer from './slices/settingSlice/settingSlice';
import spreadsheetDataReducer from './slices/Spreadsheetslice/spreadsheetDataSlice';
import templateReducer from './slices/TemplateSlice/templateslice';
import scheduleReportReducer from './slices/ScheduleReports/scheduleReportSlice';
import reportReducer from './slices/ReportSlice/reportslice';
import datasetReducer from './slices/datasetSlice/datasetslice';
import loginReducer from './slices/LoginSlice/loginslice';
const rootReducer = combineReducers({
    login: loginReducer,
    charts: chartReducer,
    settings: settingReducer,
    spreadsheetData: spreadsheetDataReducer,
    templates: templateReducer,
    scheduledReport: scheduleReportReducer,
    reports: reportReducer,
    datasets:datasetReducer,
  });
  
  export default rootReducer;