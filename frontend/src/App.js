import React, { useState } from 'react'; 
import axios from 'axios';
import Rubric from './Rubric'; // Import the Rubric component
import PDFDisplay from './PDFDisplay'; 
import './App.css'; // We'll add custom styles here
import Menu from './Menu';

const AWS = require('aws-sdk');

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null); 

  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1' // Optional if you're setting region
  });

  // const getPresignedUrl = async (bucketName, key) => {
  //   const params = {
  //     Bucket: bucketName,
  //     Key: key,
  //     Expires: 60 * 5 // URL expires in 5 minutes
  //   };

  //   try {
  //     const url = await s3.getSignedUrlPromise('getObject', params);
  //     return url;
  //   } catch (error) {
  //     console.error('Error generating pre-signed URL', error);
  //   }
  // };

  // Handle file selection
  
  const getPresignedUrl = async (bucketName, key) => {
    const params = {
      Bucket: bucketName,
      Key: key,
      Expires: 60 * 5 // URL expires in 5 minutes
    };
  
    try {
      const url = await s3.getSignedUrlPromise('getObject', params);
      return url;
    } catch (error) {
      console.error('Error generating pre-signed URL', error);
    }
  };

  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(''); // Clear previous messages when a new file is selected
  };

  // Handle form submission to upload the file
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please upload a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // Attach the selected file

    try {
      setLoading(true);
      setMessage(''); // Clear previous messages

      const response = await axios.post('http://localhost:3000/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check if the response status is 200 and display success message
      if (response.status === 200) {
        setMessage(`✅ Success! File uploaded`);
        console.log(response.data.fileBucket+"s3Link"+response.data.fileKey);
        const s3Link = await getPresignedUrl(response.data.fileBucket, response.data.fileKey);
        console.log(s3Link);
        setPdfUrl(s3Link); 
      } else {
        setMessage('❌ Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading the file:', error);
      setMessage('❌ Failed to upload file');
    } finally {
      setLoading(false); // Remove loading spinner
    }
  };

  return (
    <div className="App">
      <Menu />
      
      <form onSubmit={handleSubmit} className="upload-form">
        <h1 className="title">Submit Your Assignment</h1>
        <label htmlFor="file-upload" className="custom-file-input">
          {file ? file.name : "Choose PDF"}
        </label>
        <input 
          id="file-upload" 
          type="file" 
          accept="application/pdf" 
          onChange={handleFileChange} 
          className="file-input-hidden" 
        />
        <button type="submit" disabled={loading || !file} className="submit-button">
          {loading ? <div className="spinner"></div> : 'Upload'}
        </button>
        {message && <p className="message">{message}</p>}
        
      </form>
      {/* Display the uploaded PDF using the PDFDisplay component */}
      {pdfUrl && <PDFDisplay pdfUrl={pdfUrl} />}

      <Rubric /> {/* Add the Rubric component to the page */}
    </div>
  );
}

export default App;
