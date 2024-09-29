Here’s a basic `README.md` file that outlines how to set up and run both the backend and frontend, including installing dependencies and running the project.

---

# GradeDevils - Automated Assignment Grading

This project automates the process of submitting and grading assignments using a React frontend and a Node.js (Express) backend. The backend uses AWS services for file storage and grading automation.

## Prerequisites

Before running this project, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [AWS CLI](https://aws.amazon.com/cli/) (if working with AWS services)
- Set up your `.env` files for both backend and frontend with your AWS credentials and other necessary configurations.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/GradeDevils.git
cd GradeDevils
```

---

## Backend Setup

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the `backend` directory

Make sure you have your AWS credentials and other environment variables ready. Create a `.env` file in the `backend` folder and populate it with your AWS credentials:

```bash
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=us-east-1
```

### 4. Run the backend server

```bash
node app.js
```

This will start the backend server on `http://localhost:3000`.

---

## Frontend Setup

### 1. Navigate to the frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the `frontend` directory

Make sure you set up environment variables for your AWS services in the `frontend` as well. Create a `.env` file in the `frontend` folder:

```bash
REACT_APP_AWS_ACCESS_KEY_ID=your_access_key_id
REACT_APP_AWS_SECRET_ACCESS_KEY=your_secret_access_key
REACT_APP_AWS_REGION=us-east-1
```

### 4. Run the frontend

```bash
npm start
```

This will start the frontend development server, and the React app will be available at `http://localhost:3000`.

---

## Running the Project

1. Make sure both the backend and frontend servers are running:
   - Backend: `http://localhost:3000`
   - Frontend: `http://localhost:3001`

2. Access the app in your browser by navigating to `http://localhost:3001`.

---

## AWS Configuration

To properly run the file uploads and assignment grading processes, ensure that your AWS credentials and permissions are configured correctly:
- Set up an S3 bucket for storing the assignment PDFs.
- Make sure your Lambda functions, SNS, and other AWS services are correctly linked in your backend.

---

## Technologies Used

- **Frontend**: React, Axios, Material-UI
- **Backend**: Node.js, Express, AWS SDK, Multer (for file uploads)
- **AWS Services**: S3 (for file storage), Lambda (for grading automation), DynamoDB (for storing feedback/grades)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This `README.md` covers basic setup instructions. You can adjust it based on any additional requirements or configurations for your project.

