import React from 'react';

const PDFDisplay = ({ pdfUrl }) => {
  return (
    <div className="pdf-display-container">
      <h2 className="pdf-title">Uploaded PDF</h2>
      {/* Display the PDF using an iframe */}
      <iframe
        src={pdfUrl}
        title="Uploaded PDF"
        width="100%"
        height="600px"
        style={{ border: '1px solid #ccc', borderRadius: '5px' }}
      />
    </div>
  );
};

export default PDFDisplay;
