import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  Button,
  Grid,
} from '@mui/material';
import { X, Star, ShoppingBag, ShieldCheck, Clock, MapPin, Truck } from 'lucide-react';
import QuantityStepper from './QuantityStepper';
import { useCart } from '../context/CartContext';

export default function ProductQuickViewModal({ product, open, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
    setQuantity(1);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1B3350' : '#FDFBF7'),
          color: (theme) => (theme.palette.mode === 'dark' ? '#F0E8D8' : '#1B3350'),
          overflow: 'hidden',
          p: 0,
          border: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(240, 232, 216, 0.2)'
              : '1px solid rgba(27, 51, 80, 0.15)',
        },
      }}
    >
      {/* Floating Close Button */}
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
        <IconButton
          onClick={onClose}
          aria-label="Close modal"
          sx={{
            backgroundColor: 'rgba(27, 51, 80, 0.75)',
            backdropFilter: 'blur(8px)',
            color: '#F0E8D8',
            width: 38,
            height: 38,
            '&:hover': {
              backgroundColor: '#F03A2A',
              color: '#FFFFFF',
            },
          }}
        >
          <X size={20} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <Grid container>
          {/* Image Column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: { xs: 280, md: '100%' },
                minHeight: { md: 500 },
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#EDE4D1',
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Discount Tag */}
              {product.discount > 0 && (
                <Chip
                  label={`${product.discount}% OFF`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 18,
                    left: 18,
                    backgroundColor: '#F03A2A',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(240, 58, 42, 0.4)',
                  }}
                />
              )}
            </Box>
          </Grid>

          {/* Details Column */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                p: { xs: 3, sm: 4 },
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Category & Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#F03A2A',
                    }}
                  >
                    {product.category.replace('-', ' & ')}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.6,
                      bgcolor: 'rgba(27, 51, 80, 0.08)',
                      px: 1.2,
                      py: 0.4,
                      borderRadius: '8px',
                    }}
                  >
                    <Star size={15} fill="#F03A2A" color="#F03A2A" />
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      {product.rating}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      ({product.reviewsCount} reviews)
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.25 }}>
                  {product.name}
                </Typography>

                <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2.5 }}>
                  Net Quantity: <strong>{product.unit}</strong>
                </Typography>

                {/* Price Row */}
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 3 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#F03A2A', letterSpacing: '-0.02em' }}>
                    ₹{product.price}
                  </Typography>
                  {product.originalPrice > product.price && (
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.secondary',
                        fontWeight: 600,
                      }}
                    >
                      ₹{product.originalPrice}
                    </Typography>
                  )}
                  <Chip
                    label={`Save ₹${product.originalPrice - product.price}`}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(16, 185, 129, 0.12)',
                      color: '#10B981',
                      fontWeight: 700,
                      borderRadius: '6px',
                    }}
                  />
                </Box>

                {/* Description */}
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.65 }}>
                  {product.description}
                </Typography>

                {/* Origin & Shelf Life badges */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                  {product.origin && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1.2,
                        borderRadius: '10px',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark' ? 'rgba(240, 232, 216, 0.06)' : 'rgba(27, 51, 80, 0.05)',
                      }}
                    >
                      <MapPin size={17} color="#F03A2A" />
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        Origin: {product.origin}
                      </Typography>
                    </Box>
                  )}
                  {product.shelfLife && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1.2,
                        borderRadius: '10px',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark' ? 'rgba(240, 232, 216, 0.06)' : 'rgba(27, 51, 80, 0.05)',
                      }}
                    >
                      <Clock size={17} color="#F03A2A" />
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        Shelf Life: {product.shelfLife}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Nutritional Info Matrix */}
                {product.nutrition && (
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(240, 232, 216, 0.05)' : 'rgba(27, 51, 80, 0.04)',
                      mb: 3.5,
                      border: '1px solid rgba(27, 51, 80, 0.08)',
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', mb: 1.2, letterSpacing: '0.04em' }}>
                      NUTRITIONAL HIGHLIGHTS:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {Object.entries(product.nutrition).map(([key, val]) => (
                        <Chip
                          key={key}
                          label={`${key.toUpperCase()}: ${val}`}
                          size="small"
                          sx={{
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            bgcolor: (theme) =>
                              theme.palette.mode === 'dark' ? 'rgba(240, 232, 216, 0.08)' : '#F7F2E7',
                            border: '1px solid rgba(27, 51, 80, 0.12)',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </div>

              {/* Bottom Actions Row */}
              <Box sx={{ pt: 2, borderTop: '1px solid rgba(27, 51, 80, 0.1)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <QuantityStepper
                    quantity={quantity}
                    onIncrease={() => setQuantity((q) => Math.min(q + 1, product.maxStock || 15))}
                    onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
                    max={product.maxStock || 15}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAddToCart}
                    startIcon={<ShoppingBag size={18} />}
                    sx={{
                      height: 44,
                      backgroundColor: '#F03A2A', // 10% Accent color (Lobster Red)
                      color: '#FFFFFF',
                      fontWeight: 800,
                      borderRadius: '12px',
                      boxShadow: '0 6px 18px rgba(240, 58, 42, 0.35)',
                      '&:hover': {
                        backgroundColor: '#D82F20',
                      },
                    }}
                  >
                    Add to Basket • ₹{product.price * quantity}
                  </Button>
                </Box>

                {/* Guarantee & Delivery Note */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <ShieldCheck size={16} color="#10B981" />
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      100% Quality Guaranteed
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Truck size={16} color="#F03A2A" />
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      2-Hour Doorstep Delivery
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
