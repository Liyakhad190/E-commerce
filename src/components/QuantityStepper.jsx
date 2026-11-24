import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({
  quantity = 1,
  onIncrease,
  onDecrease,
  min = 1,
  max = 15,
  size = 'medium', // 'small' | 'medium'
  disabled = false,
  fullWidth = false,
}) {
  const isSmall = size === 'small';

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: fullWidth ? '100%' : 'auto',
        height: isSmall ? 34 : 42,
        borderRadius: '12px',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(240, 232, 216, 0.08)' : '#EDE4D1',
        border: (theme) =>
          theme.palette.mode === 'dark'
            ? '1px solid rgba(240, 232, 216, 0.22)'
            : '1px solid rgba(27, 51, 80, 0.16)',
        p: isSmall ? '2px 6px' : '4px 8px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
      }}
    >
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? '#F0E8D8' : '#1B3350'),
          p: isSmall ? '3px' : '6px',
          borderRadius: '8px',
          transition: 'all 0.15s ease',
          '&:hover': {
            backgroundColor: '#F03A2A',
            color: '#FFFFFF',
          },
          '&.Mui-disabled': {
            opacity: 0.35,
            color: (theme) => (theme.palette.mode === 'dark' ? '#F0E8D8' : '#1B3350'),
          },
        }}
      >
        <Minus size={isSmall ? 14 : 16} />
      </IconButton>

      <Typography
        component="span"
        sx={{
          fontWeight: 800,
          fontSize: isSmall ? '0.85rem' : '0.95rem',
          minWidth: isSmall ? 24 : 32,
          textAlign: 'center',
          userSelect: 'none',
          color: (theme) => (theme.palette.mode === 'dark' ? '#F0E8D8' : '#1B3350'),
        }}
      >
        {quantity}
      </Typography>

      <IconButton
        size="small"
        onClick={onIncrease}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? '#F0E8D8' : '#1B3350'),
          p: isSmall ? '3px' : '6px',
          borderRadius: '8px',
          transition: 'all 0.15s ease',
          '&:hover': {
            backgroundColor: '#F03A2A',
            color: '#FFFFFF',
          },
          '&.Mui-disabled': {
            opacity: 0.35,
            color: (theme) => (theme.palette.mode === 'dark' ? '#F0E8D8' : '#1B3350'),
          },
        }}
      >
        <Plus size={isSmall ? 14 : 16} />
      </IconButton>
    </Box>
  );
}
