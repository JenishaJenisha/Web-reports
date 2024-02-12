import React from 'react'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Pdf = () => {
    const reportDefinition = {
        content: [
          { text: 'My PDF Report', style: 'header' },
          'This is a sample PDF report generated using pdfmake.',
          // Add more content here
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
        },
      };
      const generatePDF = () => {
        const pdfDoc = pdfMake.createPdf(reportDefinition, {
          // Enable text selection and copying
          allowTaint: true,
        });
      
        pdfDoc.open();
        pdfDoc.getDataUrl((dataUrl) => {
          // Display or download the PDF, e.g., open in a new tab
          window.open(dataUrl, '_blank');
        });
      };
  return (
    <div>
        <button onClick={generatePDF}>Generate PDF</button>
    </div>
  )
}

export default Pdf