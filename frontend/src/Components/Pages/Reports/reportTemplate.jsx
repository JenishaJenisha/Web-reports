import React, { useState, useRef, useEffect } from "react";
import {DeleteOutlined,ToolOutlined,DiffOutlined ,RetweetOutlined} from "@ant-design/icons";
import { useDrop } from "react-dnd";
import {Layout,theme,Button,Modal,Input,DatePicker,Form,Select,TimePicker,Popover, Cascader} from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import BokehChart from "../Dashboard/BokehChart";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DataTable from "../SpreadSheet/DataTable";
import { useDispatch, useSelector } from "react-redux";
import TextBoxComponent from "../Dashboard/TextboxComponent";
import LogoComponent from "../Dashboard/logocontrol";
import LabelComponent from "../Dashboard/LabelControl";
import { v4 as uuidv4 } from "uuid";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DraggableSiderItem from "../Dashboard/DraggableSiderItem";
import DeleteTable from "./deleteTable";
import { setCreatedAt ,setReportComponent,setGeneratereportcomponent,
  setSelectedReportTemplateComponent,setExistingReportComponent,setSpreadSheatComponent,
  setSelectedTemplateComponent,setTemplateComponent,setDashboardcomponent,
  setSchedulereportcomponent, setReportViewerComponent,
} from "../../Store/slices/TemplateSlice/templateslice";
import {setreportCharts,
  setreportdetailtextboxes,setreportdetaillogos,setreportdataillabels,
  setreportHeadertextboxes,setreportDroppedLabels,setreportDroppedLogos,
  setreportPagebreak,setreportDetailReportTextbox,setreportDetailreportLogos,
  setreportDetailreportLabels,setreportFooterlabels,setreportFooterlogos,
  setreportFooterTextboxes,updateReportTemplateById,
  updateSaveasReportTemplateById,setSaveasReportName,
  setSaveasReportId,setSaveasReportList,
  setIsSaveasReport, deletedroppedChartById} from "../../Store/slices/ReportSlice/reportslice";
import { updateSchedulerReportData, setGeneratedReportList } from "../../Store/slices/ScheduleReports/scheduleReportSlice";
import dayjs from "dayjs";
import { setSelectedReportData, setSettingDrawerOpen,setConditionalFormatingDrawer,setOptiondrawer,setTableconfiguartion} from "../../Store/slices/ReportSlice/reportslice";
import Bindingform from "./bindingform";
import OptionForm from "./OptionForm";
import ConditionalFormattingForm from "./ConditionalFormattingForm";
import scheduleicon from "../../../Assets/reportdesignericons/schedule.svg";
import preview from "../../../Assets/reportdesignericons/preview.svg";
import ChartbindingForm from "./chartbindingForm";
import ChartOption from './chartOption';
import { BOKEH_SERVER_URL,BOKEH_SERVER_URL_ENDPOINTS } from "../../Config/config";
import Chartsimg from "../Dashboard/chartsimg";
const ResponsiveGridLayout = WidthProvider(Responsive);
const { Header } = Layout;

