import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Pages/Dashboard/dashboard';
import SpreadSheet from './Components/Pages/SpreadSheet/SpreadSheet';
import GeneratedChartPage from './Components/Pages/GenerateChart/GeneratedChartPage';
import Login from './Components/Pages/Login/Login';
import DropTargetContent from './Components/Pages/Dashboard/DropTargetContent';
import DataTable from './Components/Pages/SpreadSheet/DataTable';
import Pdf from './Components/Pages/GenerateChart/pdf';
import TableControl from './Components/Pages/Dashboard/table';
import DraggableContent from './Components/Pages/Dashboard/DraggableContent';
import Templates from './Components/Pages/Templates/Templates';
import TemplateList from './Components/Pages/Templates/HomeTemplate';
import Templatecards from './Components/Pages/Templates/templatecards';
import Schedulereportlist from './Components/Pages/ScheduleReports/schedulereportlist';
import AddReportSchedulermodel from './Components/Pages/ScheduleReports/addReportSchedulermodel';
import Reports from './Components/Pages/Reports/Reports';
import ExistingReports from './Components/Pages/Reports/existingReports';
import ReportTemplates from './Components/Pages/Reports/reportTemplate';
import ReportViewer from './Components/Pages/ReportViewer/reportViewer';

function App() {
  return (
    <>
    
    <Routes>
    <Route path="/" element={<TemplateList/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/spreadsheet" element={<SpreadSheet/>}/> 
      <Route path="/generatedChart" element={<GeneratedChartPage/>} />
      <Route path="/droptargetcontent" element={<DropTargetContent/>}/>
      <Route path="/dataTable" element={<DataTable/>}/>
      <Route path="/ex" element={<DraggableContent/>}/>
      <Route path="/pdf" element={<Pdf/>}/>
      <Route path="/table" element={<TableControl/>}/>
      <Route path="/template/:templateName/:templateId" element={<Templates/>} />
      <Route path="/templatelist/template/:templateName/:templateId" element={<Templates/>}/>
      <Route path="/templatelist" element={<TemplateList/>}/>
      <Route path='/templatecards' element={<Templatecards/>}/>
      <Route path='/Schedulereportlist' element={<Schedulereportlist/>}/>
      <Route path="/AddReportSchedulermodel" element={<AddReportSchedulermodel/>}/>
      <Route path='/reports' element={<Reports/>}/>
      <Route path='/existingReport' element={<ExistingReports/>}/>
      <Route path='/reportTemplate' element={<ReportTemplates/>}/>
      <Route path='/reportViewer'  element={<ReportViewer/>}/>
    
      </Routes>
    </>
  );
}

export default App;
