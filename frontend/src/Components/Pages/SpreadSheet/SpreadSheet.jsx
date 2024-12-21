
import React, { useCallback, useRef, useState,useEffect } from "react";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";
import "./SpreadSheet";
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";
import { useDispatch, useSelector} from 'react-redux'; 
import { setSpreadsheetData, setfilterData} from '../../Store/slices/Spreadsheetslice/spreadsheetDataSlice' ;
import { setDataTableAction } from "../../Store/slices/Spreadsheetslice/spreadsheetDataSlice";
import axios from 'axios';
import Papa from 'papaparse';

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
    {/* <div style={{ flexShrink: 0, padding: 8 }}>
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
    </div> */}
    
   
    <div style={{ flex: 1 }}>{children}</div>
   
  </div>
  );
};

const GetAllSheets = (onDataUpdate ) => {
  const ref = useRef(null);
  const [uploaddata,setUploaddata] = useState();
  const [apiTableData, setApiTableData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        setUploaddata(result.data);
        console.log(uploaddata,"upload data")
      },
      header: true // Assuming CSV has a header
    });
  };
  const handleSave = () => {
    const workbook = ref.current;
    const allSheets = workbook?.getAllSheets();
    console.log(allSheets,"allsheets")
    if (!allSheets) {
      console.error('No sheets found');
      return;
    }

    allSheets.forEach((sheet, index) => {
      // Assuming you have a function to save data to the server
      saveSheetDataToServer(sheet, index + 1) // index + 1 because index is zero-based
        .then(() => {
          console.log(sheet.name,`Sheet ${index + 1} saved successfully!`);
        })
        .catch((error) => {
          console.error(`Error saving Sheet ${index + 1}:`, error);
        });
    });
  };
  const saveSheetDataToServer = async (sheetData, sheetIndex) => {
    // Implement your logic to save the sheet data to the server
    // For example:
    // await fetch('your-api-endpoint', {
    //   method: 'POST',
    //   body: JSON.stringify(sheetData),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
  };
  // Function to update cell values with API data
  const updateCellValue = async () => {
    // API call to fetch data
    try {
      const token = localStorage.getItem('token');
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`
          };
    
      const response = await axios.get('http://192.168.29.111:1220/api/GetOPCValuesByTagsTime?TagNames=10FIC01/PV.CV&UTCTimes=1',{ headers });
      setApiTableData(response.data);
    }} catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Call the updateCellValue function when the component mounts
    updateCellValue();
  }, []);

  // Function to set cell values in the Fortune Sheet
  // const setCellValues = () => {
  //   if (ref.current && Array.isArray(uploaddata)) {
  //     uploaddata.forEach((row, rowIndex) => {
  //       let columnIndex = 0;
  //       for (const key in row) {
  //         const value = row[key];
  //         // Set cell value
  //         ref.current.setCellValue(rowIndex, columnIndex++, value);
  //       }
  //     });
  //   }
  // };
  const setCellValues = () => {
    if (ref.current && Array.isArray(uploaddata)) {
      // Set headers
      const headers = Object.keys(uploaddata[0]); // Extract headers from the first row
      headers.forEach((header, columnIndex) => {
        ref.current.setCellValue(0, columnIndex, header);
      });
  
      // Set data rows
      uploaddata.forEach((row, rowIndex) => {
        let columnIndex = 0;
        for (const key in row) {
          const value = row[key];
          // Set cell value
          ref.current.setCellValue(rowIndex + 1, columnIndex, value); // Offset by 1 for data rows
          columnIndex++;
        }
      });
    }
  };
  
  // const setDataFromAPI = (apiData) => {
  //   if (ref.current && Array.isArray(apiData)) {
  //     apiData.forEach((item, index) => {
  //       const rowIndex = index; // Assuming each item in the array corresponds to a row
  //       let columnIndex = 0;
  //       for (const key in item) {
  //         const value = item[key];
  //         // Set cell value
  //         ref.current.setCellValue(rowIndex, columnIndex++, value);
  //       }
  //     });
  //   }
  // };
  const setDataFromAPI = (apiData) => {
    if (ref.current && Array.isArray(apiData) && apiData.length > 0) {
      const headers = Object.keys(apiData[0]); // Extract headers from the first item
      // Set header row
      headers.forEach((header, columnIndex) => {
        ref.current.setCellValue(0, columnIndex, header);
      });
  
      // Set data rows
      apiData.forEach((item, rowIndex) => {
        let columnIndex = 0;
        for (const key in item) {
          const value = item[key];
          // Set cell value
          ref.current.setCellValue(rowIndex + 1, columnIndex++, value); // Offset by 1 for data rows
        }
      });
    }
  };
  

  // Parse JSON string from API response
  const apiData = JSON.parse(apiTableData); // Replace 'apiResponse' with your actual API response variable
  
  // Call the function to set cell values
  setDataFromAPI(apiData);
  
  

  return (
    <ApiExecContainer
    >
      {/* <div style={{ flexShrink: 0, padding: 8 }}>
        <Button
          style={{ backgroundColor: "green", color: 'aliceblue' }}
          type="button"
          onClick={updateCellValue}
        >
          Update Cell Values
        </Button>
        <Button
          style={{ backgroundColor: "green", marginLeft: "10px", color: 'aliceblue' }}
          type="button"
          onClick={setCellValues} // Call the setCellValues function when the button is clicked
        >
          Set Cell Values
        </Button>
        <input type="file" onChange={handleFileUpload} />
      </div> */}
      {/* Fortune Sheet component */}
      <div style={{ flexShrink: 0, padding: 8 }}>
      <Button onClick={handleSave}>Save All Sheets</Button>
      </div>
      
      <Workbook ref={ref} data={[{ name: "datatable" }]} />
     
    </ApiExecContainer>
  );
};

export default GetAllSheets;

