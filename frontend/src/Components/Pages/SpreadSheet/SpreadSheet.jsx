
import React, { useCallback, useRef, useState } from "react";
import { Workbook} from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";
import "./SpreadSheet";
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch
import { setSpreadsheetData, setfilterData} from '../../Store/slices/Spreadsheetslice/spreadsheetDataSlice' // Import your actions
import { setDataTableAction } from "../../Store/slices/Spreadsheetslice/spreadsheetDataSlice";
const ApiExecContainer = ({ children, onRun,data }) => {
  const spreadsheetdata = useSelector((state)=>state.spreadsheetData)
  // console.log(spreadsheetdata,'spreadsheetdata')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [result, setResult] = useState();

const convertToDataTable = (spreadsheetdata) => {
  const dataTable = spreadsheetdata.map((sheet) => {
    const filteredData = sheet.data.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
        if (cell && cell.v !== null) {
          return {
            row: rowIndex + sheet.row,
            column: columnIndex + sheet.column,
            value: cell.v,
          };
        }
        return null; // Exclude null values
      }).filter(Boolean); // Remove null values from the array
    }).filter((column) => column.length > 0);
  dispatch(setfilterData(filteredData));
    return {
      sheetName: sheet.name,
      filteredData,
      rows: [].concat(...filteredData), // Combine rows into a single array
    };
  });

  return dataTable;
};

const setDataTable=(dataTable)=>{
  dispatch(setDataTableAction(dataTable));
}
  const handleSave = () => {
   
    const convertedDataTable = convertToDataTable(data);
    navigate('/',{state:{data:spreadsheetdata}})
    // setDataTable(convertedDataTable); 
    dispatch(setSpreadsheetData(convertedDataTable));
  };
  return (
         <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100vh",
    }}
  >
    <div style={{ flexShrink: 0, padding: 8 }}>
      <Button style={{backgroundColor:"green",color:'aliceblue'}}
        type="button"
        onClick={() => {
          setResult(onRun?.());
        }}
      >
        Run
      </Button>
      <Button style={{backgroundColor:"green" ,marginLeft:"10px",color:'aliceblue'}}
    type="submit" onClick={handleSave} 
      >
        Save
      </Button>
      <span style={{ marginLeft: 16 }}>
        {result && (
          <>
            <p style={{ color: "#aaa" }}>result: </p> {result}
          </>
        )}
      </span>
    </div>
    
   
    <div style={{ flex: 1 }}>{children}</div>
   
  </div>
  );
};

const GetAllSheets = (onDataUpdate ) => {
  const ref = useRef(null);
  const [data, setData] = useState([
    {
      name: "Sheet1",
      celldata: [
        { r: 3, c: 3, v:0},
        { r: 3, c: 3, v: 0 },
      ],
      order: 0,
      row: 1,
      column: 2,
    },
    {
      name: "Sheet2",
      celldata: [
        { r: 4, c: 4, v: 0 },
        { r: 4, c: 4, v: 0 },
      ],
      order: 1,
      row: 2,
      column: 1,
    },
  ]);

  const onChange = useCallback((d) => {
    setData(d);
    
   
  }, []);
    const spreadsheetdata =JSON.stringify(ref.current?.getAllSheets())
    // console.log(spreadsheetdata,'spreadsheetdata')
   


  return (
    <ApiExecContainer
      onRun={() => {
        return spreadsheetdata;
      }}  
      data={data}
    >
      <Workbook ref={ref} data={[{ name: "datatable" }]}onChange={onChange} />
    </ApiExecContainer>
  );
};

export default GetAllSheets;
