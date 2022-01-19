import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getCurrentRates,
  selectCurrentRates,
} from '../../app/slice';


export default function Rates() {
  const currentRates = useAppSelector(selectCurrentRates);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getCurrentRates());
  }, [dispatch]);

  if (!currentRates?.success) {
    return (<Typography variant="caption" color="error" display="block" gutterBottom>
      {currentRates?.error.info}
    </Typography>);
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Currency rates">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(currentRates?.rates ?? {}).map((row: any) => (
            <TableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                1 {row[0]}
              </TableCell>
              <TableCell align="right">{(1/row[1]).toFixed(2)} {currentRates?.success && currentRates.base}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
