import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Chip } from '@mui/material';
import { Tag, Check, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PROMO_CODES } from '../data/groceries';

export default function PromoCodeInput() {
  const { appliedPromo, applyPromoCode, removePromoCode } = useCart();
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!code.trim()) return;

    const result = applyPromoCode(code);
    if (!result.success) {
      setErrorMsg(result.message);
    } else {
      setCode('');
      setErrorMsg('');
    }
  };

  const handleQuickApply = (couponCode) => {
    setErrorMsg('');
    const result = applyPromoCode(couponCode);
    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  return (
    <Box sx={{ mt: 2.5, mb: 2.5 }}>
      {appliedPromo ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.8,
            borderRadius: '14px',
            backgroundColor: 'rgba(240, 58, 42, 0.08)',
            border: '1.5px dashed #F03A2A',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <Check size={20} color="#F03A2A" />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#F03A2A' }}>
                Coupon &ldquo;{appliedPromo.code}&rdquo; Applied!
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                {appliedPromo.description}
              </Typography>
            </Box>
          </Box>
          <Button
            size="small"
            onClick={removePromoCode}
            sx={{
              minWidth: 0,
              p: 0.8,
              borderRadius: '8px',
              color: '#F03A2A',
              '&:hover': { backgroundColor: 'rgba(240, 58, 42, 0.15)' },
            }}
            aria-label="Remove promo code"
          >
            <X size={17} />
          </Button>
        </Box>
      ) : (
        <form onSubmit={handleApply}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Enter coupon code (e.g. FRESH10)"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (errorMsg) setErrorMsg('');
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center', color: '#1B3350' }}>
                      <Tag size={16} />
                    </Box>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#FFFFFF',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  border: '1px solid rgba(27, 51, 80, 0.18)',
                },
                '& .MuiInputBase-input': {
                  color: '#1B3350',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!code.trim()}
              sx={{
                backgroundColor: '#1B3350',
                color: '#F0E8D8',
                fontWeight: 800,
                fontSize: '0.88rem',
                borderRadius: '12px',
                whiteSpace: 'nowrap',
                px: 2.5,
                '&:hover': {
                  backgroundColor: '#26456B',
                },
              }}
            >
              Apply
            </Button>
          </Box>

          {errorMsg && (
            <Typography variant="caption" sx={{ color: '#F03A2A', display: 'block', mt: 1, fontWeight: 700 }}>
              {errorMsg}
            </Typography>
          )}

          {/* Quick Clickable Suggestions */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mt: 1.5 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, mr: 0.5 }}>
              Available Coupons:
            </Typography>
            {Object.keys(PROMO_CODES).map((couponKey) => (
              <Chip
                key={couponKey}
                label={couponKey}
                size="small"
                onClick={() => handleQuickApply(couponKey)}
                sx={{
                  cursor: 'pointer',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  borderRadius: '8px',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(240, 232, 216, 0.1)' : '#EDE4D1',
                  color: (theme) => (theme.palette.mode === 'dark' ? '#F0E8D8' : '#1B3350'),
                  border: '1px dashed currentColor',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    backgroundColor: '#F03A2A',
                    color: '#FFFFFF',
                    borderColor: '#F03A2A',
                    transform: 'translateY(-1px)',
                  },
                }}
              />
            ))}
          </Box>
        </form>
      )}
    </Box>
  );
}
