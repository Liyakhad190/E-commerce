import React from 'react';
import { Box, Typography, Button, Container, Chip } from '@mui/material';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { GROCERY_ITEMS } from '../data/groceries';

export default function HeroBanner({ onShopNow }) {
  const { addToCart } = useCart();
  const featuredProduct = GROCERY_ITEMS.find((item) => item.id === 'prod-1') || GROCERY_ITEMS[0];

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: { xs: '18px', md: '28px' },
        overflow: 'hidden',
        mb: { xs: 3, md: 4.5 },
        backgroundColor: '#1B3350', // 30% Prussian Blue
        color: '#F0E8D8', // 60% Ricotta Cream
        boxShadow: '0 16px 40px rgba(27, 51, 80, 0.18)',
        border: '1px solid rgba(240, 232, 216, 0.14)',
      }}
    >
      {/* Decorative ambient background glows */}
      <Box
        sx={{
          position: 'absolute',
          top: -70,
          right: -70,
          width: 320,
          height: 320,
          borderRadius: '50%',
          backgroundColor: 'rgba(240, 58, 42, 0.18)', // 10% Lobster Red accent glow
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: 40,
          width: 240,
          height: 240,
          borderRadius: '50%',
          backgroundColor: 'rgba(240, 232, 216, 0.08)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ py: { xs: 3.5, sm: 4.5, md: 5 }, px: { xs: 2.5, sm: 4, md: 5 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr', lg: '1.3fr 0.7fr' },
            gap: { xs: 3.5, md: 4.5 },
            alignItems: 'center',
          }}
        >
          {/* Left Column: Promotional Content */}
          <Box sx={{ maxWidth: 660 }}>
            {/* Pill Tag */}
            <Chip
              icon={<Sparkles size={14} color="#F03A2A" style={{ marginLeft: 6 }} />}
              label="100% Farm Sourced • Harvested Daily at Dawn"
              size="small"
              sx={{
                backgroundColor: 'rgba(240, 232, 216, 0.12)',
                color: '#F0E8D8',
                fontWeight: 700,
                fontSize: '0.78rem',
                py: 1.6,
                px: 0.5,
                mb: 2,
                border: '1px solid rgba(240, 232, 216, 0.22)',
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.9rem', sm: '2.4rem', md: '3rem', lg: '3.4rem' },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 1.8,
                color: '#F0E8D8',
                letterSpacing: '-0.02em',
              }}
            >
              Farm Fresh Essentials, Delivered in 2 Hours.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#DECDB5',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.6,
                mb: 3,
                maxWidth: 580,
              }}
            >
              From GI-tagged Ratnagiri Alphonso mangoes and single-estate A2 Gir cow milk to hydroponic greens and stoneground staples. Experience pure ingredients with complete cold-chain assurance.
            </Typography>

            {/* CTA Group */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                onClick={onShopNow}
                endIcon={<ArrowRight size={18} />}
                sx={{
                  backgroundColor: '#F03A2A', // 10% Lobster Red CTA
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.96rem',
                  px: 3.5,
                  py: 1.3,
                  borderRadius: '12px',
                  boxShadow: '0 6px 20px rgba(240, 58, 42, 0.4)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    backgroundColor: '#D82F20',
                    boxShadow: '0 8px 24px rgba(240, 58, 42, 0.55)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Shop Fresh Pantry
              </Button>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8,
                  px: 1.8,
                  py: 1,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(240, 232, 216, 0.08)',
                  border: '1px solid rgba(240, 232, 216, 0.15)',
                }}
              >
                <Star size={15} fill="#F03A2A" color="#F03A2A" />
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#F0E8D8' }}>
                  4.9 / 5.0
                </Typography>
                <Typography variant="caption" sx={{ color: '#D8C9B4' }}>
                  (2,400+ Kitchens)
                </Typography>
              </Box>
            </Box>

            {/* Quick Guarantees Strip */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 2, sm: 3 },
                pt: 2,
                borderTop: '1px solid rgba(240, 232, 216, 0.12)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Zap size={16} color="#F03A2A" />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#F0E8D8' }}>
                  2-Hour Express Delivery
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <ShieldCheck size={16} color="#10B981" />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#F0E8D8' }}>
                  Zero Cold-Chain Breaks
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Column: Balanced Featured Harvest Card */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
              p: 2.5,
              borderRadius: '20px',
              backgroundColor: 'rgba(240, 232, 216, 0.08)',
              border: '1px solid rgba(240, 232, 216, 0.18)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.22)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.08em', color: '#F03A2A' }}>
                FEATURED HARVEST OF THE DAY
              </Typography>
              <Chip
                label={`${featuredProduct.discount}% OFF`}
                size="small"
                sx={{
                  bgcolor: '#F03A2A',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  height: 22,
                  borderRadius: '6px',
                }}
              />
            </Box>

            <Box
              sx={{
                position: 'relative',
                height: 180,
                borderRadius: '14px',
                overflow: 'hidden',
                mb: 1.8,
                bgcolor: '#EDE4D1',
                border: '1px solid rgba(240, 232, 216, 0.15)',
              }}
            >
              <Box
                component="img"
                src={featuredProduct.image}
                alt={featuredProduct.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  px: 1,
                  py: 0.3,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(27, 51, 80, 0.9)',
                  backdropFilter: 'blur(4px)',
                  color: '#F0E8D8',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                }}
              >
                GI-Tagged • Ratnagiri Gold
              </Box>
            </Box>

            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#F0E8D8', mb: 0.3 }}>
              {featuredProduct.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#D8C9B4', display: 'block', mb: 1.8 }}>
              {featuredProduct.unit} • Naturally sweet &amp; fiberless
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.8 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#F03A2A' }}>
                  ₹{featuredProduct.price}
                </Typography>
                <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#DECDB5' }}>
                  ₹{featuredProduct.originalPrice}
                </Typography>
              </Box>

              <Button
                size="small"
                variant="contained"
                onClick={() => addToCart(featuredProduct, 1)}
                startIcon={<ShoppingBag size={15} />}
                sx={{
                  backgroundColor: '#F0E8D8',
                  color: '#1B3350',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  borderRadius: '10px',
                  px: 2,
                  py: 0.7,
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(240, 232, 216, 0.3)',
                  },
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
