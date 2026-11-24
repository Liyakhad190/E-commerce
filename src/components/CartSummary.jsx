import React from 'react';
import { Box, Typography, Divider, LinearProgress } from '@mui/material';
import { Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart, FREE_DELIVERY_THRESHOLD } from '../context/CartContext';

export default function CartSummary() {
  const { subtotal, tax, deliveryFee, discountAmount, grandTotal, appliedPromo } = useCart();

  const progressToFreeDelivery = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const amountNeeded = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const isFreeDelivery = deliveryFee === 0 && subtotal > 0;

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(240, 232, 216, 0.05)' : '#FDFBF7',
        borderRadius: '18px',
        p: 2.5,
        border: (theme) =>
          theme.palette.mode === 'dark'
            ? '1px solid rgba(240, 232, 216, 0.14)'
            : '1px solid rgba(27, 51, 80, 0.12)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Free Delivery Bar */}
      <Box sx={{ mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.9 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            {isFreeDelivery ? (
              <CheckCircle2 size={17} color="#10B981" />
            ) : (
              <Truck size={17} color="#F03A2A" />
            )}
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.84rem' }}>
              {isFreeDelivery ? (
                <Box component="span" sx={{ color: '#10B981' }}>
                  Yay! You unlocked <strong>FREE Doorstep Delivery</strong>!
                </Box>
              ) : (
                <span>
                  Add <strong style={{ color: '#F03A2A' }}>₹{amountNeeded}</strong> more for{' '}
                  <strong>FREE Delivery</strong>
                </span>
              )}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>
            {progressToFreeDelivery}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progressToFreeDelivery}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(240, 232, 216, 0.14)' : '#EDE4D1',
            '& .MuiLinearProgress-bar': {
              backgroundColor: isFreeDelivery ? '#10B981' : '#F03A2A',
              borderRadius: 4,
              transition: 'transform 0.4s ease',
            },
          }}
        />
      </Box>

      <Typography
        variant="caption"
        sx={{
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'text.secondary',
          display: 'block',
          mb: 1.8,
        }}
      >
        Itemized Bill Breakdown
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4 }}>
        {/* Item Total */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            Item Total (Subtotal)
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            ₹{subtotal.toLocaleString('en-IN')}
          </Typography>
        </Box>

        {/* Promo Discount */}
        {appliedPromo && discountAmount > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Sparkles size={14} color="#F03A2A" />
              <Typography variant="body2" sx={{ color: '#F03A2A', fontWeight: 700 }}>
                Coupon Discount ({appliedPromo.code})
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#F03A2A', fontWeight: 800 }}>
              - ₹{discountAmount.toLocaleString('en-IN')}
            </Typography>
          </Box>
        )}

        {/* Delivery Fee */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            Standard Doorstep Delivery
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {deliveryFee === 0 ? (
              <Box component="span" sx={{ color: '#10B981', fontWeight: 800 }}>
                FREE
              </Box>
            ) : (
              `₹${deliveryFee}`
            )}
          </Typography>
        </Box>

        {/* Taxes */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            GST &amp; Operational Taxes (5%)
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            ₹{tax.toLocaleString('en-IN')}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Grand Total */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              Grand Total
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Inclusive of all taxes
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#F03A2A', // 10% Accent color (Lobster Red)
              letterSpacing: '-0.02em',
            }}
          >
            ₹{grandTotal.toLocaleString('en-IN')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
