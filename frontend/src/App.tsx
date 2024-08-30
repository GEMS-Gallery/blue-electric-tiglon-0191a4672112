import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import TaxPayerForm from './components/TaxPayerForm';
import TaxPayerList from './components/TaxPayerList';
import SearchBar from './components/SearchBar';
import { backend } from 'declarations/backend';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

const App: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      const result = await backend.getAllTaxPayers();
      setTaxPayers(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
      setLoading(false);
    }
  };

  const handleAddTaxPayer = async (newTaxPayer: TaxPayer) => {
    try {
      await backend.createTaxPayer(
        newTaxPayer.tid,
        newTaxPayer.firstName,
        newTaxPayer.lastName,
        newTaxPayer.address
      );
      fetchTaxPayers();
    } catch (error) {
      console.error('Error adding tax payer:', error);
    }
  };

  const filteredTaxPayers = taxPayers.filter((taxPayer) =>
    taxPayer.tid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box className="header-image">
        <Typography variant="h2" component="h1">
          TaxPayer Management System
        </Typography>
      </Box>
      <Box mt={4}>
        <TaxPayerForm onAddTaxPayer={handleAddTaxPayer} />
      </Box>
      <Box mt={4}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>
      <Box mt={4}>
        {loading ? (
          <CircularProgress />
        ) : (
          <TaxPayerList taxPayers={filteredTaxPayers} />
        )}
      </Box>
    </Container>
  );
};

export default App;
