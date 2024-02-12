import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const GenerateReport = () => async (dispatch, getState) => {
  const { sheetName, chartData } = getState().spreadsheetslice;

  // Define your PDF document content here using pdfMake
  const documentDefinition = {
    content: [
      { text: `Sheet Name: ${sheetName}`, fontSize: 16, bold: true },
      // Add more content here based on your chartData
      // Example: { text: `Chart Data: ${chartData}`, fontSize: 14 },
    ],
  };

  // Generate the PDF
  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

  // Download the PDF
  pdfDocGenerator.download(`Report_${sheetName}.pdf`);
};
  export default GenerateReport;