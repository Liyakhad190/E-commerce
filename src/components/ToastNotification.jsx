import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useCart } from '../context/CartContext';

export default function ToastNotification() {
  const { toast, closeToast } = useCart();

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={3000}
      onClose={closeToast}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        bottom: { xs: 24, sm: 32 },
        zIndex: 2200,
      }}
    >
      <Alert
        onClose={closeToast}
        severity={toast.severity || 'success'}
        variant="filled"
        sx={{
          borderRadius: '16px',
          fontWeight: 700,
          fontSize: '0.92rem',
          py: 1,
          px: 2.2,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35)',
          backgroundColor:
            toast.severity === 'error'
              ? '#F03A2A'
              : toast.severity === 'info'
              ? '#1B3350'
              : toast.severity === 'warning'
              ? '#D97706'
              : '#1B3350', // Prussian Blue with Lobster Red icon
          color: '#F0E8D8',
          border: '1px solid rgba(240, 232, 216, 0.24)',
          backdropFilter: 'blur(12px)',
          '& .MuiAlert-icon': {
            color: toast.severity === 'error' ? '#FFFFFF' : '#F03A2A',
            fontSize: 22,
          },
        }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}
