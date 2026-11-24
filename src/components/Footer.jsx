import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { ShoppingBag, Heart, Clock, ShieldCheck, PhoneCall, Mail, Truck, Award, CheckCircle } from 'lucide-react';

export default function Footer({ onCategoryClick }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1B3350', // 30% Prussian Blue
        color: '#F0E8D8', // 60% Ricotta Cream
        mt: 10,
        pt: { xs: 6, md: 8 },
        pb: 5,
        borderTop: '1px solid rgba(240, 232, 216, 0.16)',
      }}
    >
      <Container maxWidth="xl">
        {/* Top Trust Signals Banner */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
            pb: 6,
            mb: 6,
            borderBottom: '1px solid rgba(240, 232, 216, 0.12)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ p: 1.2, borderRadius: '12px', bgcolor: 'rgba(240, 58, 42, 0.15)', color: '#F03A2A' }}>
              <Truck size={24} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#F0E8D8' }}>
                2-Hour Doorstep Delivery
              </Typography>
              <Typography variant="caption" sx={{ color: '#D8C9B4' }}>
                On all orders placed before 9 PM
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ p: 1.2, borderRadius: '12px', bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <ShieldCheck size={24} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#F0E8D8' }}>
                100% Quality Assurance
              </Typography>
              <Typography variant="caption" sx={{ color: '#D8C9B4' }}>
                Instant replacement if unsatisfied
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ p: 1.2, borderRadius: '12px', bgcolor: 'rgba(240, 58, 42, 0.15)', color: '#F03A2A' }}>
              <Award size={24} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#F0E8D8' }}>
                Direct Farm Sourced
              </Typography>
              <Typography variant="caption" sx={{ color: '#D8C9B4' }}>
                Fair prices directly to growers
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ p: 1.2, borderRadius: '12px', bgcolor: 'rgba(240, 232, 216, 0.15)', color: '#F0E8D8' }}>
              <Clock size={24} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#F0E8D8' }}>
                Freshness Daily at Dawn
              </Typography>
              <Typography variant="caption" sx={{ color: '#D8C9B4' }}>
                Zero warehouse cold-chain break
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 4-Column Footer Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: '1.6fr 1.1fr 1.3fr 1.5fr',
            },
            gap: { xs: 4, sm: 4, md: 5 },
            mb: 6,
          }}
        >
          {/* Column 1: Brand & Bio */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4, mb: 2 }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  bgcolor: '#F03A2A', // 10% Lobster Red accent
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(240, 58, 42, 0.4)',
                }}
              >
                <ShoppingBag size={20} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  letterSpacing: '-0.02em',
                  color: '#F0E8D8',
                }}
              >
                VegBasket
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: '#D8C9B4', mb: 2.5, lineHeight: 1.65, maxWidth: 340 }}>
              Curating chemical-free farm harvests, stoneground ancient staples, A2 indigenous dairy, and artisanal munchies directly from verified regional growers across India.
            </Typography>
          </Box>

          {/* Column 2: Pantry Categories */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                mb: 2.2,
                letterSpacing: '0.08em',
                color: '#F0E8D8',
                fontSize: '0.86rem',
                textTransform: 'uppercase',
              }}
            >
              Departments
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.1 }}>
              {[
                { label: 'Fresh Produce', id: 'fruits-vegetables' },
                { label: 'Dairy & Bakery', id: 'dairy-bakery' },
                { label: 'Grains & Staples', id: 'grains-staples' },
                { label: 'Snacks & Munchies', id: 'snacks' },
                { label: 'Beverages & Juices', id: 'beverages' },
              ].map((link) => (
                <Typography
                  key={link.id}
                  variant="body2"
                  onClick={() => onCategoryClick && onCategoryClick(link.id)}
                  sx={{
                    color: '#D8C9B4',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#F03A2A',
                      transform: 'translateX(3px)',
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Column 3: Store & Operations */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                mb: 2.2,
                letterSpacing: '0.08em',
                color: '#F0E8D8',
                fontSize: '0.86rem',
                textTransform: 'uppercase',
              }}
            >
              Customer Care
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                <Clock size={16} color="#F03A2A" />
                <Typography variant="body2" sx={{ color: '#D8C9B4', fontWeight: 500 }}>
                  Open Daily: 6:00 AM – 11:00 PM
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                <PhoneCall size={16} color="#F03A2A" />
                <Typography variant="body2" sx={{ color: '#D8C9B4', fontWeight: 500 }}>
                  Helpdesk: 1800 200 4588
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                <Mail size={16} color="#F03A2A" />
                <Typography variant="body2" sx={{ color: '#D8C9B4', fontWeight: 500 }}>
                  support@vegbasket.in
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Column 4: Newsletter Subscription */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                mb: 1.5,
                letterSpacing: '0.08em',
                color: '#F0E8D8',
                fontSize: '0.86rem',
                textTransform: 'uppercase',
              }}
            >
              Fresh Harvest Alerts
            </Typography>
            <Typography variant="body2" sx={{ color: '#D8C9B4', mb: 2, fontSize: '0.85rem' }}>
              Subscribe for weekly organic farm arrivals, seasonal fruit drops, and exclusive pantry savings.
            </Typography>

            {subscribed ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, borderRadius: '10px', bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
                <CheckCircle size={18} />
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  Subscribed! Check your inbox for ₹50 off.
                </Typography>
              </Box>
            ) : (
              <form onSubmit={handleSubscribe}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Your email address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.86rem',
                      },
                      '& .MuiInputBase-input': { color: '#1B3350' },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: '#F03A2A',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      borderRadius: '10px',
                      px: 2,
                      '&:hover': { bgcolor: '#D82F20' },
                    }}
                  >
                    Join
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </Box>

        {/* Bottom copyright bar */}
        <Box
          sx={{
            pt: 3,
            borderTop: '1px solid rgba(240, 232, 216, 0.12)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: 'rgba(240, 232, 216, 0.65)', fontWeight: 600 }}>
            &copy; {new Date().getFullYear()} VegBasket Grocery Storefront. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <Typography variant="caption" sx={{ color: 'rgba(240, 232, 216, 0.65)', fontWeight: 600 }}>
              Curated with
            </Typography>
            <Heart size={14} fill="#F03A2A" color="#F03A2A" />
            <Typography variant="caption" sx={{ color: 'rgba(240, 232, 216, 0.65)', fontWeight: 600 }}>
              for fresh Indian kitchens
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
