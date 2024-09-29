const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Create an Express app
const app = express();
app.use(express.json()); // to support JSON-encoded bodies

// Define the correct path for the uploads folder inside the backend directory
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer for file uploads, saving files temporarily in backend/uploads
const upload = multer({ dest: uploadDir });

// Set up AWS S3 SDK
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1', // Use region from env or default to us-east-1
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

// Route to handle PDF file upload and upload to S3
app.post('/upload-pdf', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  const filePath = file.path;
  const fileStream = fs.createReadStream(filePath);

  // Set S3 parameters
  const s3Params = {
    Bucket: 'assignment-upload', // Replace with your S3 bucket name
    Key: `${file.filename}-${file.originalname}`, // Generate a unique key for the file
    Body: fileStream,
    ContentType: file.mimetype, // The content type of the file (e.g., 'application/pdf')
  };

  try {
    // Upload the file to S3
    const uploadResult = await s3.upload(s3Params).promise();

    // After the upload, delete the file from the local server
    fs.unlinkSync(filePath);

    console.log('S3 Upload Result:', uploadResult); // Log the result from S3

    // Respond with the S3 file URL
    res.status(200).send({
      message: 'File uploaded successfully to S3',
      fileUrl: uploadResult.Location,
    });
  } catch (error) {
    console.error('Error uploading to S3:', error); // Log error
    res.status(500).send({ message: 'Error uploading file to S3', error: error.message });
  }
});

module.exports = app;
