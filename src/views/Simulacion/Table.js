import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function TableComponent({ dataRow, name }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Peticiones {`${name}`} </StyledTableCell>
            <StyledTableCell align='right'>Movimiento</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRow.map((data) => (
            <StyledTableRow key={data.name}>
              <StyledTableCell component='th' scope='row'>
                {data.name}
              </StyledTableCell>
              <StyledTableCell align='right'>{data.cantidad}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
