import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Drawer,
  IconButton,
  Chip,
  Container,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Home,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Sparkles,
  ShoppingBasket,
} from 'lucide-react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import FilterSidebar from './FilterSidebar';
import ProductCard from './ProductCard';
import CartDrawer from './CartDrawer';
import CheckoutModal from './CheckoutModal';
import ToastNotification from './ToastNotification';
import Footer from './Footer';
import { CATEGORIES, GROCERY_ITEMS } from '../data/groceries';

export default function CategoryListingPage({
  cartDrawerOpen,
  setCartDrawerOpen,
  checkoutModalOpen,
  setCheckoutModalOpen,
}) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 700]);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  // Resolve category from slug
  const categoryObj = CATEGORIES.find((c) => c.id === slug);

  // If slug is 'all' or unknown — redirect to 404
  if (!categoryObj || slug === 'all') {
    return <Navigate to="/404" replace />;
  }

  const handleResetAll = () => {
    setSortBy('featured');
    setPriceRange([0, 700]);
    setMinRating(0);
    setMinDiscount(0);
    setInStockOnly(false);
    setSelectedTag('');
  };

  const categoryDescriptions = {
    'fruits-vegetables': 'Hand-harvested at dawn from regional mountain orchards and hydroponic nurseries. Zero cold-chain breaks.',
    'dairy-bakery': 'Artisanal whole milk from grass-fed indigenous cows, stoneground sourdough, and traditionally cultured churned butter.',
    'grains-staples': 'Aged Himalayan Basmati rice, slow-wood-churned cold-pressed oils, unpolished dals, and mineral-rich raw sugars.',
    'snacks': 'Guilt-free slow-roasted makhana, bean-to-bar dark chocolates, single-origin nuts, and crispy multigrain crackers.',
    'beverages': 'Raw cold-pressed seasonal juices, shade-grown Arabica coffee beans, royal Kashmiri kahwa, and sparkling kombucha.',
  };

  // Filter + sort
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredProducts = useMemo(() => {
    let result = GROCERY_ITEMS.filter((item) => item.category === slug);

    if (inStockOnly) result = result.filter((item) => item.inStock);
    result = result.filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1]);
    if (minRating > 0) result = result.filter((item) => item.rating >= minRating);
    if (minDiscount > 0) result = result.filter((item) => (item.discount || 0) >= minDiscount);
    if (selectedTag) {
      result = result.filter(
        (item) => item.tags && item.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => (b.discount || 0) - (a.discount || 0)); break;
      default: break;
    }

    return result;
  }, [slug, sortBy, priceRange, minRating, minDiscount, inStockOnly, selectedTag]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F0E8D8', color: '#1B3350' }}>
      {/* Navbar */}
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
        {/* Breadcrumbs */}
        <Box sx={{ mb: 2 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '0.86rem' }}>
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', cursor: 'pointer', fontWeight: 600, '&:hover': { color: '#F03A2A' } }}
              onClick={() => navigate('/')}
            >
              <Home size={15} />
              Home
            </Link>
            <Typography sx={{ color: '#1B3350', fontWeight: 800 }}>
              {categoryObj.label}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Category Hero Banner */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: { xs: '18px', md: '24px' },
            overflow: 'hidden',
            mb: 4,
            backgroundColor: '#1B3350',
            color: '#F0E8D8',
            p: { xs: 3, sm: 4, md: 4.5 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
            boxShadow: '0 12px 32px rgba(27, 51, 80, 0.16)',
          }}
        >
          <Box sx={{ maxWidth: 640 }}>
            <Chip
              icon={<Sparkles size={14} color="#F03A2A" style={{ marginLeft: 6 }} />}
              label="Verified Organic • Direct Farm Sourced"
              size="small"
              sx={{ bgcolor: 'rgba(240, 232, 216, 0.14)', color: '#F0E8D8', fontWeight: 700, fontSize: '0.76rem', mb: 1.5, border: '1px solid rgba(240, 232, 216, 0.2)' }}
            />
            <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.4rem', md: '2.8rem' }, lineHeight: 1.15, mb: 1.2, color: '#F0E8D8' }}>
              {categoryObj.label}
            </Typography>
            <Typography variant="body1" sx={{ color: '#DECDB5', lineHeight: 1.6, fontSize: '0.96rem' }}>
              {categoryDescriptions[slug] || 'Explore our full marketplace catalog of farm harvests.'}
            </Typography>
          </Box>

          <Box sx={{ p: 2, borderRadius: '16px', backgroundColor: 'rgba(240, 232, 216, 0.1)', border: '1px solid rgba(240, 232, 216, 0.18)', textAlign: 'center', minWidth: 140, backdropFilter: 'blur(6px)' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#F03A2A' }}>
              {filteredProducts.length}
            </Typography>
            <Typography variant="caption" sx={{ color: '#F0E8D8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Fresh Items Ready
            </Typography>
          </Box>
        </Box>

        {/* Main Split: Filter Sidebar + Product Catalog */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '280px 1fr' }, gap: { xs: 2.5, md: 3.5 }, alignItems: 'flex-start' }}>
          {/* Desktop Sidebar */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <FilterSidebar
              selectedCategory={slug}
              onSelectCategory={(cat) => { if (cat !== 'all') navigate(`/category/${cat}`); else navigate('/'); }}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              minRating={minRating}
              onRatingChange={setMinRating}
              minDiscount={minDiscount}
              onDiscountChange={setMinDiscount}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
              onResetAll={handleResetAll}
            />
          </Box>

          {/* Right Catalog */}
          <Box sx={{ width: '100%', minWidth: 0 }}>
            {/* Controls Bar */}
            <Box
              sx={{
                display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
                gap: 1.5, p: 1.8, borderRadius: '14px', backgroundColor: '#F7F2E7',
                border: '1px solid rgba(27, 51, 80, 0.12)', mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Button
                  variant="outlined" size="small"
                  onClick={() => setMobileFilterOpen(true)}
                  startIcon={<SlidersHorizontal size={15} />}
                  sx={{ display: { xs: 'inline-flex', md: 'none' }, borderColor: '#1B3350', color: '#1B3350', fontWeight: 800, borderRadius: '8px' }}
                >
                  Filters
                </Button>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                  Showing <strong>{filteredProducts.length}</strong> items in{' '}
                  <span style={{ color: '#F03A2A' }}>{categoryObj.label}</span>
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ArrowUpDown size={15} color="#1B3350" />
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>
                  Sort:
                </Typography>
                <FormControl size="small">
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{ borderRadius: '10px', bgcolor: '#FFFFFF', fontWeight: 700, fontSize: '0.84rem', minWidth: 160, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(27, 51, 80, 0.18)' } }}
                  >
                    <MenuItem value="featured">Popularity</MenuItem>
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                    <MenuItem value="discount">Biggest Discount</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <Box sx={{ p: 6, textAlign: 'center', backgroundColor: '#F7F2E7', borderRadius: '20px', border: '1px dashed rgba(27, 51, 80, 0.2)' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>No grocery products found</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  Try relaxing your filters to see more results.
                </Typography>
                <Button variant="contained" onClick={handleResetAll} sx={{ backgroundColor: '#1B3350', color: '#F0E8D8', fontWeight: 800, borderRadius: '10px', '&:hover': { backgroundColor: '#26456B' } }}>
                  Reset All Filters
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: { xs: 2, sm: 2.5, md: 3 } }}>
                {filteredProducts.map((product) => (
                  <Box key={product.id} sx={{ height: '100%', minWidth: 0 }}>
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="left"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        PaperProps={{ sx: { width: 300, p: 2.5, backgroundColor: '#F0E8D8' } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton size="small" onClick={() => setMobileFilterOpen(false)}>
            <X size={20} />
          </IconButton>
        </Box>
        <FilterSidebar
          selectedCategory={slug}
          onSelectCategory={(cat) => { setMobileFilterOpen(false); if (cat !== 'all') navigate(`/category/${cat}`); else navigate('/'); }}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          minRating={minRating}
          onRatingChange={setMinRating}
          minDiscount={minDiscount}
          onDiscountChange={setMinDiscount}
          inStockOnly={inStockOnly}
          onInStockChange={setInStockOnly}
          selectedTag={selectedTag}
          onSelectTag={(tag) => { setSelectedTag(tag); setMobileFilterOpen(false); }}
          onResetAll={handleResetAll}
        />
      </Drawer>

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