const ReportTemplates = ({ id, selectedTempReportdetail }) => {
  const [reportsaveform] = Form.useForm();
  console.log( id, selectedTempReportdetail," id, selectedTempReportdetail")
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const { Option } = Select;
  // console.log(selectedTempReportdetail, "selectedTempReportdetail", id);
  const DroppedReportItem = useSelector((state) => state.reports);
  const {reportdetailtextboxes,
    reportdetaillogos,
    reportdataillabels,reportheaderTextboxes,reportDroppedLabels,reportDroppedLogos,
    reportPagebreak,reportDetailReportTextbox,reportDetailreportLogos,reportDetailreportLabels,
    reportFooterlabels,reportFooterlogos,reportFooterTextboxes,
  }=DroppedReportItem
  // console.log(reportlatedata, "reportlatedata");
  const reportModal = useSelector((state) => state.reports);
  const {
    reportsList,
    saveasReportName,
    saveasReportId,
    saveasReports,
    tableConfiguration
  } = reportModal;
  const generatedSaveasReportId = uuidv4();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const  reportsbindingdrawer = useSelector((state)=>state.reports);
  const {conditionalFormatingDrawer,settingsdrawerOpen,optiondrawer} =reportsbindingdrawer
  const formatconditionslist = useSelector((state)=>state.reports.formatconditions);
  console.log(formatconditionslist,"fcl")
  // console.log(settingsdrawerOpen,"settingsdraweropen")
  useEffect(() => {
    if (selectedTempReportdetail) {
      setreportCharts(selectedTempReportdetail?.selectedReport?.droppedCharts ||selectedTempReportdetail?.reportData?.droppedCharts ||selectedTempReportdetail?.droppedCharts || []);
      dispatch(setreportdetailtextboxes( selectedTempReportdetail?.selectedReport?.detailTextboxes ||selectedTempReportdetail?.reportData?.detailTextboxes ||selectedTempReportdetail?.detailTextboxes || []));
      dispatch(setreportdetaillogos(selectedTempReportdetail?.selectedReport?.detailLogos ||selectedTempReportdetail?.reportData?.detailLogos ||selectedTempReportdetail?.detailLogos ||[] ));
      dispatch(setreportdataillabels(selectedTempReportdetail?.selectedReport?.detailLabels ||selectedTempReportdetail?.reportData?.detailLabels || selectedTempReportdetail?.detailLabels || [] ));
      dispatch(setreportHeadertextboxes(selectedTempReportdetail?.selectedReport?.headerTextboxes || selectedTempReportdetail?.reportData?.headerTextboxes || selectedTempReportdetail?.headerTextboxes || [] ));
      dispatch(setreportDroppedLabels(selectedTempReportdetail?.selectedReport?.droppedLabels || selectedTempReportdetail?.reportData?.droppedLabels || selectedTempReportdetail?.droppedLabels ||[]));
      dispatch(setreportDroppedLogos(selectedTempReportdetail?.selectedReport?.droppedLogos ||selectedTempReportdetail?.reportData?.droppedLogos ||selectedTempReportdetail?.droppedLogos ||[]));
      dispatch(setreportPagebreak( selectedTempReportdetail?.selectedReport?.pageBreaks || selectedTempReportdetail?.reportData?.pageBreaks || selectedTempReportdetail?.pageBreaks ||[]) );
      dispatch(setreportDetailReportTextbox(selectedTempReportdetail?.selectedReport?.detailReportTextboxes ||selectedTempReportdetail?.reportData?.detailReportTextboxes ||selectedTempReportdetail?.detailReportTextboxes || []));
      dispatch(setreportDetailreportLogos(selectedTempReportdetail?.selectedReport?.detailreportLogos ||selectedTempReportdetail?.reportData?.detailreportLogos || selectedTempReportdetail?.detailreportLogos ||[]));
      dispatch(setreportDetailreportLabels(selectedTempReportdetail?.selectedReport?.detailreportLabels ||selectedTempReportdetail?.reportData?.detailreportLabels || selectedTempReportdetail?.detailreportLabels || []));
      dispatch(setreportFooterlabels(selectedTempReportdetail?.selectedReport?.footerlabels ||selectedTempReportdetail?.reportData?.footerlabels ||selectedTempReportdetail?.footerlabels ||[]));
      dispatch(setreportFooterlogos( selectedTempReportdetail?.selectedReport?.footerlogos ||selectedTempReportdetail?.reportData?.footerlogos || selectedTempReportdetail?.footerlogos||[]) );
      dispatch(setreportFooterTextboxes( selectedTempReportdetail?.selectedReport?.footerTextboxes ||selectedTempReportdetail?.reportData?.footerTextboxes || selectedTempReportdetail?.footerTextboxes || []));
    }
  }, [dispatch,selectedTempReportdetail]);

  
  const filterData = useSelector((state) => state.spreadsheetData.filterData);
  const chartPositionsRef = useRef([]);

  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 9);

    return `${timestamp}-${randomId}`;
  };
  // const [saveasreports,setSaveasReports]= useState(false)
  useEffect(()=>{
//  dispatch(setreportCharts(selectedTempReportdetail?.selectedReport?.droppedCharts ||selectedTempReportdetail?.reportData?.droppedCharts || selectedTempReportdetail?.droppedCharts))
 dispatch(setreportdetailtextboxes(selectedTempReportdetail?.selectedReport?.detailTextboxes ||selectedTempReportdetail?.reportData?.detailTextboxes ||selectedTempReportdetail?.detailTextboxes))
 dispatch(setreportdetaillogos(selectedTempReportdetail?.selectedReport?.detailLogos ||selectedTempReportdetail?.reportData?.detailLogos ||selectedTempReportdetail?.detailLogos));
 dispatch(setreportdataillabels(selectedTempReportdetail?.selectedReport?.detailLabels ||selectedTempReportdetail?.reportData?.detailLabels ||selectedTempReportdetail?.detailLabels));
 dispatch(setreportHeadertextboxes(selectedTempReportdetail?.selectedReport?.headerTextboxes || selectedTempReportdetail?.reportData?.headerTextboxes || selectedTempReportdetail?.headerTextboxes ));
 dispatch(setreportDroppedLabels( selectedTempReportdetail?.selectedReport?.droppedLabels ||  selectedTempReportdetail?.reportData?.droppedLabels ||selectedTempReportdetail?.droppedLabels));
 dispatch(setreportDroppedLogos(selectedTempReportdetail?.selectedReport?.droppedLogos || selectedTempReportdetail?.reportData?.droppedLogos || selectedTempReportdetail?.droppedLogos));
 dispatch(setreportPagebreak(selectedTempReportdetail?.selectedReport?.pageBreaks ||selectedTempReportdetail?.reportData?.pageBreaks || selectedTempReportdetail?.pageBreaks));
 dispatch(setreportDetailReportTextbox(selectedTempReportdetail?.selectedReport?.detailReportTextboxes || selectedTempReportdetail?.reportData?.detailReportTextboxes || selectedTempReportdetail?.detailReportTextboxes));
 dispatch(setreportDetailreportLogos(selectedTempReportdetail?.selectedReport?.detailreportLogos ||  selectedTempReportdetail?.reportData?.detailreportLogos || selectedTempReportdetail?.detailreportLogos));
 dispatch(setreportDetailreportLabels(selectedTempReportdetail?.selectedReport?.setDetailLabels || selectedTempReportdetail?.reportData?.setDetailLabels || selectedTempReportdetail?.setDetailLabels));
 dispatch(setreportFooterlabels(selectedTempReportdetail?.selectedReport?.footerlabels || selectedTempReportdetail?.reportData?.footerlabels || selectedTempReportdetail?.footerlabels));
 dispatch(setreportFooterlogos(selectedTempReportdetail?.selectedReport?.footerlogos ||selectedTempReportdetail?.reportData?.footerlogos || selectedTempReportdetail?.footerlogos));
 dispatch(setreportFooterTextboxes(selectedTempReportdetail?.selectedReport?.footerTextboxes ||selectedTempReportdetail?.reportData?.footerTextboxes ||selectedTempReportdetail?.footerTextboxes));

  },[])
 const[reportcharts, setreportCharts] = useState(selectedTempReportdetail?.selectedReport?.droppedCharts ||selectedTempReportdetail?.reportData?.droppedCharts || selectedTempReportdetail?.droppedCharts);
 console.log("reportchart",reportcharts)
  // const [tempdetailtextboxes, setTemplatedetailtextboxes] = useState(selectedTempReportdetail?.selectedReport?.detailTextboxes ||selectedTempReportdetail?.reportData?.detailTextboxes ||selectedTempReportdetail?.detailTextboxes);
  // const [tempdetaillogos, setTemplatedetaillogos] = useState( selectedTempReportdetail?.selectedReport?.detailLogos ||selectedTempReportdetail?.reportData?.detailLogos ||selectedTempReportdetail?.detailLogos);
  // const [tempdataillabels, setTemplatedataillabels] = useState(selectedTempReportdetail?.selectedReport?.detailLabels ||selectedTempReportdetail?.reportData?.detailLabels ||selectedTempReportdetail?.detailLabels);
  // const [tempheaderTextboxes, setTemplateHeadertextboxes] = useState( selectedTempReportdetail?.selectedReport?.headerTextboxes || selectedTempReportdetail?.reportData?.headerTextboxes || selectedTempReportdetail?.headerTextboxes );
  // const [tempDroppedLabels, setTemplateDroppedLabels] = useState( selectedTempReportdetail?.selectedReport?.droppedLabels ||  selectedTempReportdetail?.reportData?.droppedLabels ||selectedTempReportdetail?.droppedLabels);
  // const [tempDroppedLogos, setTempDroppedLogos] = useState( selectedTempReportdetail?.selectedReport?.droppedLogos || selectedTempReportdetail?.reportData?.droppedLogos || selectedTempReportdetail?.droppedLogos);
  // const [tempPagebreak, setTempPagebreak] = useState( selectedTempReportdetail?.selectedReport?.pageBreaks ||selectedTempReportdetail?.reportData?.pageBreaks || selectedTempReportdetail?.pageBreaks );
  // const [tempDetailReportTextbox, setTempDetailReportTextbox] = useState(selectedTempReportdetail?.selectedReport?.detailReportTextboxes || selectedTempReportdetail?.reportData?.detailReportTextboxes || selectedTempReportdetail?.detailReportTextboxes);
  // const [tempDetailreportLogos, setTempDetailreportLogos] = useState(selectedTempReportdetail?.selectedReport?.detailreportLogos ||  selectedTempReportdetail?.reportData?.detailreportLogos || selectedTempReportdetail?.detailreportLogos);
  // const [tempDetailreportLabels, setTempDetailreportLabels] = useState( selectedTempReportdetail?.selectedReport?.setDetailLabels || selectedTempReportdetail?.reportData?.setDetailLabels || selectedTempReportdetail?.setDetailLabels );
  // const [tempFooterlabels, setTempFooterlabels] = useState( selectedTempReportdetail?.selectedReport?.footerlabels || selectedTempReportdetail?.reportData?.footerlabels || selectedTempReportdetail?.footerlabels);
  // const [tempFooterlogos, setTempFooterlogos] = useState( selectedTempReportdetail?.selectedReport?.footerlogos ||selectedTempReportdetail?.reportData?.footerlogos || selectedTempReportdetail?.footerlogos );
  // const [tempFooterTextboxes, setTempFooterTextboxes] = useState( selectedTempReportdetail?.selectedReport?.footerTextboxes ||selectedTempReportdetail?.reportData?.footerTextboxes ||selectedTempReportdetail?.footerTextboxes );

  const handleTextboxChange = (id, newText, dropZone) => {
    switch (dropZone) {
      case "reportheader":
        const updatedHeaderTextboxes = reportheaderTextboxes.map((textbox) =>
          textbox.id === id ? { ...textbox, text: newText } : textbox
        );
        dispatch(setreportHeadertextboxes(updatedHeaderTextboxes));
        break;
      case "pagefooter":
        const updatedFooterTextboxes = reportFooterTextboxes.map((textbox) =>
          textbox.id === id ? { ...textbox, text: newText } : textbox
        );
        dispatch(setreportFooterTextboxes(updatedFooterTextboxes));
        break;
      case "details":
        const updatedDetailsTextboxes = reportdetailtextboxes.map((textbox) =>
          textbox.id === id ? { ...textbox, text: newText } : textbox
        );
       dispatch(setreportdetailtextboxes(updatedDetailsTextboxes));
        break;
      case "Detailreport":
        const updatedDetailReportTextboxes = reportDetailReportTextbox.map(
          (textbox) =>
            textbox.id === id ? { ...textbox, text: newText } : textbox
        );
        dispatch(setreportDetailReportTextbox(updatedDetailReportTextboxes));
        break;
      default:
        break;
    }
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "SUBMENU_ITEM",
    canDrop: (item, monitor) => {
      const allowedDropZones = [
        "details",
        "reportheader",
        "Detailreport",
        "pagefooter",
        "topmargin",
        "marginbottom",
      ];
      const dropPosition = monitor.getClientOffset();
      const dropTargetElement = document.elementFromPoint(
        dropPosition.x,
        dropPosition.y
      );

      if (
        !dropTargetElement ||
        !allowedDropZones.includes(dropTargetElement.id)
      ) {
        return false;
      }

      if (item.id >= 14 && item.id <= 17) {
        if (
          dropTargetElement.id === "reportheader" ||
          dropTargetElement.id === "pagefooter" ||
          dropTargetElement.id === "details" ||
          dropTargetElement.id === "Detailreport"
        ) {
          return true;
        }
      } else if (item.id >= 2 && item.id <= 13) {
        if (dropTargetElement.id === "Detailreport") {
          return true;
        }
      }

      return false;
    },
    drop: async (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const { x, y } = clientOffset;
      const dropTargetElement = document.elementFromPoint(x, y);
      const rect = dropTargetElement.getBoundingClientRect();
      const offsetX = x - rect.left;
      const offsetY = y - rect.top;
      const addPageBreak = (offsetX, offsetY) => {
        dispatch(setreportPagebreak([...reportPagebreak, { offsetX, offsetY }]));
      };
      
      if (item.chartType === 14) {
        const clientOffset = monitor.getClientOffset();
        const { x, y } = clientOffset;
        addPageBreak(x, y);
      }
      const dropZoneId = dropTargetElement.id;
      if (item.chartType === 15) {
        const newTextbox = {
          id: generateUniqueId(),
          text: "",
          position: { x: offsetX, y: offsetY },
        };
        if (dropZoneId === "reportheader") {
        dispatch(setreportHeadertextboxes([...reportheaderTextboxes, newTextbox]));
        } else if (dropZoneId === "details") {
          dispatch(setreportdetailtextboxes([...reportdetailtextboxes, newTextbox]));
        } else if (dropZoneId === "Detailreport") {
         dispatch(setreportDetailReportTextbox([...reportDetailReportTextbox, newTextbox]));
        } else if (dropZoneId === "pagefooter") {
          dispatch(setreportFooterTextboxes([...reportFooterTextboxes, newTextbox]));
        }
      } else if (item.chartType === 16) {
        const newLabel = {
          id: generateUniqueId(),
          position: { x: offsetX, y: offsetY },
        };
        if (dropZoneId === "reportheader") {
          dispatch(setreportDroppedLabels([...reportDroppedLabels, newLabel]));
        } else if (dropZoneId === "details") {
          dispatch(setreportdataillabels([...reportdataillabels, newLabel]));
        } else if (dropZoneId === "Detailreport") {
          dispatch(setreportDetailreportLabels([...reportDetailreportLabels, newLabel]));
        } else if (dropZoneId === "pagefooter") {
          dispatch(setreportFooterlabels([...reportFooterlabels, newLabel]));
        }
      } else if (item.chartType === 17) {
        const newLogo = {
          id: generateUniqueId(),
          position: { x: offsetX, y: offsetY },
        };
        if (dropZoneId === "reportheader") {
          dispatch(setreportDroppedLogos([...reportDroppedLogos, newLogo]));
        } else if (dropZoneId === "details") {
          dispatch(setreportdetaillogos([...reportdetaillogos, newLogo]));
        } else if (dropZoneId === "Detailreport") {
          dispatch(setreportDetailreportLogos([...reportDetailreportLogos, newLogo]));
        } else if (dropZoneId === "pagefooter") {
          dispatch(setreportFooterlogos([...reportFooterlogos, newLogo]));
        }
      }

      if (
        item.chartType !== 14 &&
        item.chartType !== 15 &&
        item.chartType !== 16 &&
        item.chartType !== 17
      ) {
        const chartId = generateUniqueId()+item.chartType;
        dispatch(setreportCharts([
          ...reportcharts,
          { chartType: item.chartType},
        ]));
        // try {
        //   const token = localStorage.getItem('token');
        //   const endpoint = BOKEH_SERVER_URL_ENDPOINTS.generatechart;
        //   // console.log("Sending chart type:", item.chartType);
        //   const response = await fetch(`${BOKEH_SERVER_URL}${endpoint.url}`, {
        //     method: endpoint.method.includes('POST') ? 'POST' : 'GET',
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Authorization": `Bearer ${token}`,
        //     },
        //     body: JSON.stringify({
        //       chartType: item.chartType,
        //       chartData: item.chartData,
        //       // chartId: item.chartId
            
        //     }),
        //   });

        //   if (response.ok) {
        //     const { chartData } = await response.json();
        //     console.log(chartData,"chartdata")
        //     const chartId = generateUniqueId()+item.chartType;
        //     dispatch(setreportCharts([
        //       ...reportcharts,
        //       { chartType: item.chartType, chartData: chartData ,chartId:chartId},
        //     ]));
          
        //   } else {
        //     console.error("Error generating chart.");
        //   }
        // } catch (error) {
        //   console.error("Error:", error);
        // }
      }
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const handleChange = (e) => {
    dispatch(setSaveasReportName(e.target.value));
    dispatch(setSaveasReportId(generatedSaveasReportId));
  };
   const ReportTableId = uuidv4()+'report';
  //  const handlereportChange=(e)=>{
  //    dispatch(setReportName(e.target.value))
  //    dispatch(setReportId(generateReportId))
  //  }
  const saveascomponentData = {
    saveasReportId: saveasReportId,
    saveasReportName: saveasReportName,
    droppedCharts:(selectedTempReportdetail?.selectedReport?.droppedCharts && reportcharts) ||(selectedTempReportdetail?.reportData?.droppedCharts && reportcharts) ||(selectedTempReportdetail?.droppedCharts && reportcharts),
    headerTextboxes:(selectedTempReportdetail?.selectedReport?.headerTextboxes &&reportheaderTextboxes) ||(selectedTempReportdetail?.reportData?.headerTextboxes && reportheaderTextboxes) || (selectedTempReportdetail?.headerTextboxes && reportheaderTextboxes),
    droppedLabels:(selectedTempReportdetail?.selectedReport?.droppedLabels && reportDroppedLabels) ||(selectedTempReportdetail?.reportData?.droppedLabels &&reportDroppedLabels) || (selectedTempReportdetail?.droppedLabels && reportDroppedLabels),
    droppedLogos: (selectedTempReportdetail?.selectedReport?.droppedLogos && reportDroppedLogos) ||(selectedTempReportdetail?.reportData?.droppedLogos &&reportDroppedLogos) ||(selectedTempReportdetail?.droppedLogos && reportDroppedLogos),
    pageBreaks:(selectedTempReportdetail?.selectedReport?.pageBreaks && reportPagebreak) ||(selectedTempReportdetail?.reportData?.pageBreaks && reportPagebreak) || (selectedTempReportdetail?.pageBreaks && reportPagebreak),
    detailTextboxes:(selectedTempReportdetail?.selectedReport?.detailTextboxes &&reportdetailtextboxes) ||(selectedTempReportdetail?.reportData?.detailTextboxes && reportdetailtextboxes) ||(selectedTempReportdetail?.detailTextboxes && reportdetailtextboxes),
    detailReportTextboxes:(selectedTempReportdetail?.selectedReport?.detailReportTextboxes && reportDetailReportTextbox) ||(selectedTempReportdetail?.reportData?.detailReportTextboxes && reportDetailReportTextbox) ||(selectedTempReportdetail?.detailReportTextboxes && reportDetailReportTextbox),
    detailLogos:(selectedTempReportdetail?.selectedReport?.detailLogos &&reportdetaillogos) || (selectedTempReportdetail?.reportData?.detailLogos && reportdetaillogos) ||(selectedTempReportdetail?.detailLogos && reportdetaillogos),
    detailLabels:(selectedTempReportdetail?.selectedReport?.detailLabels && reportdataillabels) ||(selectedTempReportdetail?.reportData?.detailLabels && reportdataillabels) ||(selectedTempReportdetail?.detailLabels && reportdataillabels),
    detailreportLogos: (selectedTempReportdetail?.selectedReport?.detailreportLogos && reportDetailreportLogos) ||(selectedTempReportdetail?.reportData?.detailreportLogos &&reportDetailreportLogos) ||(selectedTempReportdetail?.detailreportLogos && reportDetailreportLogos),
    detailreportLabels:(selectedTempReportdetail?.selectedReport?.detailreportLabels &&reportDetailreportLabels) || (selectedTempReportdetail?.reportData?.detailreportLabels && reportDetailreportLabels) ||(selectedTempReportdetail?.detailreportLabels && reportDetailreportLabels),
    footerlabels:(selectedTempReportdetail?.selectedReport?.footerlabels && reportFooterlabels) ||(selectedTempReportdetail?.reportData?.footerlabels &&reportFooterlabels) ||(selectedTempReportdetail?.footerlabels && reportFooterlabels),
    footerlogos:(selectedTempReportdetail?.selectedReport?.footerlogos && reportFooterlogos) ||(selectedTempReportdetail?.reportData?.footerlogos && reportFooterlogos) ||(selectedTempReportdetail?.footerlogos && reportFooterlogos),
    footerTextboxes:(selectedTempReportdetail?.selectedReport?.footerTextboxes && reportFooterTextboxes) ||(selectedTempReportdetail?.reportData?.footerTextboxes && reportFooterTextboxes) ||(selectedTempReportdetail?.footerTextboxes && reportFooterTextboxes),
    createdAt: new Date().getTime(),
    modifiedAt: document.lastModified,
  };
  const handleOk = () => {
    reportsaveform
    .validateFields()
    .then((values) => {
    setIsModalOpen(false);
    dispatch(setCreatedAt(saveascomponentData.createdAt));
    dispatch(setSaveasReportList(saveascomponentData));
    dispatch(setIsSaveasReport(true));
    reportsaveform.resetFields();
    })
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const handlereportOk=()=>{
  //   dispatch(setIsReportModalOpen(false));
  //   dispatch(setReports({selectedTempReportdetail,reportId,reportName}));
  // }
  // const handlereportCancel=()=>{
  //   dispatch(setIsReportModalOpen(false));
  // }
  const handleSaveAsReports = (e) => {
    setIsModalOpen(true);
  };
  const handlesave = () => {
    const reportIndex = reportsList.findIndex(
      (report) => report.reportId === id
    );
    const saveasreportIndex = saveasReports.findIndex((saveasreport)=>saveasreport.saveasReportId=== saveasReportId);
    // console.log(reportIndex, "reportIndex");
    if (reportIndex !== -1) {
      const updatedReportData = {
        reportId: id,
        reportName: selectedTempReportdetail.reportName,
        droppedCharts:
          (selectedTempReportdetail?.selectedReport?.droppedCharts &&
            reportcharts) ||
          (selectedTempReportdetail?.reportData?.droppedCharts && reportcharts) ||
          (selectedTempReportdetail?.droppedCharts && reportcharts),
        headerTextboxes:
          (selectedTempReportdetail?.selectedReport?.headerTextboxes &&
            reportheaderTextboxes) ||
          (selectedTempReportdetail?.reportData?.headerTextboxes &&
            reportheaderTextboxes) ||
          (selectedTempReportdetail?.headerTextboxes && reportheaderTextboxes),
        droppedLabels:
          (selectedTempReportdetail?.selectedReport?.droppedLabels &&
            reportDroppedLabels) ||
          (selectedTempReportdetail?.reportData?.droppedLabels &&
            reportDroppedLabels) ||
          (selectedTempReportdetail?.droppedLabels && reportDroppedLabels),
        droppedLogos:
          (selectedTempReportdetail?.selectedReport?.droppedLogos &&
            reportDroppedLogos) ||
          (selectedTempReportdetail?.reportData?.droppedLogos &&
            reportDroppedLogos) ||
          (selectedTempReportdetail?.droppedLogos && reportDroppedLogos),
        pageBreaks:
          (selectedTempReportdetail?.selectedReport?.pageBreaks &&
            reportPagebreak) ||
          (selectedTempReportdetail?.reportData?.pageBreaks && reportPagebreak) ||
          (selectedTempReportdetail?.pageBreaks && reportPagebreak),
        detailTextboxes:
          (selectedTempReportdetail?.selectedReport?.detailTextboxes &&
            reportdetailtextboxes) ||
          (selectedTempReportdetail?.reportData?.detailTextboxes &&
            reportdetailtextboxes) ||
          (selectedTempReportdetail?.detailTextboxes && reportdetailtextboxes),
        detailReportTextboxes:
          (selectedTempReportdetail?.selectedReport?.detailReportTextboxes &&
            reportDetailReportTextbox) ||
          (selectedTempReportdetail?.reportData?.detailReportTextboxes &&
            reportDetailReportTextbox) ||
          (selectedTempReportdetail?.detailReportTextboxes &&
            reportDetailReportTextbox),
        detailLogos:
          (selectedTempReportdetail?.selectedReport?.detailLogos &&
            reportdetaillogos) ||
          (selectedTempReportdetail?.reportData?.detailLogos &&
            reportdetaillogos) ||
          (selectedTempReportdetail?.detailLogos && reportdetaillogos),
        detailLabels:
          (selectedTempReportdetail?.selectedReport?.detailLabels &&
            reportdataillabels) ||
          (selectedTempReportdetail?.reportData?.detailLabels &&
            reportdataillabels) ||
          (selectedTempReportdetail?.detailLabels && reportdataillabels),
        detailreportLogos:
          (selectedTempReportdetail?.selectedReport?.detailreportLogos &&
            reportDetailreportLogos) ||
          (selectedTempReportdetail?.reportData?.detailreportLogos &&
            reportDetailreportLogos) ||
          (selectedTempReportdetail?.detailreportLogos &&
            reportDetailreportLogos),
        detailreportLabels:
          (selectedTempReportdetail?.selectedReport?.detailreportLabels &&
            reportDetailreportLabels) ||
          (selectedTempReportdetail?.reportData?.detailreportLabels &&
            reportDetailreportLabels) ||
          (selectedTempReportdetail?.detailreportLabels &&
            reportDetailreportLabels),
        footerlabels:
          (selectedTempReportdetail?.selectedReport?.footerlabels &&
            reportFooterlabels) ||
          (selectedTempReportdetail?.reportData?.footerlabels &&
            reportFooterlabels) ||
          (selectedTempReportdetail?.footerlabels && reportFooterlabels),
        footerlogos:
          (selectedTempReportdetail?.selectedReport?.footerlogos &&
            reportFooterlogos) ||
          (selectedTempReportdetail?.reportData?.footerlogos &&
            reportFooterlogos) ||
          (selectedTempReportdetail?.footerlogos && reportFooterlogos),
        footerTextboxes:
          (selectedTempReportdetail?.selectedReport?.footerTextboxes &&
            reportFooterTextboxes) ||
          (selectedTempReportdetail?.reportData?.footerTextboxes &&
            reportFooterTextboxes) ||
          (selectedTempReportdetail?.footerTextboxes && reportFooterTextboxes),
        createdAt:
          selectedTempReportdetail?.selectedReport?.createdAt ||
          selectedTempReportdetail?.reportData?.createdAt,
        modifiedAt: new Date().getTime(),
      };
      dispatch(updateReportTemplateById({ reportIndex, updatedReportData }));
    }
    else if(saveasreportIndex !== -1){
      const updatedsaveasReportData = {
        saveasReportId: selectedTempReportdetail.saveasReportId,
        saveasReportName: selectedTempReportdetail.saveasReportName,
        droppedCharts:(selectedTempReportdetail?.selectedReport?.droppedCharts &&reportcharts) ||(selectedTempReportdetail?.reportData?.droppedCharts && reportcharts) ||(selectedTempReportdetail?.droppedCharts && reportcharts),
        headerTextboxes:(selectedTempReportdetail?.selectedReport?.headerTextboxes && reportheaderTextboxes) ||(selectedTempReportdetail?.reportData?.headerTextboxes && reportheaderTextboxes) ||(selectedTempReportdetail?.headerTextboxes && reportheaderTextboxes),
        droppedLabels: (selectedTempReportdetail?.selectedReport?.droppedLabels && reportDroppedLabels) ||(selectedTempReportdetail?.reportData?.droppedLabels &&reportDroppedLabels) ||(selectedTempReportdetail?.droppedLabels && reportDroppedLabels),
        droppedLogos:(selectedTempReportdetail?.selectedReport?.droppedLogos &&reportDroppedLogos) ||(selectedTempReportdetail?.reportData?.droppedLogos &&reportDroppedLogos) ||(selectedTempReportdetail?.droppedLogos && reportDroppedLogos),
        pageBreaks:(selectedTempReportdetail?.selectedReport?.pageBreaks && reportPagebreak) ||(selectedTempReportdetail?.reportData?.pageBreaks && reportPagebreak) ||(selectedTempReportdetail?.pageBreaks && reportPagebreak),
        detailTextboxes:(selectedTempReportdetail?.selectedReport?.detailTextboxes &&reportdetailtextboxes) ||(selectedTempReportdetail?.reportData?.detailTextboxes &&reportdetailtextboxes) || (selectedTempReportdetail?.detailTextboxes && reportdetailtextboxes),
        detailReportTextboxes:(selectedTempReportdetail?.selectedReport?.detailReportTextboxes &&reportDetailReportTextbox) ||  (selectedTempReportdetail?.reportData?.detailReportTextboxes &&  reportDetailReportTextbox) ||  (selectedTempReportdetail?.detailReportTextboxes &&    reportDetailReportTextbox),
        detailLogos:(selectedTempReportdetail?.selectedReport?.detailLogos &&  reportdetaillogos) || (selectedTempReportdetail?.reportData?.detailLogos &&  reportdetaillogos) ||  (selectedTempReportdetail?.detailLogos && reportdetaillogos),
        detailLabels:(selectedTempReportdetail?.selectedReport?.detailLabels &&   reportdataillabels) || (selectedTempReportdetail?.reportData?.detailLabels &&  reportdataillabels) ||  (selectedTempReportdetail?.detailLabels && reportdataillabels),
        detailreportLogos:(selectedTempReportdetail?.selectedReport?.detailreportLogos &&   reportDetailreportLogos) ||(selectedTempReportdetail?.reportData?.detailreportLogos && reportDetailreportLogos) || (selectedTempReportdetail?.detailreportLogos &&reportDetailreportLogos),
        detailreportLabels:(selectedTempReportdetail?.selectedReport?.detailreportLabels &&   reportDetailreportLabels) || (selectedTempReportdetail?.reportData?.detailreportLabels &&  reportDetailreportLabels) ||(selectedTempReportdetail?.detailreportLabels &&  reportDetailreportLabels),
        footerlabels:(selectedTempReportdetail?.selectedReport?.footerlabels &&  reportFooterlabels) ||(selectedTempReportdetail?.reportData?.footerlabels && reportFooterlabels) || (selectedTempReportdetail?.footerlabels && reportFooterlabels),
        footerlogos:(selectedTempReportdetail?.selectedReport?.footerlogos && reportFooterlogos) ||(selectedTempReportdetail?.reportData?.footerlogos && reportFooterlogos) ||(selectedTempReportdetail?.footerlogos && reportFooterlogos),
        footerTextboxes:(selectedTempReportdetail?.selectedReport?.footerTextboxes && reportFooterTextboxes) ||(selectedTempReportdetail?.reportData?.footerTextboxes &&reportFooterTextboxes) ||(selectedTempReportdetail?.footerTextboxes && reportFooterTextboxes),
        createdAt:selectedTempReportdetail?.selectedReport?.createdAt ||selectedTempReportdetail?.reportData?.createdAt,
        modifiedAt: new Date().getTime(),
      };
      dispatch(updateSaveasReportTemplateById({ saveasreportIndex, updatedsaveasReportData }));

    }
  };

  const handlegeneratereport = () => {
    setOpen(true);
    // const shedulingdata = {
    //   reportId: selectedTempReportdetail.reportId || selectedTempReportdetail.saveasReportId,
    //   reportName:selectedTempReportdetail.reportName || selectedTempReportdetail.saveasReportName,
    // }
    // // dispatch(setIsReportModalOpen(true))
    // console.log("schedule")
    // dispatch(updateSchedulerReportData(shedulingdata))
  };

const Addbtnhandle=async()=>{
 const dt={
 "id":788,
"tourist_name":"jeni",
"tourist_email":"jeni@gmail.com",
"tourist_location":"us",
"createdat":"24/07/2023"
}
const name = "werr"; // Removed the second 'var'
  const age = 23; // Removed the second 'var'

  try {
    const response = await fetch(`${BOKEH_SERVER_URL}${BOKEH_SERVER_URL_ENDPOINTS.addtag.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, age }),
    });

    if (!response.ok) {
      throw new Error('Failed to add on the server');
    }
    const fetchDataResponse = await fetch(`${BOKEH_SERVER_URL}${BOKEH_SERVER_URL_ENDPOINTS.fetchdatatable.url}`);
    const fetchData = await fetchDataResponse.json();

    console.log('Updated data:', fetchData.data);
    // console.log('Color updated successfully');
  } catch (error) {
    console.error('Error updating color on the server:', error);
  }

  console.log("add btn click")
}

  const onCreate = (values) => {
    const formattedValues = {
      key: id,
      reportName: values.reportName,
      startdatetime: dayjs(values.startdatetime).format('DD-MM-YYYY HH:mm:ss'),
      timezone: values.timezone,
      frequency: values.frequency,
      nextGenerationTime: values.nextGenerationTime,
      executionorder: values.executionorder,
    };
console.log(formattedValues,"formattedValues")
    dispatch(updateSchedulerReportData(formattedValues));
    const reportScheduled =()=>{
    const selectedreportinreportList = reportsList?.find(
      (report) => report.reportId === values.reportId
    );
    const selectedreportinSaveasreportList = saveasReports?.find(
      (report) => report.saveasReportId === values.reportId
    );
    const reportGeneratingTime = new Date();
    const formatReportGeneratingTime = reportGeneratingTime.toLocaleString()
    if(selectedreportinreportList){
      dispatch(setSelectedReportData(selectedreportinreportList));
      dispatch(setGeneratedReportList({selectedreportinreportList,formatReportGeneratingTime}))
      // dispatch(setGeneratereportcomponent(true));
      // dispatch(setSelectedReportTemplateComponent(false));
      // dispatch(setExistingReportComponent(false))
      // dispatch(setSpreadSheatComponent(false))
      // dispatch(setSelectedTemplateComponent(false));
      // dispatch(setTemplateComponent(false));
      // dispatch(setDashboardcomponent(false))
      // dispatch(setSchedulereportcomponent(false))
      // dispatch(setReportComponent(false));
      // dispatch(setReportViewerComponent(false));
     
  }
  else if(selectedreportinSaveasreportList){
        dispatch(setSelectedReportData(selectedreportinSaveasreportList));
        dispatch(setGeneratedReportList({selectedreportinSaveasreportList,formatReportGeneratingTime}));
      //   dispatch(setGeneratereportcomponent(true));
      //   dispatch(setSelectedReportTemplateComponent(false));
      // dispatch(setExistingReportComponent(false))
      // dispatch(setSpreadSheatComponent(false))
      // dispatch(setSelectedTemplateComponent(false));
      // dispatch(setTemplateComponent(false));
      // dispatch(setDashboardcomponent(false))
      // dispatch(setSchedulereportcomponent(false))
      // dispatch(setReportComponent(false));
      // dispatch(setReportViewerComponent(false));

  }
}
    setOpen(false);
    
    if (values.frequency === "Weekly") {
    
      //  every week (604800000 milliseconds = 7 days)
      const interval = 604800000;
      const intervalId = setInterval(() => {
         reportScheduled()
         const nextGenerationTime = Date.now() + interval;
      }, interval);

      // Clear the interval when the component is unmounted or when you want to stop the recurring task
      return () => clearInterval(intervalId);
    } else if (values.frequency === "Once") {
      const startDateTime = dayjs(values.startdatetime);
      const currentTime = dayjs();

      const interval = startDateTime.diff(currentTime);
      if (interval > 0) {
        setTimeout(() => {
          // console.log("Running once report...");
          // navigate('generatedChart');
          reportScheduled()
          const nextGenerationTime = Date.now() + interval;
        }, interval);
      } else {
        console.log(
          "Start date and time is in the past. Report will not be scheduled."
        );
      }
    } else if (values.frequency === "24 Hours") {
      const interval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const intervalId = setInterval(() => {
        console.log("Running every 24 hours report...");
        // navigate('generatedChart');
        reportScheduled()
        const nextGenerationTime = Date.now() + interval;
      }, interval);

      return () => clearInterval(intervalId);
    } else if (values.frequency === "Yearly") {
      const startDateTime = dayjs(values.startdatetime);
      const currentTime = dayjs();

      // Calculate the time difference in milliseconds between the current time and the start date and time
      const interval = startDateTime.diff(currentTime);

      if (interval > 0) {
        setTimeout(() => {
          console.log("Running yearly report...");
          // navigate('generatedChart');
          reportScheduled()
          const nextGenerationTime = Date.now() + interval;
        }, interval);
      } else {
        console.log(
          "Start date and time is in the past. Report will not be scheduled."
        );
      }
    } else if (values.frequency === "1 Hour"){
      const interval = 60 * 60 * 1000; // 1 hour in milliseconds
      const intervalId = setInterval(() => {
          console.log("Running every 1 hour report...");
          reportScheduled();
          const nextGenerationTime = Date.now() + interval;
      }, interval);
  
      return () => clearInterval(intervalId);
    }
    else if (values.frequency  === 'Monthly') {
      // Implement logic for Monthly frequency here
      const currentDate = dayjs();
      const scheduledDate = dayjs().date(currentDate.getDate());
  
      // Check if the current date is after the scheduled date for this month
      if (currentDate.isAfter(scheduledDate)) {
        // Schedule the report to run from the 17th of the previous month to the 17th of the current month
        scheduledDate.add(1, 'month');
      }
  
      const interval = scheduledDate.diff(currentDate);
  
      if (interval >= 0) {
        setTimeout(() => {
          console.log("Running monthly report...");
          reportScheduled();
          const nextGenerationTime = Date.now() + interval;
        }, interval);
      } else {
        console.log(
          "Scheduled date is in the past. Report will not be scheduled for this month."
        );
      }
    }
    else if (values.frequency === "12 hours"){
        const interval = 12 * 60 * 60 * 1000; 
        const intervalId = setInterval(() => {
          console.log("Running every 12 hours report...");
          reportScheduled();
          const nextGenerationTime = Date.now() + interval;
        }, interval);
        return () => clearInterval(intervalId);
    }
    else if (values.frequency === "Twice  a day"){
      const interval1 = 12 * 60 * 60 * 1000; 
    const interval2 = 24 * 60 * 60 * 1000; 
    const intervalId1 = setInterval(() => {
        console.log("Running first report of the day...");
        reportScheduled();
        const nextGenerationTime = Date.now() + interval1;
    }, interval1);

    // Set the second interval
    const intervalId2 = setInterval(() => {
        console.log("Running second report of the day...");
        reportScheduled();
        const nextGenerationTime = Date.now() + interval2;
    }, interval2);

    // Return a cleanup function to clear both intervals when the component is unmounted or when you want to stop the recurring task
    return () => {
        clearInterval(intervalId1);
        clearInterval(intervalId2);
    };
    }
    else if (values.frequency === "Thrice a day"){
      const interval1= 8 * 60 * 60 * 1000; // 8 hours in milliseconds
      const interval2= 16 * 60 * 60 * 1000;
      const interval3= 24 * 60 * 60 * 1000;
      // Schedule the report to run thrice a day
      const intervalId1 = setInterval(() => {
        console.log("Running thrice a day report...");
        reportScheduled();
        const nextGenerationTime = Date.now() + interval1;
      }, interval1);
      const intervalId2 = setInterval(() => {
        console.log("Running thrice a day report...");
        reportScheduled();
        const nextGenerationTime = Date.now() + interval2;
      }, interval2);
      const intervalId3 = setInterval(() => {
        console.log("Running thrice a day report...");
        reportScheduled();
        const nextGenerationTime = Date.now() + interval3;
      }, interval3);
  
      // Clear the interval when the component is unmounted or when you want to stop the recurring task
      return () => {
        clearInterval(intervalId1)
        clearInterval(intervalId2)
        clearInterval(intervalId3)
      };
    }
    else if (values.frequency === "2 hours"){
      const interval = 2 * 60 * 60 * 1000; // 12 hours in milliseconds
      const intervalId = setInterval(() => {
        console.log("Running every 2 hours report...");
        reportScheduled();
        const nextGenerationTime = Date.now() + interval;
      }, interval);
      return () => clearInterval(intervalId)
    }
    else if (values.frequency === "8 hours"){
      const interval = 8 * 60 * 60 * 1000; // 12 hours in milliseconds
      const intervalId = setInterval(() => {
        console.log("Running every 8 hours report...");
        reportScheduled();
        const nextGenerationTime = Date.now() + interval;
      }, interval);
      return () => clearInterval(intervalId)
    }
    else if (values.frequency === "6 hours"){
      const interval = 6 * 60 * 60 * 1000; // 12 hours in milliseconds
      const intervalId = setInterval(() => {
        console.log("Running every 6 hours report...");
        reportScheduled();
        const nextGenerationTime = Date.now() + interval;
      }, interval);
      return () => clearInterval(intervalId)
    }
    else if (values.frequency === "4 hours"){
      const interval = 4 * 60 * 60 * 1000; // 12 hours in milliseconds
      const intervalId = setInterval(() => {
        console.log("Running every 4 hours report...");
        reportScheduled();
        const nextGenerationTime = Date.now() + interval;
      }, interval);
      return () => clearInterval(intervalId)
    }
    else if (values.frequency === "Month to day"){
      const currentDate = dayjs();
      const scheduledDate = dayjs().date(currentDate.getDate()).subtract(1, 'month');
  
      // Check if the current date is after the scheduled date for this month
      if (currentDate.isAfter(scheduledDate)) {
        // Schedule the report to run from the 17th of the previous month to today
        scheduledDate.add(1, 'month');
      }
  
      const interval = scheduledDate.diff(currentDate);
  
      if (interval >= 0) {
        setTimeout(() => {
          console.log("Running Month to day report...");
          reportScheduled();
          const nextGenerationTime = Date.now() + interval;
        }, interval);
      } else {
        console.log(
          "Scheduled date is in the past. Report will not be scheduled for this month."
        );
      }
    }
    else if (values.frequency === "Week to day"){
      const currentDate = dayjs();
      const startOfWeek = currentDate.startOf('week');
  
      const interval = currentDate.diff(startOfWeek);
  
      if (interval >= 0) {
        setTimeout(() => {
          console.log("Running Week to day report...");
          reportScheduled();
          const nextGenerationTime = Date.now() + interval;
        }, interval);
      } else {
        console.log(
          "Scheduled date is in the past. Report will not be scheduled for this week."
        );
      }
    }
    else if (values.frequency === "Every 5 Minutes") {
      const interval = 50000;
      const intervalId = setInterval(() => {
        reportScheduled();
        const nextGenerationTime = Date.now() + interval;
      }, interval);
      return () => clearInterval(intervalId);
    }
    
    else if (values.frequency === "Year to day"){
      const currentDate = dayjs();
    const startOfYearDate = dayjs().startOf('year');

    const interval = currentDate.diff(startOfYearDate);

    if (interval >= 0) {
      setTimeout(() => {
        console.log("Running Year to day report...");
        reportScheduled();
        const nextGenerationTime = Date.now() + interval;
      }, interval);
    } else {
      console.log(
        "Scheduled date is in the past. Report will not be scheduled for this year."
      );
    }
    }

    // setIsPlaying(false);
  };
 
  const CustomTimePicker = ({ showHour, showMinute, selected }) => {
    return (
      <div style={{ textAlign: "center", padding: "8px" }}>
        <div>
          <ClockCircleOutlined style={{ marginRight: "4px" }} />

          <span>{selected.format("HH:mm")}</span>
        </div>
        <div>
          <span
            onClick={showHour}
            style={{ cursor: "pointer", marginRight: "8px" }}
          >
            {selected.format("HH")}
          </span>
          <span>:</span>
          <span
            onClick={showMinute}
            style={{ cursor: "pointer", marginLeft: "8px" }}
          >
            {selected.format("mm")}
          </span>
        </div>
      </div>
    );
  };
  const showSettingDrawer = () => {
    dispatch(setSettingDrawerOpen(true));
    console.log("open",settingsdrawerOpen)
  };
  const onsettingdrawerClose = () => {
    dispatch(setSettingDrawerOpen(false));
  };
  
  const showconditionalFormatingdrawer=()=>{
      dispatch(setConditionalFormatingDrawer(true))
  }
  const closeconditionalFormatingdrawer =()=>{
    dispatch(setConditionalFormatingDrawer(false))
  }
  const showOptionsDrawer=()=>{
    dispatch(setOptiondrawer(true))
    console.log(optiondrawer,"optiondrawer")
  }
  const OptionsDrawerClose =()=>{
    dispatch(setOptiondrawer(false))
  }
  const handleReportViewer=()=>{
    setTimeout(function() {
            dispatch(setGeneratereportcomponent(true));
            dispatch(setSelectedReportTemplateComponent(false));
            dispatch(setExistingReportComponent(false))
            dispatch(setSpreadSheatComponent(false))
            dispatch(setSelectedTemplateComponent(false));
            dispatch(setTemplateComponent(false));
            dispatch(setDashboardcomponent(false))
            dispatch(setSchedulereportcomponent(false))
            dispatch(setReportComponent(false));
            dispatch(setReportViewerComponent(false));
    }, 1000);
  }
  const cascaderOptions = [
    {
      
      label:<ToolOutlined/>,
      value: 'dataBinding',
      content: <ChartbindingForm />,
    },
    {
      label: <DiffOutlined />,
      value: 'options',
      content: <OptionForm />,
    },
    {
      label: <DeleteOutlined />,
      value: 'delete',
      content: <DeleteTable  />,
    },
    {
      label: <RetweetOutlined />,
      value: 'conditionalFormatting',
      content: <ConditionalFormattingForm />,
    },
  ];

  const [selectedContent, setSelectedContent] = useState(null);

  const handleCascaderChange = (value) => {
    const selectedOption = cascaderOptions.find((option) => option.value === value[0]);
    if (selectedOption && selectedOption.content) {
      setSelectedContent(selectedOption.content);
    }
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  }; 
  return (
    <>
      <div id={id} className="templatedashboard">
        <Layout>
          <DndProvider backend={HTML5Backend}>
            <div style={{ width: "200px", float: "left" }}>
              <DraggableSiderItem />
            </div>
          </DndProvider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              <div className="tempheader">
                <h2 className="tempname">
                  Report Name:
                 
                      <u>
                        {selectedTempReportdetail.reportName ||
                          selectedTempReportdetail.saveasReportName}
                      </u>
                  
                </h2>
                <div className="btntemplate">
                  <Button className="saveasbtn" onClick={handlesave}>
                    Save
                  </Button>
                  <Button className="saveasbtn" onClick={handleSaveAsReports}>
                    Save as
                  </Button>
                   <Button className="saveasbtn" onClick={handleReportViewer} > 
                   {/* <img src={preview} alt="" height='25px' width='25px'/> */}
                   Preview Report </Button> 
                  <Button className="saveasbtn" onClick={handlegeneratereport} >
                    <div  style={{display:"flex"}}>
                    <img src={scheduleicon} alt="" height='25px' width='25px'/>Schedule Report
                    </div>
                    
                  </Button>
                  {/* <AddReportSchedulermodel open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}/>  */}
                  <Modal
                    open={open}
                    title="Report Scheduler"
                    okText="Create"
                    cancelText="Cancel"
                    onCancel={() => {
                      setOpen(false);
                    }}
                    onOk={() => {
                      form
                        .validateFields()
                        .then((values) => {
                          form.resetFields();
                          onCreate(values);
                        })
                        .catch((info) => {
                          console.log("Validate Failed:", info);
                        });
                    }}
                  >
                    <Form form={form} {...layout} name="form_in_modal">
                      <Form.Item
                        name="reportId"
                        label="Report ID"
                        initialValue={
                          selectedTempReportdetail?.reportId ||
                          selectedTempReportdetail?.saveasReportId
                        }
                        hidden
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="reportName"
                        label="Report Name"
                        rules={[
                          {
                            required: true,
                            message: "Please input the Report Name!",
                          },
                        ]}
                        initialValue={
                          selectedTempReportdetail.reportName ||
                          selectedTempReportdetail.saveasReportName ||
                          saveasReportName
                        }
                      >
                        <Input disabled />
                      </Form.Item>
                      <Form.Item
                        name="startdatetime"
                        label="Start Date and Time"
                        rules={[
                          {
                            required: true,
                            message: "Please select a start date and time!",
                          },
                        ]}
                      >
                        <DatePicker
                          format="YYYY-MM-DD HH:mm"
                          showTime={{
                            format: "HH:mm",
                            picker: <CustomTimePicker />,
                          }}
                        />
                        {/* <TimePicker/> */}
                      </Form.Item>
                      <Form.Item name="Provisiontime" label="Provision Time">
                        <TimePicker />
                      </Form.Item>
                      <Form.Item name="frequency" label="Frequency">
                        <Select>
                        <Option value="1 Hour"></Option>
                        <Option value="2 hours"></Option>
                        <Option value="4 hours"></Option>
                        <Option value="6 hours"></Option>
                        <Option value="8 hours"></Option>
                        <Option value="12 hours"></Option>
                        <Option value="24 Hours"></Option>
                        <Option value="Weekly"></Option>
                        <Option value="Monthly"></Option>
                        <Option value="Yearly"></Option>
                        <Option value="Month to day"></Option>
                        <Option value="Week to day"></Option>
                        <Option value="Year to day"></Option>
                        <Option value="Every 5 Minutes"></Option>
                        {/* <Option value="Once"></Option> */}
                        {/* <Option value="Twice  a day"></Option>
                        <Option value="Thrice a day"></Option> */}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="timezone"
                        label="timezone"
                        rules={[
                          {
                            required: true,
                            message: "Please select a timezone!",
                          },
                        ]}
                      >
                        <Select>
                          <Option value="[GMT+05.30]Indian Standard Time(Asia/Calcutta)"></Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="executionorder" label="Execution Order">
                        <Select>
                          <Option value="First"></Option>
                          <Option value="Second"></Option>
                        </Select>
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>
              </div>
              <Modal
                title="Report Name"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Save"
                className="templatenameform"
              >
                <Form 
                form={reportsaveform}
                name="reportpagesaveform" 
                onFinish={onFinish}
          onFinishFailed={onFinishFailed}
                id="reportpagesaveform">
                <label>
                  <h3>Enter the Report Name:</h3>
                </label>
                <Form.Item name="reportname"
                rules={[
              {
                required: true,
                message: "Please Enter the Template name!"
              }
            ]}>
                <Input
                  type="text"
                  value={saveasReportName}
                  onChange={handleChange}
                  allowClear
                  id={saveasReportId}
                />
                </Form.Item>
                </Form>
                
               
              </Modal>
              {/* <Modal title="Report Name" open={isreportModalOpen} onOk={handlereportOk} onCancel={handlereportCancel} okText='Save' className="templatenameform">
      <label><h3>Enter the Report Name:</h3></label>
        <Input type="text" value={reportName} onChange={handlereportChange} allowClear id={reportId}/>
      </Modal> */}
            </Header>

            <Layout.Content
              ref={drop}
              className="content-container"
              id="contentcontainer"
            >
              <div id="rulers_and_block">
                <div className="ruler_top">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div className="cm">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="mm"></div>
                      ))}
                    </div>
                  ))}
                  <div className="cm"></div>
                </div>

                <div
                  id="ruler_left_and_block"
                  style={{ marginLeft: "-228px", overflow: "true" }}
                >
                  <div className="rulerflex">
                    <div className="verticalheader">Top Margin</div>
                    <div className="topmargin" id="topmargin">
                      <div className="ruler_left">
                        {Array.from({ length: 9 }).map((_, index) => (
                          <div
                            className="cm"
                            style={{ backgroundColor: "yellow" }}
                          >
                            {Array.from({ length: 9 }).map((_, index) => (
                              <div key={index} className="mm"></div>
                            ))}
                          </div>
                        ))}
                        <div className="cm"></div>
                      </div>
                    </div>
                  </div>
                  <div className="rulerflex">
                    <div className="verticalheader">Report Header</div>
                    <div className="reportheader">
                      <div className="contentflex">
                        <div className="ruler_left">
                          {Array.from({ length: 9 }).map((_, index) => (
                            <div
                              className="cm"
                              style={{ backgroundColor: "yellow" }}
                            >
                              {Array.from({ length: 9 }).map((_, index) => (
                                <div key={index} className="mm"></div>
                              ))}
                            </div>
                          ))}
                          <div className="cm"></div>
                        </div>
                        <div id="reportheader" style={{ width: "100%" }}>
                          {reportheaderTextboxes?.map((textbox) => (
                            <div
                              className="rh"
                              key={textbox.id}
                              style={{ width: " 75%" }}
                            >
                              <TextBoxComponent
                                id={textbox.id}
                                text={textbox.text}
                                onChange={(newText) =>
                                  handleTextboxChange(textbox.id, newText, true)
                                }
                                initialPosition={textbox.position}
                              />
                            </div>
                          ))}
                          {reportDroppedLogos?.map((logo, index) => (
                            <div className="rh" key={index}>
                              <LogoComponent id={logo.id} />{" "}
                            </div>
                          ))}
                          {reportDroppedLabels?.map((label, index) => (
                            <div className="rh" key={index}>
                              <LabelComponent id={label.id} />{" "}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rulerflex">
                    <div className="verticalcontent">Details</div>
                    <div className="detailsruler">
                      <div className="contentflex" id="details">
                        <div className="ruler_left">
                          {Array.from({ length: 15 }).map((_, index) => (
                            <div
                              className="cm"
                              style={{ backgroundColor: "yellow" }}
                            >
                              {Array.from({ length: 9 }).map((_, index) => (
                                <div key={index} className="mm"></div>
                              ))}
                            </div>
                          ))}
                          <div className="cm"></div>
                        </div>

                        {reportdetailtextboxes?.map((textbox) => (
                          <div className="rh" key={textbox.id}>
                            <TextBoxComponent
                              id={textbox.id}
                              text={textbox.text}
                              onChange={(newText) =>
                                handleTextboxChange(
                                  textbox.id,
                                  newText,
                                  "details"
                                )
                              }
                              initialPosition={textbox.position}
                            />
                          </div>
                        ))}
                        {reportdetaillogos?.map((logo, index) => (
                          <div className="rh" key={index}>
                            <LogoComponent
                              id={logo.id}
                              initialPosition={logo.position}
                            />{" "}
                          </div>
                        ))}
                        {reportdataillabels?.map((label, index) => (
                          <div className="rh" key={index}>
                            <LabelComponent
                              id={label.id}
                              initialPosition={label.position}
                            />{" "}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="rulerflex">
                    <div className="verticalcontent">Detail Report</div>
                    <div className="detailreportruler">
                      <div className="contentflex">
                        <div className="ruler_left">
                          {Array.from({ length: 15 }).map((_, index) => (
                            <div
                              className="cm"
                              style={{ backgroundColor: "yellow" }}
                            >
                              {Array.from({ length: 9 }).map((_, index) => (
                                <div key={index} className="mm">
                                  {/* {index} */}
                                </div>
                              ))}
                            </div>
                          ))}
                          <div className="cm"></div>
                        </div>
                        <div style={{ width: "100%" }} id="Detailreport">
                          {reportPagebreak?.map((pageBreak, index) => (
                            <div
                              key={index}
                              className="page-break-container"
                              style={{ marginTop: `${pageBreak.position}px` }}
                            >
                              <p className="page-break" />
                              &nbsp;
                            </div>
                          ))}

                          <ResponsiveGridLayout
                            className="layout"
                            ref={chartPositionsRef}
                            breakpoints={{
                              lg: 1280,
                              md: 992,
                              sm: 767,
                              xs: 480,
                              xxs: 0,
                            }}
                            // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                            // cols={{ lg: 6, md: 6, sm: 4, xs: 2, xxs: 1 }}
                            cols={{lg:1,md:1,sm:1,xs:1,xxs:1}}
                      rowHeight={300}
                            isDraggable
                            isRearrangeable
                            isResizable
                            autoSize
                            style={{ cursor: "move" }}
                          >
                            {filterData && filterData.length > 0 ? (
                              <div
                                key="h1-container"
                                style={{ border: "2px solid green" }}
                              >
                                <DataTable data={filterData} />
                              </div>
                            ) : null}

                            {reportcharts?.map((chart, index) => (
                             
                              <div
                                key={`chart-${index}`}
                                id={`chartContainer-${index}`}
                                className="dropcontent chartcontrolconfig"
                                // style={{
                                //   position: "absolute",
                                //   left: chart.x,
                                //   top: chart.y,
                                //   width: chart.w,
                                //   height: chart.h,
                                // }}
                              >
                              
                                <div className="bokehchartconfig "> 
                                {/* <BokehChart
                                  key={index}
                                  className="dashboard-chart"
                                  chartType={chart.chartType}
                                  chartData={chart.chartData}
                                  chartId={chart.chartId}
                                  containerId={`chartContainer-${index}`}
                                /> */}
                                 <Chartsimg chartType={chart.chartType} />
                             </div> 
                             { chart.chartType ===  13 &&
                                <>
                              
                                <div className="reportconfig"key={index} id={ReportTableId}> 
                                <Popover placement="right"title="Data Binding"content={ <Bindingform/>}>
                                {/* <Tooltip title="Settings"> */}
                                  <Button icon={<ToolOutlined/>} />
                                  {/* </Tooltip> */}
                                </Popover>
                                
                                  <Popover title="Options" placement="right" content={<OptionForm/>}>
                                    <Button icon={<DiffOutlined />}  />
                                  </Popover>
                                  <Popover placement="right" content={<DeleteTable chartId={chart.chartId} reportId={id}/>}>
                                  <Button icon={<DeleteOutlined />}/>
                                  </Popover>
                                  <Popover title="Conditional Formatting" placement="right" content={<ConditionalFormattingForm/>}>
                                    <Button  icon={<RetweetOutlined />}/>
                                  </Popover>
  {/* <Button onMouseDown={Addbtnhandle}>+</Button> */}
                                  </div>
                                  {/* {settingsdrawerOpen === true && (
                                    <Drawer
                                    title="Data Binding"
                                    onClose={onsettingdrawerClose}
                                    open={settingsdrawerOpen}
                                    closable={true}
                                    
                                  >
                                    <Bindingform/>
                                  </Drawer>
                                  )}
                                  
                                  {optiondrawer === true  && (
                                 <Drawer
                                 title="Options"
                                 onClose={OptionsDrawerClose}
                                 open={optiondrawer}
                                 closable={true}
                                 
                               >
                                 <OptionForm/>
                               </Drawer>
                              )}
                                  {conditionalFormatingDrawer=== true && (
                                  <Drawer
                                    title="Conditional Formatting"
                                    onClose={closeconditionalFormatingdrawer}
                                    open={conditionalFormatingDrawer}
                                    closable={true}
                                    
                                  >
                                    <ConditionalFormattingForm/>
                                  </Drawer>)}    */}
                                </>  
                             }   
                             {(chart.chartType === 2 || chart.chartType === 3 ||chart.chartType === 4)  &&
                             <>
                              <div className="reportconfig"key={index} id={ReportTableId}> 
                              {/* <Cascader.Panel
        options={cascaderOptions}
        onChange={handleCascaderChange}
        expandTrigger="click"
       
      >
       
      </Cascader.Panel> */}
                                <Popover placement="right"title="Data Binding"content={ <ChartbindingForm/>}> 
                                  <Button icon={<ToolOutlined/>} />    
                                </Popover>
                                
                                  <Popover title="Options" placement="right" content={<ChartOption/>}>
                                    <Button icon={<DiffOutlined />}  />
                                  </Popover>
                                  <Popover placement="right" content={<DeleteTable chartId={chart.chartId} reportId={id}/>}>
                                  <Button icon={<DeleteOutlined />}/>
                                  </Popover>
                                  <Popover title="Conditional Formatting" placement="right" content={<ConditionalFormattingForm/>}>
                                    <Button  icon={<RetweetOutlined />}/>
                                  </Popover>
                                  </div>
                             </>}
                              </div>
                            ))}
                           
                          </ResponsiveGridLayout>

                          {reportDetailReportTextbox?.map((textbox) => (
                            <div className="rh" key={textbox.id}>
                              <TextBoxComponent
                                id={textbox.id}
                                text={textbox.text}
                                onChange={(newText) =>
                                  handleTextboxChange(
                                    textbox.id,
                                    newText,
                                    "Detailreport"
                                  )
                                }
                                initialPosition={textbox.position}
                              />
                            </div>
                          ))}
                          {reportDetailreportLogos?.map((logo, index) => (
                            <div className="rh" key={index}>
                              <LogoComponent
                                id={logo.id}
                                initialPosition={logo.position}
                              />{" "}
                            </div>
                          ))}
                          {reportDetailreportLabels?.map((label, index) => (
                            <div className="rh" key={index}>
                              <LabelComponent
                                id={label.id}
                                initialPosition={label.position}
                              />{" "}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rulerflex">
                    <div className="verticalfooter">Page footer</div>
                    <div className="pagefooterruler">
                      <div className="contentflex" id="pagefooter">
                        <div className="ruler_left">
                          {Array.from({ length: 9 }).map((_, index) => (
                            <div
                              className="cm"
                              style={{ backgroundColor: "yellow" }}
                            >
                              {Array.from({ length: 9 }).map((_, index) => (
                                <div key={index} className="mm"></div>
                              ))}
                            </div>
                          ))}
                          <div className="cm"></div>
                        </div>
                        {reportFooterTextboxes?.map((textbox) => (
                          <div className="fc" key={textbox.id}>
                            <TextBoxComponent
                              id={textbox.id}
                              text={textbox.text}
                              onChange={(newText) =>
                                handleTextboxChange(textbox.id, newText, false)
                              }
                              initialPosition={textbox.position}
                            />
                          </div>
                        ))}
                        {reportFooterlogos?.map((logo, index) => (
                          <div className="rh" key={index}>
                            <LogoComponent
                              id={logo.id}
                              initialPosition={logo.position}
                            />{" "}
                          </div>
                        ))}
                        {reportFooterlabels?.map((label, index) => (
                          <div className="rh" key={index}>
                            <LabelComponent
                              id={label.id}
                              initialPosition={label.position}
                            />{" "}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="rulerflex">
                    <div className="verticalfooter">Margin bottom</div>
                    <div className="marginbottomfooterruler" id="marginbottom">
                      <div className="ruler_left">
                        {Array.from({ length: 9 }).map((_, index) => (
                          <div
                            className="cm"
                            style={{ backgroundColor: "yellow" }}
                          >
                            {Array.from({ length: 9 }).map((_, index) => (
                              <div key={index} className="mm"></div>
                            ))}
                          </div>
                        ))}
                        <div className="cm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Layout.Content>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default ReportTemplates;
