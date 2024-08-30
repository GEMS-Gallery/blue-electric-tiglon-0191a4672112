import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import DataTable from 'react-data-table-component';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

interface TaxPayerListProps {
  taxPayers: TaxPayer[];
}

const columns = [
  {
    name: 'TID',
    selector: (row: TaxPayer) => row.tid,
    sortable: true,
  },
  {
    name: 'First Name',
    selector: (row: TaxPayer) => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: (row: TaxPayer) => row.lastName,
    sortable: true,
  },
  {
    name: 'Address',
    selector: (row: TaxPayer) => row.address,
    sortable: true,
  },
];

const TaxPayerList: React.FC<TaxPayerListProps> = ({ taxPayers }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        TaxPayer Records
      </Typography>
      <DataTable
        columns={columns}
        data={taxPayers}
        pagination
        responsive
        highlightOnHover
        striped
      />
    </>
  );
};

export default TaxPayerList;
