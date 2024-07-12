import React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';

export default function ProgressMobileStepper({ activeStep, handleNext, handleBack }) {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="6vh">
      <MobileStepper
        variant="progress"
        steps={3}
        position="static"
        activeStep={activeStep}
        sx={{
          maxWidth: 1500,
          flexGrow: 1,
          '& .MuiMobileStepper-progress': {
            width: '80vw', // Adjust width for mobile
            backgroundColor: 'lightgrey',
          },
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#fbd137',
          },
        }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === 2}
            sx={{
              minWidth: 0,
              padding: 0,
              marginRight: { xs: '1vw', sm: '9cm' }, // Adjust margin for mobile
              '&:hover': {
                backgroundColor: 'lightyellow',
              },
            }}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft sx={{ color: 'black', fontSize: '3rem' }} />
            ) : (
              <KeyboardArrowRight sx={{ color: 'black', fontSize: '3rem' }} />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{
              minWidth: 0,
              padding: 0,
              marginLeft: { xs: '1vw', sm: '9cm' }, // Adjust margin for mobile
              '&:hover': {
                backgroundColor: 'lightyellow',
              },
            }}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight sx={{ color: 'black', fontSize: '3rem' }} />
            ) : (
              <KeyboardArrowLeft sx={{ color: 'black', fontSize: '3rem' }} />
            )}
          </Button>
        }
      />
    </Box>
  );
}
