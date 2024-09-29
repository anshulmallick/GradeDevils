import React, { useState } from 'react';
import axios from 'axios';
import Rubric from './Rubric'; // Import the Rubric component

import './App.css'; // We'll add custom styles here

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file selection
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
        setMessage(`✅ Success! File uploaded: ${response.data.fileUrl}`);
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
      
      <h1 className="title">Submit Your Assignment</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="file-input" />
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? <div className="spinner"></div> : 'Upload'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
<Rubric /> {/* Add the Rubric component to the page */}

</div>
  );
}

export default App;


