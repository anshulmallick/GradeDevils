const express = require('express');
const AWS = require('aws-sdk');

// Create an Express app
const app = express();
app.use(express.json()); // to support JSON-encoded bodies

// Set up AWS Lambda SDK with appropriate region and credentials
AWS.config.update({
  region: 'us-east-1', // Replace with your region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Use environment variables for security
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const lambda = new AWS.Lambda();

// Define a route to trigger Lambda function
app.post('/invoke-lambda', async (req, res) => {
  const { functionName, payload } = req.body;

  // Set the parameters for the Lambda invocation
  const params = {
    FunctionName: functionName, // Name of your Lambda function
    Payload: JSON.stringify(payload) // Pass the payload as a JSON string
  };

  try {
    // Invoke the Lambda function
    const lambdaResponse = await lambda.invoke(params).promise();

    // Parse the response
    const result = JSON.parse(lambdaResponse.Payload);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error invoking Lambda:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
