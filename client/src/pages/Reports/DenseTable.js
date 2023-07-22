import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

function createData(date, zone, timestamp, object_type, Image_link) {
  return { date, zone, timestamp, object_type, Image_link };
}

const ITEMS_PER_PAGE = 10; // Number of items to show per page

export default function DenseTable({ data }) {
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>date</TableCell>
              <TableCell align="center">zone</TableCell>
              <TableCell align="center">timestamp</TableCell>
              <TableCell align="center">object_type</TableCell>
              <TableCell align="center">Image_link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.date}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="center">{row.zone}</TableCell>
                <TableCell align="center">{row.timestamp}</TableCell>
                <TableCell align="center">{row.object_type}</TableCell>
                <TableCell align="center">{row.Image_link}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[ITEMS_PER_PAGE]}
        component="div"
        count={data.length}
        rowsPerPage={ITEMS_PER_PAGE}
        page={page}
        onPageChange={handleChangePage}
      />
    </React.Fragment>
  );
}
