import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rubric from './Rubric'; // Import the Rubric component
import PDFDisplay from './PDFDisplay';
import Menu from './Menu';
import './App.css'; // Custom styles

const AWS = require('aws-sdk');

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null); 
  const [items, setItems] = useState([]); // State for storing DynamoDB items

  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
  });

  // Fetch items from DynamoDB when component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchItems();
  }, []);

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
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please upload a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setMessage('');

      const response = await axios.post('http://localhost:3000/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('✅ Success! File uploaded');
        const s3Link = await getPresignedUrl(response.data.fileBucket, response.data.fileKey);
        setPdfUrl(s3Link); 
      } else {
        setMessage('❌ Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading the file:', error);
      setMessage('❌ Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Welcome to GradeDevils</h1>
        <p>Submit. Relax. Let AI handle your grades!</p>
      </header>

      <Menu />

      {/* File Upload Form */}
      <form onSubmit={handleSubmit} className="upload-form">
        <h1 className="title">Submit Your Assignment</h1>
        <p>Explain about Darwins theory of evolution.</p>
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

      {pdfUrl && <PDFDisplay pdfUrl={pdfUrl} />}
 
  <Rubric items={items} />
    </div>
  );
}

export default App;