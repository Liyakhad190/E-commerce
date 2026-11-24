import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import { X, ShoppingBag, ArrowRight, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import PromoCodeInput from './PromoCodeInput';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer({ open, onClose }) {
  const { cartItems, totalCount, grandTotal, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleOpenCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setCheckoutOpen(false);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 490 },
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1B3350' : '#F7F2E7'),
            color: (theme) => (theme.palette.mode === 'dark' ? '#F0E8D8' : '#1B3350'),
            boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(240, 232, 216, 0.16)'
                : '1px solid rgba(27, 51, 80, 0.14)',
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#122438' : '#EDE4D1'),
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                bgcolor: '#F03A2A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(240, 58, 42, 0.4)',
              }}
            >
              <ShoppingBag size={20} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                Your Grocery Basket
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                {totalCount} {totalCount === 1 ? 'item' : 'items'} in basket
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {cartItems.length > 0 && (
              <Button
                size="small"
                onClick={clearCart}
                startIcon={<RotateCcw size={14} />}
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  '&:hover': {
                    color: '#F03A2A',
                    backgroundColor: 'rgba(240, 58, 42, 0.1)',
                  },
                }}
              >
                Clear
              </Button>
            )}

            <IconButton
              onClick={onClose}
              aria-label="Close cart drawer"
              sx={{
                color: 'text.primary',
                borderRadius: '10px',
                '&:hover': { backgroundColor: 'rgba(240, 58, 42, 0.12)', color: '#F03A2A' },
              }}
            >
              <X size={22} />
            </IconButton>
          </Box>
        </Box>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 88,
                height: 88,
                borderRadius: '50%',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(240, 232, 216, 0.08)' : '#EDE4D1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2.5,
                color: '#F03A2A',
              }}
            >
              <ShoppingBag size={44} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.2 }}>
              Your basket is empty
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 300, mb: 3.5, lineHeight: 1.6 }}>
              Explore our farm-fresh harvests, stoneground grains, and organic pantry staples!
            </Typography>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                backgroundColor: '#1B3350',
                color: '#F0E8D8',
                fontWeight: 800,
                px: 4,
                py: 1.2,
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: '#26456B',
                },
              }}
            >
              Start Shopping
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Items list */}
            <Box sx={{ mb: 2 }}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </Box>

            {/* Promo Code Box */}
            <PromoCodeInput />

            {/* Bill Summary */}
            <CartSummary />

            <Divider sx={{ my: 2.5 }} />

            {/* Checkout Action */}
            <Box sx={{ mt: 'auto', pt: 1 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleOpenCheckout}
                endIcon={<ArrowRight size={20} />}
                sx={{
                  backgroundColor: '#F03A2A', // 10% Accent color (Lobster Red)
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  py: 1.5,
                  borderRadius: '14px',
                  boxShadow: '0 8px 25px rgba(240, 58, 42, 0.4)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    backgroundColor: '#D82F20',
                    boxShadow: '0 10px 30px rgba(240, 58, 42, 0.55)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                }}
              >
                Proceed to Checkout • ₹{grandTotal.toLocaleString('en-IN')}
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* Checkout Dialog Modal */}
      <CheckoutModal open={checkoutOpen} onClose={handleCloseCheckout} />
    </>
  );
}
