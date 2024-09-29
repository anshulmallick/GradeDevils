import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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

      const response = await axios.post('http://localhost:3000/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.status+ " YESSSSSSS ");

      // Check if the response status is 200 and display success message
      if (response.status === 200) {
        setMessage(`Success! File uploaded: ${response.data.fileUrl}`);
      } else {
        setMessage('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading the file:', error);
      setMessage('Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Upload Assignment (PDF)</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
