import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import SpreadSheet from './SpreadSheet';

const DataTable = () => {
  const sheetdetails = useSelector((state)=>state.spreadsheetData)
  // console.log(sheetdetails,"sdsadd");
  const { sheetName, sheetdata,filterData } = sheetdetails;
  // console.log(filterData,'filteredData')
// console.log(sheetdetails,sheetName,"sheetName")
// console.log(sheetdata,'sheetdata')
  if (!sheetdata || sheetdata.length === 0) {
    return <p>SpreadSheet data will appear here</p>
  }
  const columns = sheetdetails.filterData.map((_, columnIndex) => ({
    // title: `Column ${columnIndex + 1}`,
    dataIndex: `column_${columnIndex}`,
    key: `column_${columnIndex}`,
  })) 
 
// console.log(columns,"ccccccccc")
 
  const tableData = sheetdetails.filterData.map((row, rowIndex) => {
    const rowData = {};
    row.forEach((cell, columnIndex) => {
      rowData[`column_${columnIndex}`] = cell.value;
    });
    return {
      ...rowData,
      key: `row_${rowIndex}`,
    };
  });

  return (
    <Table
     bordered
     editable
      columns={columns}
      dataSource={tableData}
      pagination={false} // Remove pagination if not needed
    />
  );
};

export default DataTable;
