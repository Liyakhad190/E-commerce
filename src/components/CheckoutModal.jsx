import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Paper,
} from '@mui/material';
import { CheckCircle2, CreditCard, Smartphone, Banknote, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutModal({ open, onClose }) {
  const { cartItems, grandTotal, clearCart } = useCart();
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [formData, setFormData] = useState({
    fullName: 'Aditi Sharma',
    phone: '+91 98765 43210',
    address: 'Flat 402, Green Glen Apartments, Outer Ring Road, Bellandur',
    pincode: '560103',
    instructions: 'Please leave at the door with security if not answering.',
  });
  const [orderId, setOrderId] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `VEGBASKET-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');
    clearCart();
  };

  const handleModalClose = () => {
    if (step === 'success') {
      setStep('form');
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleModalClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#FDFBF7',
          color: '#1B3350',
          borderRadius: '24px',
          p: { xs: 1, sm: 1.5 },
          border: '1px solid rgba(27, 51, 80, 0.15)',
        },
      }}
    >
      {step === 'form' ? (
        <form onSubmit={handlePlaceOrder}>
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pb: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <ShieldCheck size={26} color="#F03A2A" />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Instant Express Checkout
              </Typography>
            </Box>
            <Button
              onClick={handleModalClose}
              size="small"
              sx={{ minWidth: 0, p: 0.8, borderRadius: '8px', color: 'text.secondary' }}
              aria-label="Close checkout"
            >
              <X size={20} />
            </Button>
          </DialogTitle>

          <DialogContent dividers sx={{ borderColor: 'divider', px: { xs: 2, sm: 3 } }}>
            {/* Delivery Details */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.8, color: 'text.primary', letterSpacing: '0.04em' }}>
              1. DELIVERY ADDRESS &amp; CONTACT
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.8, mb: 2 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <TextField
                required
                fullWidth
                size="small"
                label="Mobile Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Box>

            <TextField
              required
              fullWidth
              size="small"
              label="Street Address & Flat / House No."
              name="address"
              value={formData.address}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.8, mb: 3 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                size="small"
                label="Delivery Note (Optional)"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
              />
            </Box>

            <Divider sx={{ my: 2.5 }} />

            {/* Payment Method */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, color: 'text.primary', letterSpacing: '0.04em' }}>
              2. SELECT PAYMENT METHOD
            </Typography>

            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <Paper
                variant="outlined"
                sx={{
                  mb: 1.2,
                  p: 1.5,
                  borderRadius: '14px',
                  borderColor: paymentMethod === 'upi' ? '#F03A2A' : 'divider',
                  bgcolor:
                    paymentMethod === 'upi' ? 'rgba(240, 58, 42, 0.06)' : 'background.paper',
                  transition: 'all 0.2s ease',
                }}
              >
                <FormControlLabel
                  value="upi"
                  control={<Radio sx={{ color: '#F03A2A', '&.Mui-checked': { color: '#F03A2A' } }} />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Smartphone size={20} color="#1B3350" />
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        Instant UPI (Google Pay, PhonePe, Paytm, BHIM)
                      </Typography>
                    </Box>
                  }
                  sx={{ width: '100%', m: 0 }}
                />
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  mb: 1.2,
                  p: 1.5,
                  borderRadius: '14px',
                  borderColor: paymentMethod === 'card' ? '#F03A2A' : 'divider',
                  bgcolor:
                    paymentMethod === 'card' ? 'rgba(240, 58, 42, 0.06)' : 'background.paper',
                  transition: 'all 0.2s ease',
                }}
              >
                <FormControlLabel
                  value="card"
                  control={<Radio sx={{ color: '#F03A2A', '&.Mui-checked': { color: '#F03A2A' } }} />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <CreditCard size={20} color="#1B3350" />
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        Credit / Debit Card (Visa, Mastercard, RuPay)
                      </Typography>
                    </Box>
                  }
                  sx={{ width: '100%', m: 0 }}
                />
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderRadius: '14px',
                  borderColor: paymentMethod === 'cod' ? '#F03A2A' : 'divider',
                  bgcolor:
                    paymentMethod === 'cod' ? 'rgba(240, 58, 42, 0.06)' : 'background.paper',
                  transition: 'all 0.2s ease',
                }}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio sx={{ color: '#F03A2A', '&.Mui-checked': { color: '#F03A2A' } }} />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Banknote size={20} color="#1B3350" />
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        Cash on Delivery (Pay upon arrival)
                      </Typography>
                    </Box>
                  }
                  sx={{ width: '100%', m: 0 }}
                />
              </Paper>
            </RadioGroup>

            {/* Quick summary strip */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: '14px',
                backgroundColor: '#EDE4D1',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Total Payable Amount ({cartItems.length} items)
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#F03A2A' }}>
                ₹{grandTotal.toLocaleString('en-IN')}
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 2.5, display: 'flex', gap: 1.5 }}>
            <Button onClick={handleModalClose} sx={{ color: 'text.secondary', fontWeight: 700, borderRadius: '10px' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#F03A2A', // 10% Accent color (Lobster Red)
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '1rem',
                py: 1.4,
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(240, 58, 42, 0.35)',
                '&:hover': {
                  backgroundColor: '#D82F20',
                },
              }}
            >
              Confirm &amp; Pay ₹{grandTotal.toLocaleString('en-IN')}
            </Button>
          </DialogActions>
        </form>
      ) : (
        /* Order Confirmed Screen */
        <Box sx={{ textAlign: 'center', py: 5, px: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.14)',
              color: '#10B981',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2.5,
            }}
          >
            <CheckCircle2 size={48} />
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.2 }}>
            VegBasket Order Placed!
          </Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, maxWidth: 380, mx: 'auto', lineHeight: 1.6 }}>
            Thank you, {formData.fullName}. Your farm-fresh basket is currently being packed in our temperature-controlled depot.
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              p: 2.5,
              borderRadius: '16px',
              maxWidth: 420,
              mx: 'auto',
              mb: 3.5,
              textAlign: 'left',
              bgcolor: '#EDE4D1',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Order Reference:
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                {orderId}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Payment Method:
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase' }}>
                {paymentMethod}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Estimated Delivery:
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#10B981' }}>
                Today within 2 Hours (Priority Dispatch)
              </Typography>
            </Box>
          </Paper>

          <Button
            variant="contained"
            onClick={handleModalClose}
            startIcon={<ShoppingBag size={18} />}
            sx={{
              backgroundColor: '#1B3350',
              color: '#F0E8D8',
              fontWeight: 800,
              px: 4.5,
              py: 1.3,
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: '#26456B',
              },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      )}
    </Dialog>
  );
}
