import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import { setChartContent } from "../../Store/slices/chartSlice/chartSlice";
const BokehChart = ({ chartType, chartData, containerId,chartId }) => {
  const dispatch = useDispatch()
  // const chartContents = useSelector((state)=>state.charts.chartContent)
  // console.log(chartContents,'chartContents')
  
    useEffect(() => {
      renderBokehChart(chartType, chartData, containerId,chartId);
    }, [chartType, chartData, containerId,chartId]);
   
    const renderBokehChart = (chartType, chartData, containerId,chartId) => {
      const plotContainer = document.getElementById(containerId);
     
      if (!chartData) {
        console.error('Chart data is missing or undefined');
        return;
      }
      if (chartData) {
        const capturedContent = plotContainer.innerHTML;
        dispatch(setChartContent(capturedContent));
      }
      try {
        const chartObject = JSON.parse(chartData);
        // console.log('Chart Object:', chartObject);
        window.Bokeh.embed.embed_item(chartObject, containerId,chartId); // Embed the Bokeh chart
        
      } catch (error) {
        console.error('Error parsing or embedding chart data:', error);
        plotContainer.innerHTML = '<p>Error rendering chart.</p>';
      }
    };
  
    return (
        <>
        
<div id={containerId} className="dropcontent"/> 
        </>
    )
  };
export default BokehChart  ;