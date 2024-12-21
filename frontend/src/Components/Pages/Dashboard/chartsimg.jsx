import LineChart from '../../../Assets/reportdesignericons/line-chart.svg'
import  PieChart from '../../../Assets/reportdesignericons/pie-chart.svg'
import violin from '../../../Assets/reportdesignericons/violin.svg'
import  table from '../../../Assets/reportdesignericons/table.svg'
import map from '../../../Assets/reportdesignericons/map.svg'
import  candlestickchart from '../../../Assets/reportdesignericons/candlestick-chart.svg'
import correlationchart from '../../../Assets/reportdesignericons/chart.svg'
import  surface from '../../../Assets/reportdesignericons/area-chart.svg'
import barChart from '../../../Assets/reportdesignericons/barchart.svg'
import heatmap from '../../../Assets/reportdesignericons/heatmap.svg';
import contourplot from '../../../Assets/reportdesignericons/contourplot.svg'
import lowdurationchart from '../../../Assets/reportdesignericons/lowduration.svg';
import datatable from '../../../Assets/images/datatable-skeleton.svg';
import SpreadSheet from '../../../Components/Pages/SpreadSheet/SpreadSheet';
// Import other chart components as needed
const Chartsimg = ( chartType ) => {
  console.log(chartType,"chartType from chartsimg")
  switch (chartType.chartType) {
    case 2:
      return <img src={LineChart} alt="" height={'296px'}  />;
    case 3:
      return <img src={PieChart} alt=""height={'296px'}  />;
    case 4:
      return <img src={barChart} alt="" height={'296px'} />;
    case 5:
        return <img src={map} alt=""height={'296px'} />;
    case 6:
        return <img src={surface} alt=""height={'296px'} />;
    case 7:
        return <img src={contourplot} alt=""height={'296px'}  />;
    case 8:
        return <img src={candlestickchart} alt=""height={'296px'} />;
    case 9:
        return<img src={violin} alt=""height={'296px'}  />;
    case 10:
        return <img src={correlationchart} alt="" height={'296px'} />;
    case 11:
        return <img src={lowdurationchart} alt=""height={'296px'} />;
    case 12:
        return <img src={heatmap} alt=""height={'296px'} />;
    case 13:
        return <img src={datatable} alt=""height={'296px'}  />
        // return <SpreadSheet className='sheet'/>;
   
    
    // Add cases for other chart types
    default:
      return "chart is not there";
  }
};

export default Chartsimg;
