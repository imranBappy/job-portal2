import { TableCell } from '@mui/material';

function TableCellCustom({children}) {
  return (
    <TableCell style={{
      fontSize: '200px', 
      fontWeight: 400, 
    
    }}>{children}</TableCell>
  )
}

export default TableCellCustom