import React from "react";
import {
  PieChartOutlined,
  ControlOutlined,
  TableOutlined,
  FileImageOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Row, Col } from "antd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragDropContext } from "react-beautiful-dnd";
import SubmenuItem from "./SubmenuListItems.jsx";
import "./dashboard.scss";
import { useSelector } from "react-redux";
import _ from 'lodash';
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
import pagebreak from '../../../Assets/reportdesignericons/pagebreak.svg'
import logo from '../../../Assets/reportdesignericons/image.svg';
import label from '../../../Assets/reportdesignericons/label.svg'
import textbox from '../../../Assets/reportdesignericons/textbox.svg';
const DraggableSiderItem = () => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const templates = useSelector((state) => state.settings.templatelist);
  const items = [
    // getItem('Admin', '1', <UserOutlined style={{ fontSize: '200%'}}/>),
    getItem( "Chart Tools", "sub1", <PieChartOutlined style={{ fontSize: "200%", padding: "9px" }} />,
      [getItem( "Line Chart", "2", <img src={LineChart} alt="" height='35px' width='35px'/>),
       getItem( "Pie Chart", "3", <img src={PieChart} alt="" height='35px' width='35px'/>),
       getItem("Bar Chart","4",<img src={barChart} alt="" height='35px' width='35px'/> ),
       getItem("Map", "5", <img src={map} alt="" height='35px' width='35px'/>),
       getItem("surface Plot","6", <img src={surface} alt="" height='35px' width='35px'/>),
       getItem("Contour Plot","7",<img src={contourplot} alt="" height='35px' width='35px'/>),
       getItem("Candlestick Plot","8",<img src={candlestickchart} alt="" height='35px' width='35px'/> ),
       getItem("Violin Plot","9",<img src={violin} alt="" height='35px' width='35px'/>),
       getItem( "Correlation Plot", "10", <img src={correlationchart} alt="" height='35px' width='35px'/>),
       getItem( "Low duration Plot", "11", <img src={lowdurationchart} alt="" height='35px' width='35px'/>),
       getItem( "Heat map", "12", <img src={heatmap} alt="" height='35px' width='35px'/>),
       getItem("Table", "13", <img src={table} alt="" height='35px' width='35px'/>),
      ]
    ),
    getItem("General Controls","sub2",<ControlOutlined style={{ fontSize: "200%", padding: "9px" }} />,
      [ getItem( "Page break", "14", <img src={pagebreak} alt="" height='35px' width='35px'/>),
        getItem("Text", "15", <img src={textbox} alt="" height='35px' width='35px'/>),
        getItem("label", "16", <img src={label} alt="" height='35px' width='35px'/>),
        getItem("logo","17",<img src={logo} alt="" height='35px' width='35px'/>),
      ]
    ),

    getItem("Templates","19",<FolderOpenOutlined style={{ fontSize: "200%", paddingLeft: "14px" }} />,
      templates.map((template) =>
        getItem(template,template.id,<FileImageOutlined style={{ fontSize: "200%" }} />)
      )
    ),
    getItem("Templates","20",<FolderOpenOutlined style={{ fontSize: "200%", paddingLeft: "14px" }} />,),
    getItem( "Spread Sheet", "18", <TableOutlined style={{ fontSize: "200%" }} /> ),
  ];
  
  return (
    <Layout.Sider
      style={{height: "100%", marginTop: "0px",backgroundColor: "white" ,position:"fixed", width:'100px'}}
    >
      <Menu theme="light" mode="inline"defaultOpenKeys={['sub1','sub2']}>
      <Menu.SubMenu
          key="sub1"
          icon={<PieChartOutlined style={{ fontSize: "200%" }} />}
          title="Chart Tools">
  {_.chunk(
    items.find((item) => item.label === "Chart Tools").children,
    2
  ).map((chunk, index) => (
    <Row gutter={16} key={index}>
      <DragDropContext backend={HTML5Backend}>
        {chunk.map((childItem) => (
          <Col span={12} style={{ padding: "25px" ,flex:"None"}} key={childItem.key}>
            <SubmenuItem
              id={childItem.key}
              icon={childItem.icon}
              label={childItem.label}
              chartType={childItem.key}
              key={childItem.key}
            />
          </Col>
        ))}
      </DragDropContext>
    </Row>
  ))}
</Menu.SubMenu>

    
        <Menu.SubMenu
  key="sub2"
  icon={<ControlOutlined style={{ fontSize: "200%" }} />}
  title="General Controls"
>
  {_.chunk(
    items.find((item) => item.label === "General Controls").children,
    2
  ).map((chunk, index) => (
    <Row gutter={16} key={index}>
      <DragDropContext backend={HTML5Backend}>
        {chunk.map((childItem) => (
          <Col span={12} style={{ padding: "25px" }} key={childItem.key}>
            <SubmenuItem
              id={childItem.key}
              icon={childItem.icon}
              label={childItem.label}
              chartType={childItem.key}
              key={childItem.key}
            />
          </Col>
        ))}
      </DragDropContext>
    </Row>
  ))}
</Menu.SubMenu>
        {/* <Menu.SubMenu
          key="sub3"
          icon={<FolderOpenOutlined style={{ fontSize: "200%" }} />}
          title="Templates"
        >
          {templates.map((template) => (
        <Menu.Item key={template.templateId}onClick={() => handleMenuItemClick(template.templateId)}>
              <Link to={`/template/${template.templateName}/${template.templateId}`} target="_blank">{template.templateName}</Link>

              </Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.Item icon={<FolderOpenOutlined style={{ fontSize: "200%" }} />}>
          <Link to='/templatelist' >Template List</Link>
        </Menu.Item>
        <Menu.Item
          key="19"
          icon={<TableOutlined style={{ fontSize: "200%" }} />}
          title="Spread Sheet"
        >
          <Link to="/spreadsheet"target="_blank">Spread Sheet</Link>
        </Menu.Item> */}
      </Menu>
    </Layout.Sider>
  );
};
export default DraggableSiderItem;
