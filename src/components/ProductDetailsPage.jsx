import React, { useState } from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Chip,
  Divider,
  Container,
} from '@mui/material';
import {
  Home,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  ShoppingBasket,
} from 'lucide-react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import QuantityStepper from './QuantityStepper';
import ProductCard from './ProductCard';
import CartDrawer from './CartDrawer';
import CheckoutModal from './CheckoutModal';
import ToastNotification from './ToastNotification';
import Footer from './Footer';
import { useCart } from '../context/CartContext';
import { CATEGORIES, GROCERY_ITEMS, getProductById } from '../data/groceries';

export default function ProductDetailsPage({
  cartDrawerOpen,
  setCartDrawerOpen,
  checkoutModalOpen,
  setCheckoutModalOpen,
}) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { cartItems, addToCart, toggleWishlist, isInWishlist } = useCart();

  const [selectedQty, setSelectedQty] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Resolve product from URL param
  const product = getProductById(productId);

  // If product not found — redirect to dedicated 404 page
  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const inWishlist = isInWishlist(product.id);
  const cartItem = cartItems.find((i) => i.id === product.id);
  const currentQuantityInCart = cartItem ? cartItem.quantity : 0;

  // Category info
  const categoryObj = CATEGORIES.find((c) => c.id === product.category) || {
    id: 'all',
    label: 'All Essentials',
  };

  // High-res main product image + complementary focused view angles
  const galleryImages = [
    product.image,
    `${product.image}&sat=20&sharp=15`,
    `${product.image}&crop=edges&fit=crop`,
  ];

  // Related products from same category
  const relatedProducts = GROCERY_ITEMS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Frequently bought together item
  const companionItem = GROCERY_ITEMS.find((p) => p.id !== product.id && p.category === 'dairy-bakery') || GROCERY_ITEMS[2];

  const handleAddToCart = () => {
    addToCart(product, selectedQty);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedQty);
    setCheckoutModalOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F0E8D8', color: '#1B3350' }}>
      {/* Minimal Navbar */}
      <Box
        component="nav"
        sx={{
          backgroundColor: '#1B3350',
          py: 2,
          px: { xs: 2, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1200,
        }}
      >
        <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
          <Box sx={{ width: 36, height: 36, borderRadius: '10px', backgroundColor: '#F03A2A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBasket size={18} color="#FFFFFF" />
          </Box>
          <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', color: '#F0E8D8', letterSpacing: '-0.02em' }}>
            VegBasket
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button onClick={() => navigate('/')} size="small" sx={{ color: '#F0E8D8', fontWeight: 700, '&:hover': { color: '#F03A2A' } }}>
            Home
          </Button>
          <Button onClick={() => navigate(`/category/${product.category}`)} size="small" sx={{ color: '#F0E8D8', fontWeight: 700, '&:hover': { color: '#F03A2A' } }}>
            {categoryObj.label}
          </Button>
          <Button
            onClick={() => setCartDrawerOpen(true)}
            size="small"
            variant="contained"
            sx={{ backgroundColor: '#F03A2A', color: '#fff', fontWeight: 800, borderRadius: '10px', '&:hover': { backgroundColor: '#D82F20' } }}
          >
            Cart
          </Button>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 2.5, sm: 3, md: 4 } }}>
        {/* 1. Breadcrumbs */}
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '0.86rem' }}>
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', cursor: 'pointer', fontWeight: 600, '&:hover': { color: '#F03A2A' } }}
              onClick={() => navigate('/')}
            >
              <Home size={15} />
              Home
            </Link>
            <Link
              underline="hover"
              sx={{ color: 'text.secondary', cursor: 'pointer', fontWeight: 600, '&:hover': { color: '#F03A2A' } }}
              onClick={() => navigate(`/category/${product.category}`)}
            >
              {categoryObj.label}
            </Link>
            <Typography sx={{ color: '#1B3350', fontWeight: 800 }}>
              {product.name}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* 2. Main Product Section (2-Column Desktop Layout) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 1fr' },
            gap: { xs: 3.5, md: 5 },
            alignItems: 'flex-start',
            backgroundColor: '#F7F2E7',
            borderRadius: { xs: '20px', md: '28px' },
            p: { xs: 2.5, sm: 3.5, md: 4.5 },
            border: '1px solid rgba(27, 51, 80, 0.12)',
            boxShadow: '0 8px 30px rgba(27, 51, 80, 0.05)',
            mb: 5,
          }}
        >
          {/* LEFT: Image Gallery */}
          <Box>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 320, sm: 400, md: 440 },
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#EDE4D1',
                border: '1px solid rgba(27, 51, 80, 0.14)',
                mb: 2,
              }}
            >
              <Box
                component="img"
                src={galleryImages[activeImageIndex]}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                  '&:hover': { transform: 'scale(1.08)' },
                }}
              />

              {product.discount > 0 && (
                <Chip
                  label={`${product.discount}% OFF`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    bgcolor: '#F03A2A',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(240, 58, 42, 0.4)',
                  }}
                />
              )}

              <Chip
                icon={<CheckCircle2 size={13} color="#10B981" />}
                label="100% Farm Fresh"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'rgba(27, 51, 80, 0.9)',
                  color: '#F0E8D8',
                  fontWeight: 700,
                  fontSize: '0.74rem',
                  borderRadius: '8px',
                  backdropFilter: 'blur(4px)',
                }}
              />
            </Box>

            {/* Thumbnails */}
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {galleryImages.map((img, idx) => (
                <Box
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: activeImageIndex === idx ? '2.5px solid #F03A2A' : '1px solid rgba(27, 51, 80, 0.15)',
                    opacity: activeImageIndex === idx ? 1 : 0.7,
                    transition: 'all 0.2s ease',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <Box component="img" src={img} alt={`View ${idx + 1}`} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              ))}
            </Box>
          </Box>

          {/* RIGHT: Product Information */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Category & Rating Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 800, textTransform: 'uppercase', color: '#F03A2A', letterSpacing: '0.08em', fontSize: '0.76rem' }}
              >
                {categoryObj.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, bgcolor: 'rgba(27, 51, 80, 0.08)', px: 1.2, py: 0.4, borderRadius: '8px' }}>
                <Star size={15} fill="#F03A2A" color="#F03A2A" />
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#1B3350' }}>
                  {product.rating}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  ({product.reviewsCount || 240} reviews)
                </Typography>
              </Box>
            </Box>

            {/* Product Title */}
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, fontSize: { xs: '1.6rem', sm: '2.1rem', md: '2.4rem' }, lineHeight: 1.2, mb: 1.5, color: '#1B3350' }}
            >
              {product.name}
            </Typography>

            {/* Unit */}
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2.5, fontWeight: 600 }}>
              Standard Net Quantity: <strong style={{ color: '#1B3350' }}>{product.unit}</strong>
            </Typography>

            {/* Pricing */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2.5 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#F03A2A', letterSpacing: '-0.02em' }}>
                ₹{product.price}
              </Typography>
              {product.originalPrice > product.price && (
                <Typography variant="h5" sx={{ textDecoration: 'line-through', color: 'text.secondary', fontWeight: 600 }}>
                  ₹{product.originalPrice}
                </Typography>
              )}
              {product.originalPrice > product.price && (
                <Chip
                  label={`You Save ₹${product.originalPrice - product.price} (${product.discount}% OFF)`}
                  size="small"
                  sx={{ bgcolor: 'rgba(16, 185, 129, 0.12)', color: '#10B981', fontWeight: 800, borderRadius: '6px' }}
                />
              )}
            </Box>

            {/* Stock */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
              <Typography variant="body2" sx={{ color: '#10B981', fontWeight: 700 }}>
                Available in Stock (Dispatches in 2 Hours)
              </Typography>
            </Box>

            {/* Description */}
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.65, mb: 3 }}>
              {product.description}
            </Typography>

            {/* Quantity Selector & Buttons */}
            <Box sx={{ pt: 2, borderTop: '1px solid rgba(27, 51, 80, 0.1)', mb: 3 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary', display: 'block', mb: 1.2 }}>
                Select Purchase Quantity:
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
                <QuantityStepper
                  quantity={selectedQty}
                  onIncrease={() => setSelectedQty((q) => Math.min(q + 1, product.maxStock || 15))}
                  onDecrease={() => setSelectedQty((q) => Math.max(q - 1, 1))}
                  max={product.maxStock || 15}
                />

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAddToCart}
                  startIcon={<ShoppingBag size={18} />}
                  sx={{
                    flex: 1,
                    minWidth: 160,
                    bgcolor: '#F03A2A',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.96rem',
                    py: 1.3,
                    borderRadius: '12px',
                    boxShadow: '0 6px 18px rgba(240, 58, 42, 0.35)',
                    '&:hover': { bgcolor: '#D82F20' },
                  }}
                >
                  Add to Basket • ₹{product.price * selectedQty}
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleBuyNow}
                  sx={{
                    bgcolor: '#1B3350',
                    color: '#F0E8D8',
                    fontWeight: 800,
                    fontSize: '0.96rem',
                    py: 1.3,
                    px: 3,
                    borderRadius: '12px',
                    '&:hover': { bgcolor: '#26456B' },
                  }}
                >
                  Buy Now
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => toggleWishlist(product)}
                  startIcon={<Heart size={18} fill={inWishlist ? '#F03A2A' : 'none'} color={inWishlist ? '#F03A2A' : '#1B3350'} />}
                  sx={{
                    borderColor: inWishlist ? '#F03A2A' : 'rgba(27, 51, 80, 0.25)',
                    color: inWishlist ? '#F03A2A' : '#1B3350',
                    fontWeight: 700,
                    py: 1.3,
                    px: 2,
                    borderRadius: '12px',
                  }}
                >
                  {inWishlist ? 'Wishlisted' : 'Wishlist'}
                </Button>
              </Box>

              {currentQuantityInCart > 0 && (
                <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700, display: 'block', mt: 1.5 }}>
                  ✓ Currently in your basket ({currentQuantityInCart} pcs)
                </Typography>
              )}
            </Box>

            {/* Assurance Badges */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, pt: 2, borderTop: '1px solid rgba(27, 51, 80, 0.1)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Truck size={17} color="#F03A2A" />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B3350' }}>2-Hour Delivery</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <ShieldCheck size={17} color="#10B981" />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B3350' }}>100% Quality</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <RotateCcw size={17} color="#F03A2A" />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#1B3350' }}>Free Replacement</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 3. Specifications */}
        <Box
          sx={{
            backgroundColor: '#F7F2E7',
            borderRadius: { xs: '18px', md: '24px' },
            p: { xs: 3, md: 4 },
            border: '1px solid rgba(27, 51, 80, 0.12)',
            mb: 5,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#1B3350' }}>
            Product Specifications &amp; Quality Notes
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 3.5 }}>
            {product.origin && (
              <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#EDE4D1' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.8 }}>
                  <MapPin size={17} color="#F03A2A" />
                  <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', color: 'text.secondary' }}>Farm / Origin</Typography>
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B3350' }}>{product.origin}</Typography>
              </Box>
            )}
            {product.shelfLife && (
              <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#EDE4D1' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.8 }}>
                  <Clock size={17} color="#F03A2A" />
                  <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', color: 'text.secondary' }}>Shelf Life</Typography>
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B3350' }}>{product.shelfLife}</Typography>
              </Box>
            )}
            <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#EDE4D1' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.8 }}>
                <Sparkles size={17} color="#F03A2A" />
                <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', color: 'text.secondary' }}>Storage</Typography>
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1B3350' }}>Cool, dry place / airtight</Typography>
            </Box>
            <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#EDE4D1' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.8 }}>
                <ShieldCheck size={17} color="#10B981" />
                <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', color: 'text.secondary' }}>Certification</Typography>
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#10B981' }}>FSSAI &amp; Organic Verified</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(27, 51, 80, 0.1)' }} />

          {/* Customer Reviews */}
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#1B3350' }}>
            Customer Reviews ({product.reviewsCount || 240})
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
            <Box sx={{ p: 2.2, borderRadius: '14px', bgcolor: '#EDE4D1' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Pooja K. (Bangalore)</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#F03A2A" color="#F03A2A" />)}
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                &ldquo;The freshness is truly noticeable right out of the box. Arrived within 90 minutes in cold packaging. Will definitely buy regularly!&rdquo;
              </Typography>
            </Box>
            <Box sx={{ p: 2.2, borderRadius: '14px', bgcolor: '#EDE4D1' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Rajiv M. (Chennai)</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#F03A2A" color="#F03A2A" />)}
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                &ldquo;Unmatched authentic quality and taste. The texture and aroma show it is genuinely single-estate sourced.&rdquo;
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 4. Frequently Bought Together */}
        {companionItem && (
          <Box sx={{ backgroundColor: '#F7F2E7', borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: '1px solid rgba(27, 51, 80, 0.12)', mb: 5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, color: '#1B3350' }}>
              Frequently Bought Together
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box component="img" src={product.image} alt={product.name} sx={{ width: 60, height: 60, borderRadius: '10px', objectFit: 'cover' }} />
                <Typography variant="body2" sx={{ fontWeight: 800 }}>{product.name}</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#F03A2A' }}>+</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box component="img" src={companionItem.image} alt={companionItem.name} sx={{ width: 60, height: 60, borderRadius: '10px', objectFit: 'cover' }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>{companionItem.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>₹{companionItem.price}</Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => { addToCart(product, 1); addToCart(companionItem, 1); }}
                sx={{ ml: { xs: 0, md: 'auto' }, bgcolor: '#1B3350', color: '#F0E8D8', fontWeight: 800, borderRadius: '10px', px: 2.5, '&:hover': { bgcolor: '#26456B' } }}
              >
                Add Both to Basket • ₹{product.price + companionItem.price}
              </Button>
            </Box>
          </Box>
        )}

        {/* 5. Related Products */}
        {relatedProducts.length > 0 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2.5, color: '#1B3350' }}>
              Related in {categoryObj.label}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: { xs: 2, sm: 2.5, md: 3 } }}>
              {relatedProducts.map((relProduct) => (
                <Box key={relProduct.id} sx={{ height: '100%', minWidth: 0 }}>
                  <ProductCard product={relProduct} />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>

      <CartDrawer
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onCheckout={() => { setCartDrawerOpen(false); setCheckoutModalOpen(true); }}
      />
      <CheckoutModal open={checkoutModalOpen} onClose={() => setCheckoutModalOpen(false)} />
      <ToastNotification />
      <Footer onCategoryClick={(catId) => catId !== 'all' ? navigate(`/category/${catId}`) : navigate('/')} />
    </Box>
  );
}
