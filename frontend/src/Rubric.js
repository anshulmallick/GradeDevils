import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './Rubric.css'; // Import custom CSS for styling

function Rubric({ items }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };

  const table = () => (
    <TableContainer component={Paper} className="rubric-table-container">
      <Table sx={{ minWidth: 650 }} aria-label="rubric table">
        <TableHead className="rubric-table-head">
          <TableRow>
            <TableCell>Student ID</TableCell>
            <TableCell align="right">Final Grade</TableCell>
            <TableCell align="right">Scientific Accuracy</TableCell>
            <TableCell align="right">Understanding of Concepts</TableCell>
            <TableCell align="right">Use of Terminology</TableCell>
            <TableCell align="right">Application and Analysis</TableCell>
            <TableCell align="right">Structure and Organization</TableCell>
            <TableCell align="right">Overall Comments</TableCell>
            <TableCell align="right">Cheating Detected</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item["Student ID"]}>
              <TableCell component="th" scope="row">
                {item["Student ID"]}
              </TableCell>
              <TableCell align="right">{item.final_grade}</TableCell>
              <TableCell align="right">{item.scores.scientific_accuracy}</TableCell>
              <TableCell align="right">{item.scores.understanding_of_concepts}</TableCell>
              <TableCell align="right">{item.scores.use_of_terminology}</TableCell>
              <TableCell align="right">{item.scores.application_and_analysis}</TableCell>
              <TableCell align="right">{item.scores.structure_and_organization}</TableCell>
              <TableCell align="right">{item.overall_comments}</TableCell>
              <TableCell align="right" style={{ color: item.cheating_flag ? 'red' : 'black' }}>
                {item.cheating_flag ? `Yes: ${item.cheating_reason}` : 'No'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div className="rubric-container">
      <Button className="custom-rubric-button" onClick={toggleDrawer(true)}>
        View Grades and Feedback
      </Button>

      <SwipeableDrawer
  anchor='bottom'
  open={isOpen}
  onClose={toggleDrawer(false)}
  onOpen={toggleDrawer(true)}
>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center', // Center the heading
      alignItems: 'center',
      padding: '16px',
      borderBottom: '1px solid #ccc',
      position: 'relative', // This allows the close button to be positioned without affecting heading centering
    }}
  >
    <Typography
      variant="h6"
      component="div"
      sx={{
        textAlign: 'center',
        flexGrow: 1, // Ensures the heading stays centered
      }}
    >
      Grades and Feedback
    </Typography>
    <IconButton
      onClick={toggleDrawer(false)}
      sx={{
        position: 'absolute',
        right: '16px', // Keeps the close button at the right edge
      }}
    >
      <CloseIcon />
    </IconButton>
  </Box>

  {table()}
</SwipeableDrawer>
    </div>
  );
}

export default Rubric;
