import React from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { Trash2 } from 'lucide-react';
import QuantityStepper from './QuantityStepper';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const lineTotal = item.price * item.quantity;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        borderBottom: (theme) =>
          theme.palette.mode === 'dark' ? '1px solid rgba(240, 232, 216, 0.1)' : '1px solid rgba(27, 51, 80, 0.1)',
        gap: 2,
        transition: 'background-color 0.2s ease',
      }}
    >
      {/* Thumbnail */}
      <Avatar
        variant="rounded"
        src={item.image}
        alt={item.name}
        sx={{
          width: 64,
          height: 64,
          borderRadius: '12px',
          border: '1px solid rgba(27, 51, 80, 0.14)',
          bgcolor: '#EDE4D1',
          flexShrink: 0,
        }}
      />

      {/* Details */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle2"
          className="line-clamp-1"
          title={item.name}
          sx={{
            fontWeight: 800,
            color: 'text.primary',
            lineHeight: 1.3,
            mb: 0.3,
          }}
        >
          {item.name}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, fontWeight: 600 }}>
          {item.unit} • ₹{item.price} each
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <QuantityStepper
            quantity={item.quantity}
            min={1}
            max={item.maxStock || 15}
            size="small"
            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
          />

          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#F03A2A' }}>
            ₹{lineTotal.toLocaleString('en-IN')}
          </Typography>
        </Box>
      </Box>

      {/* Delete action */}
      <IconButton
        size="small"
        onClick={() => removeFromCart(item.id)}
        aria-label={`Remove ${item.name} from basket`}
        sx={{
          color: 'text.secondary',
          p: 0.8,
          borderRadius: '8px',
          transition: 'all 0.15s ease',
          '&:hover': {
            color: '#F03A2A',
            backgroundColor: 'rgba(240, 58, 42, 0.12)',
          },
        }}
      >
        <Trash2 size={18} />
      </IconButton>
    </Box>
  );
}
