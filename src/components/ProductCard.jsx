import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Star, Eye, ShoppingBag, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuantityStepper from './QuantityStepper';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelectProduct }) {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, toggleWishlist, isInWishlist, trackRecentlyViewed } = useCart();

  const cartItem = cartItems.find((item) => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const inWishlist = isInWishlist(product.id);

  const handleCardClick = (e) => {
    // If user clicked inside a button or stepper, do not trigger page navigation
    if (e.target.closest('button')) return;
    trackRecentlyViewed(product);
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    trackRecentlyViewed(product);
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '18px',
        backgroundColor: '#F7F2E7', // Ricotta elevated surface
        border: '1px solid rgba(27, 51, 80, 0.12)',
        boxShadow: '0 2px 10px rgba(27, 51, 80, 0.04)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 28px rgba(27, 51, 80, 0.12)',
          borderColor: '#F03A2A',
          '& .quick-view-btn': {
            opacity: 1,
            transform: 'translate(-50%, 0)',
          },
          '& .product-media': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      {/* Top Badges & Wishlist Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          right: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 3,
        }}
      >
        {/* Discount Pill */}
        {product.discount > 0 ? (
          <Chip
            label={`${product.discount}% OFF`}
            size="small"
            sx={{
              backgroundColor: '#F03A2A', // 10% Lobster Red accent
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.72rem',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(240, 58, 42, 0.35)',
              height: 22,
            }}
          />
        ) : (
          <Box />
        )}

        {/* Wishlist Button */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          sx={{
            backgroundColor: 'rgba(247, 242, 231, 0.92)',
            backdropFilter: 'blur(4px)',
            width: 32,
            height: 32,
            color: inWishlist ? '#F03A2A' : '#1B3350',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: '#F03A2A',
              transform: 'scale(1.1)',
            },
          }}
        >
          <Heart size={16} fill={inWishlist ? '#F03A2A' : 'none'} />
        </IconButton>
      </Box>

      {/* Product Image Container */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          height: 180,
          width: '100%',
          backgroundColor: '#EDE4D1',
        }}
      >
        <CardMedia
          className="product-media"
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* View Details Pill on Hover */}
        <Tooltip title="View Full Details">
          <Button
            className="quick-view-btn"
            onClick={handleViewDetails}
            variant="contained"
            size="small"
            sx={{
              position: 'absolute',
              bottom: 10,
              left: '50%',
              transform: 'translate(-50%, 10px)',
              opacity: 0,
              transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
              backgroundColor: 'rgba(27, 51, 80, 0.92)',
              color: '#F0E8D8',
              fontWeight: 700,
              fontSize: '0.74rem',
              borderRadius: '8px',
              px: 1.8,
              py: 0.5,
              backdropFilter: 'blur(6px)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: '#F03A2A',
                color: '#FFFFFF',
              },
            }}
            startIcon={<Eye size={13} />}
          >
            View Details
          </Button>
        </Tooltip>
      </Box>

      {/* Content Body */}
      <CardContent sx={{ p: 1.8, pb: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Category Tag & Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.6, height: 18 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#F03A2A',
              fontSize: '0.68rem',
              letterSpacing: '0.06em',
            }}
          >
            {product.category.replace('-', ' & ')}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <Star size={12} fill="#F03A2A" color="#F03A2A" />
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#1B3350', fontSize: '0.72rem' }}>
              {product.rating}
            </Typography>
          </Box>
        </Box>

        {/* Product Title (Strict 2-line clamp with fixed minHeight for 100% uniform card alignment) */}
        <Typography
          variant="subtitle2"
          className="line-clamp-2"
          title={product.name}
          sx={{
            fontWeight: 800,
            fontSize: '0.92rem',
            lineHeight: 1.3,
            minHeight: '2.4rem',
            maxHeight: '2.4rem',
            mb: 0.6,
            color: '#1B3350',
            transition: 'color 0.18s ease',
            '&:hover': { color: '#F03A2A' },
          }}
        >
          {product.name}
        </Typography>

        {/* Unit Weight */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.2, height: 18 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.74rem' }}>
            {product.unit}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#10B981' }} />
            <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700, fontSize: '0.68rem' }}>
              In Stock
            </Typography>
          </Box>
        </Box>

        {/* Price Block */}
        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', height: 28 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.8 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#F03A2A', fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
              ₹{product.price}
            </Typography>
            {product.originalPrice > product.price && (
              <Typography
                variant="caption"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                }}
              >
                ₹{product.originalPrice}
              </Typography>
            )}
          </Box>
          {product.originalPrice > product.price && (
            <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700, fontSize: '0.68rem' }}>
              Save ₹{product.originalPrice - product.price}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Action Button: Pinned to Bottom with Fixed Height */}
      <CardActions sx={{ p: 1.8, pt: 0, height: 48, display: 'flex', alignItems: 'center' }}>
        {currentQuantity > 0 ? (
          <QuantityStepper
            fullWidth
            quantity={currentQuantity}
            onIncrease={(e) => {
              if (e && e.stopPropagation) e.stopPropagation();
              updateQuantity(product.id, currentQuantity + 1);
            }}
            onDecrease={(e) => {
              if (e && e.stopPropagation) e.stopPropagation();
              updateQuantity(product.id, currentQuantity - 1);
            }}
            max={product.maxStock || 15}
            size="small"
          />
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            startIcon={<ShoppingBag size={15} />}
            sx={{
              height: 38,
              backgroundColor: '#F03A2A', // 10% Lobster Red accent
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.84rem',
              borderRadius: '10px',
              boxShadow: '0 3px 10px rgba(240, 58, 42, 0.3)',
              transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                backgroundColor: '#D82F20',
                boxShadow: '0 5px 14px rgba(240, 58, 42, 0.45)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Add to Basket
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
