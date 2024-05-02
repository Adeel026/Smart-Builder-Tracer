import React, { useState } from 'react';
import { Container, Paper, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import ConstructionDetails from "./ConstructionDetails.jsx"

const marlaOptions = [225, 250, 272.25];
const packageOptions = [3550, 4550, 7450];

function Budget() {
  const [marlaSize, setMarlaSize] = useState(marlaOptions[0]);
  const [totalMarlas, setTotalMarlas] = useState('');
  const [stories, setStories] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(packageOptions[0]);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const calculateCost = () => {
    const cost = marlaSize * totalMarlas * stories * selectedPackage;
    setEstimatedCost(cost);
  };

  return (
    <>
     <h1 className='font-serif flex justify-center text-3xl mt-4 mb-3 bg-red-950 py-10 text-white'>
      Our Construction Calculator
      </h1>
    <div className='mb-10'>
    <Container maxWidth="xs" style={{ textAlign: 'center', marginTop: '1rem' }}>
      <Paper elevation={20} style={{ padding: '2rem' }} >
      {/* <Typography variant="h6" style={{ fontFamily: 'serif', fontWeight: 'bold', marginBottom: '1rem', color: '#1976d2' }}>
          HOUSE CONSTRUCTION COST CALCULATOR
        </Typography> */}
        <h1 className='text-2xl font-serif mx-auto mb-4 '>
        HOUSE CONSTRUCTION COST CALCULATOR
        </h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Marla Size</InputLabel>
              <Select value={marlaSize} onChange={(e) => setMarlaSize(e.target.value)}>
                {marlaOptions.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Total Marlas"
              fullWidth
              value={totalMarlas}
              onChange={(e) => setTotalMarlas(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Stories"
              type="number"
              fullWidth
              value={stories}
              onChange={(e) => setStories(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Package</InputLabel>
              <Select value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}>
                {packageOptions.map((pkg) => (
                  <MenuItem key={pkg} value={pkg}>
                    {pkg}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <button
              className='mx-auto md:block p-3 px-6 pt-2 text-white bg-red-950 rounded-full self-baseline hover:bg-red-500 mt-10 mb-10 sm:mx-auto'
              onClick={calculateCost}
            >
              Calculate Estimated Cost

            </button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              style={{
                border: '1px solid #1976d2',
                backgroundColor: '#90caf9',
                padding: '8px',
                textAlign: 'center',
              }}
            >
              Estimated Cost: {estimatedCost} PKR
            </Typography>
          </Grid>

        </Grid>
      </Paper>
    </Container>
    </div>
    <ConstructionDetails />
    </>
  );
}

export default Budget;
