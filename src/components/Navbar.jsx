import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  IconButton,
  Badge,
  Drawer,
  Button,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { ShoppingBag, Heart, X, Trash2, Home, Bell, Sparkles, Tag, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenCart, searchTerm, onSearchChange }) {
  const navigate = useNavigate();
  const { totalCount, wishlist, toggleWishlist, addToCart } = useCart();
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const notifications = [
    {
      id: 1,
      title: 'Free Delivery Threshold Lowered!',
      description: 'Get free doorstep delivery on all orders above ₹100 now.',
      time: 'Just now',
      icon: CheckCircle2,
      color: '#10B981',
    },
    {
      id: 2,
      title: 'Use Coupon VEG50',
      description: 'Flat ₹50 OFF on orders above ₹150. Use code VEG50 at checkout.',
      time: '2 hours ago',
      icon: Tag,
      color: '#F03A2A',
    },
    {
      id: 3,
      title: 'Fresh Harvest of the Day',
      description: 'Authentic Ratnagiri Alphonso mangoes and A2 Gir cow milk are in stock.',
      time: 'Today',
      icon: Sparkles,
      color: '#1B3350',
    },
  ];

  const handleGoHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#1B3350', // 30% Prussian Blue
          color: '#F0E8D8', // 60% Ricotta Cream
          borderBottom: '1px solid rgba(240, 232, 216, 0.15)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 1100,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 68, md: 74 },
              py: { xs: 1, md: 1 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: { xs: 1.5, md: 3 },
            }}
          >
            {/* Brand Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.3,
                cursor: 'pointer',
                userSelect: 'none',
                flexShrink: 0,
                transition: 'opacity 0.2s ease',
                '&:hover': { opacity: 0.92 },
              }}
              onClick={handleGoHome}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: '12px',
                  backgroundColor: '#F03A2A', // 10% Lobster Red accent
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(240, 58, 42, 0.4)',
                  flexShrink: 0,
                }}
              >
                <ShoppingBag size={22} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 800,
                    fontSize: { xs: '1.2rem', md: '1.45rem' },
                    lineHeight: 1.1,
                    color: '#F0E8D8',
                    letterSpacing: '-0.02em',
                  }}
                >
                  VegBasket
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(240, 232, 216, 0.75)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: { xs: 'none', sm: 'block' },
                    mt: 0.2,
                  }}
                >
                  Artisanal Grocery Storefront
                </Typography>
              </Box>
            </Box>

            {/* Search Bar - Center */}
            <Box
              sx={{
                flex: 1,
                maxWidth: { xs: '100%', md: 540 },
                mx: { xs: 0, md: 'auto' },
              }}
            >
              <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
            </Box>

            {/* Right Actions: Home Icon + Notification Bell + Wishlist + Cart */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flexShrink: 0 }}>
              {/* Home Icon Button (No Text) */}
              <Tooltip title="Home">
                <IconButton
                  onClick={handleGoHome}
                  aria-label="Go to homepage"
                  sx={{
                    color: '#F0E8D8',
                    backgroundColor: 'rgba(240, 232, 216, 0.1)',
                    border: '1px solid rgba(240, 232, 216, 0.18)',
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(240, 58, 42, 0.2)',
                      borderColor: '#F03A2A',
                      color: '#FFFFFF',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Home size={20} />
                </IconButton>
              </Tooltip>

              {/* Notification Bell Button */}
              <Tooltip title="Notifications">
                <IconButton
                  onClick={(e) => setNotificationAnchor(e.currentTarget)}
                  aria-label="View notifications"
                  sx={{
                    color: '#F0E8D8',
                    backgroundColor: 'rgba(240, 232, 216, 0.1)',
                    border: '1px solid rgba(240, 232, 216, 0.18)',
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(240, 58, 42, 0.2)',
                      borderColor: '#F03A2A',
                      color: '#FFFFFF',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Badge
                    badgeContent={notifications.length}
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#F03A2A',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '0.7rem',
                      },
                    }}
                  >
                    <Bell size={20} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Wishlist Button */}
              <IconButton
                onClick={() => setWishlistDrawerOpen(true)}
                aria-label="View wishlist"
                sx={{
                  color: '#F0E8D8',
                  backgroundColor: 'rgba(240, 232, 216, 0.1)',
                  border: '1px solid rgba(240, 232, 216, 0.18)',
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(240, 58, 42, 0.2)',
                    borderColor: '#F03A2A',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Badge
                  badgeContent={wishlist.length}
                  max={99}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#F03A2A',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '0.72rem',
                    },
                  }}
                >
                  <Heart size={20} />
                </Badge>
              </IconButton>

              {/* Shopping Cart Button */}
              <IconButton
                onClick={onOpenCart}
                aria-label="View basket"
                sx={{
                  color: '#F0E8D8',
                  backgroundColor: 'rgba(240, 232, 216, 0.12)',
                  border: '1px solid rgba(240, 232, 216, 0.22)',
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(240, 58, 42, 0.2)',
                    borderColor: '#F03A2A',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Badge
                  badgeContent={totalCount}
                  max={99}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#F03A2A', // 10% Lobster Red accent
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '0.74rem',
                      boxShadow: '0 2px 6px rgba(240, 58, 42, 0.6)',
                    },
                  }}
                >
                  <ShoppingBag size={20} />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Notifications Popover Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={() => setNotificationAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              mt: 1.5,
              width: 340,
              maxWidth: '90vw',
              borderRadius: '16px',
              backgroundColor: '#FDFBF7',
              border: '1px solid rgba(27, 51, 80, 0.14)',
              boxShadow: '0 12px 36px rgba(27, 51, 80, 0.2)',
              p: 1.5,
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1, pb: 1, mb: 1, borderBottom: '1px solid rgba(27, 51, 80, 0.1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Bell size={18} color="#F03A2A" />
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B3350' }}>
              Notifications
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
            {notifications.length} New
          </Typography>
        </Box>

        {notifications.map((notif) => {
          const IconComp = notif.icon;
          return (
            <MenuItem
              key={notif.id}
              onClick={() => setNotificationAnchor(null)}
              sx={{
                borderRadius: '12px',
                py: 1.2,
                px: 1,
                mb: 0.8,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                whiteSpace: 'normal',
                '&:hover': {
                  backgroundColor: 'rgba(240, 58, 42, 0.08)',
                },
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '10px',
                  backgroundColor: 'rgba(240, 232, 216, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.2,
                  color: notif.color,
                }}
              >
                <IconComp size={18} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#1B3350', lineHeight: 1.25 }}>
                  {notif.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.3, lineHeight: 1.35 }}>
                  {notif.description}
                </Typography>
                <Typography variant="caption" sx={{ color: '#F03A2A', fontWeight: 700, fontSize: '0.68rem', mt: 0.3, display: 'block' }}>
                  {notif.time}
                </Typography>
              </Box>
            </MenuItem>
          );
        })}
      </Menu>

      {/* Wishlist Drawer */}
      <Drawer
        anchor="right"
        open={wishlistDrawerOpen}
        onClose={() => setWishlistDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 420 },
            backgroundColor: '#F7F2E7',
            color: '#1B3350',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, pb: 1.5, borderBottom: '1px solid rgba(27, 51, 80, 0.12)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Heart size={20} color="#F03A2A" fill="#F03A2A" />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Your Wishlist ({wishlist.length})
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setWishlistDrawerOpen(false)}>
            <X size={20} />
          </IconButton>
        </Box>

        {wishlist.length === 0 ? (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', p: 3 }}>
            <Heart size={48} color="#D8C9B4" />
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mt: 2, mb: 1 }}>
              Your wishlist is empty
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 260 }}>
              Save your favourite seasonal groceries and pantry staples here by clicking the heart icon on any card!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {wishlist.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  py: 1.5,
                  borderBottom: '1px solid rgba(27, 51, 80, 0.08)',
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{ width: 56, height: 56, borderRadius: '10px', objectFit: 'cover', bgcolor: '#EDE4D1' }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.2 }}>
                    {item.unit} • <strong style={{ color: '#F03A2A' }}>₹{item.price}</strong>
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => addToCart(item, 1)}
                  sx={{
                    bgcolor: '#1B3350',
                    color: '#F0E8D8',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    px: 1.5,
                    py: 0.5,
                    '&:hover': { bgcolor: '#26456B' },
                  }}
                >
                  Add
                </Button>
                <IconButton size="small" onClick={() => toggleWishlist(item)} sx={{ color: 'text.secondary', '&:hover': { color: '#F03A2A' } }}>
                  <Trash2 size={16} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Drawer>
    </>
  );
}
