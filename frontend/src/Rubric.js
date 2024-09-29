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
import './Rubric.css'; // Import custom CSS for styling

function Rubric() {
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
            <TableCell>Criterion</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Example row, replace with data from backend */}
          <TableRow>
            <TableCell component="th" scope="row">
              Example Criterion
            </TableCell>
            <TableCell align="right">Example Description</TableCell>
            <TableCell align="right">10</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div className="rubric-container">
      <Button className="rubric-button" onClick={toggleDrawer(true)}>
        View Rubric
      </Button>
      <SwipeableDrawer
        anchor='bottom'
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {table()}
      </SwipeableDrawer>
    </div>
  );
}


export default Rubric;
