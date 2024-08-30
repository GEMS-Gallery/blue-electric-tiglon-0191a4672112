import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

interface TaxPayerFormProps {
  onAddTaxPayer: (taxPayer: TaxPayer) => void;
}

const TaxPayerForm: React.FC<TaxPayerFormProps> = ({ onAddTaxPayer }) => {
  const { control, handleSubmit, reset } = useForm<TaxPayer>();

  const onSubmit = (data: TaxPayer) => {
    onAddTaxPayer(data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Add New TaxPayer
      </Typography>
      <Controller
        name="tid"
        control={control}
        defaultValue=""
        rules={{ required: 'TID is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="tid"
            label="TID"
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        rules={{ required: 'First name is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        rules={{ required: 'Last name is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        defaultValue=""
        rules={{ required: 'Address is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add TaxPayer
      </Button>
    </Box>
  );
};

export default TaxPayerForm;
