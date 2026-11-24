import React, { useState, useMemo, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Chip, Button, Drawer, IconButton } from '@mui/material';
import { X, SlidersHorizontal } from 'lucide-react';

import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import Sidebar from './components/Sidebar';
import CategoryFilter from './components/CategoryFilter';
import CategoryCardsSection from './components/CategoryCardsSection';
import GrocerySection from './components/GrocerySection';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import CategoryListingPage from './components/CategoryListingPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';
import { useCart } from './context/CartContext';
import { GROCERY_ITEMS } from './data/groceries';

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE (the main marketplace layout)
// ─────────────────────────────────────────────────────────────────────────────
function HomePage({ cartDrawerOpen, setCartDrawerOpen, checkoutModalOpen, setCheckoutModalOpen }) {
  const navigate = useNavigate();
  const { recentlyViewed } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const productSectionRef = useRef(null);

  const filteredProducts = useMemo(() => {
    let result = [...GROCERY_ITEMS];

    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }
    if (selectedTag) {
      result = result.filter(
        (item) => item.tags && item.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(q))) ||
          (item.description && item.description.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, selectedTag, searchTerm, sortBy]);

  const bestSellers = useMemo(() => GROCERY_ITEMS.filter((i) => i.isBestSeller).slice(0, 4), []);
  const freshFarmProduce = useMemo(() => GROCERY_ITEMS.filter((i) => i.category === 'fruits-vegetables').slice(0, 4), []);
  const dailyEssentials = useMemo(
    () => GROCERY_ITEMS.filter((i) => i.category === 'grains-staples' || i.category === 'dairy-bakery').slice(0, 4),
    []
  );
  const specialOffers = useMemo(() => GROCERY_ITEMS.filter((i) => (i.discount || 0) >= 18).slice(0, 4), []);
  const recommendedProducts = useMemo(() => GROCERY_ITEMS.filter((i) => i.rating >= 4.8).slice(4, 8), []);

  const isFiltering = searchTerm.trim() !== '' || selectedCategory !== 'all' || selectedTag !== '';

  const handleShopNow = () => productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTag('');
    setSortBy('featured');
  };

  const handleCategorySelect = (catId) => {
    if (catId === 'all') {
      setSelectedCategory('all');
      setMobileSidebarOpen(false);
      return;
    }
    navigate(`/category/${catId}`);
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setMobileSidebarOpen(false);
  };

  const handleSelectProduct = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#F0E8D8',
        color: '#1B3350',
      }}
    >
      <Navbar
        onOpenCart={() => setCartDrawerOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 2.5, sm: 3, md: 3.5 } }}>
        <HeroBanner onShopNow={handleShopNow} onSelectProduct={handleSelectProduct} />

        {!isFiltering && (
          <CategoryCardsSection
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        )}

        <Box
          ref={productSectionRef}
          sx={{ pt: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}
        >
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setMobileSidebarOpen(true)}
              startIcon={<SlidersHorizontal size={16} />}
              sx={{
                borderColor: '#1B3350',
                color: '#1B3350',
                fontWeight: 700,
                borderRadius: '10px',
                whiteSpace: 'nowrap',
                '&:hover': { borderColor: '#F03A2A', color: '#F03A2A' },
              }}
            >
              Filters
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
            gap: { xs: 2.5, md: 3.5 },
            alignItems: 'flex-start',
            mt: 1,
          }}
        >
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Sidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => {
                if (catId !== 'all') {
                  navigate(`/category/${catId}`);
                } else {
                  setSelectedCategory('all');
                }
              }}
              selectedTag={selectedTag}
              onSelectTag={handleTagSelect}
              onResetFilters={handleResetFilters}
            />
          </Box>

          <Box sx={{ width: '100%', minWidth: 0 }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1.5,
                mb: 2.5,
                p: 1.8,
                borderRadius: '14px',
                backgroundColor: '#F7F2E7',
                border: '1px solid rgba(27, 51, 80, 0.12)',
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                Showing <strong>{filteredProducts.length}</strong> fresh grocery essentials
                {selectedCategory !== 'all' && ` in ${selectedCategory.replace('-', ' & ')}`}
              </Typography>
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            </Box>

            {isFiltering && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 2 }}>
                {searchTerm && (
                  <Chip
                    label={`Search: "${searchTerm}"`}
                    size="small"
                    onDelete={() => setSearchTerm('')}
                    deleteIcon={<X size={14} />}
                    sx={{ fontWeight: 700, fontSize: '0.76rem', bgcolor: '#EDE4D1', border: '1px solid rgba(27, 51, 80, 0.15)' }}
                  />
                )}
                {selectedCategory !== 'all' && (
                  <Chip
                    label={`Category: ${selectedCategory.replace('-', ' & ')}`}
                    size="small"
                    onDelete={() => setSelectedCategory('all')}
                    deleteIcon={<X size={14} />}
                    sx={{ fontWeight: 700, fontSize: '0.76rem', bgcolor: '#EDE4D1', border: '1px solid rgba(27, 51, 80, 0.15)' }}
                  />
                )}
                {selectedTag && (
                  <Chip
                    label={`Tag: ${selectedTag}`}
                    size="small"
                    onDelete={() => setSelectedTag('')}
                    deleteIcon={<X size={14} />}
                    sx={{ fontWeight: 700, fontSize: '0.76rem', bgcolor: '#F03A2A', color: '#FFFFFF', '& .MuiChip-deleteIcon': { color: '#FFFFFF' } }}
                  />
                )}
                <Button
                  size="small"
                  onClick={handleResetFilters}
                  sx={{ color: '#F03A2A', fontSize: '0.78rem', fontWeight: 800, p: '2px 8px', '&:hover': { bgcolor: 'rgba(240, 58, 42, 0.1)' } }}
                >
                  Clear all
                </Button>
              </Box>
            )}

            {isFiltering ? (
              <ProductGrid
                products={filteredProducts}
                onResetFilters={handleResetFilters}
                onSelectProduct={handleSelectProduct}
              />
            ) : (
              <>
                <GrocerySection
                  badgeText="MOST POPULAR THIS WEEK"
                  title="Best Sellers"
                  subtitle="Top everyday essentials trusted by 2,400+ homes across the city."
                  products={bestSellers}
                  onViewAll={() => navigate('/category/fruits-vegetables')}
                  viewAllText="View Best Sellers"
                  onSelectProduct={handleSelectProduct}
                />
                <GrocerySection
                  badgeText="HARVESTED AT DAWN"
                  title="Fresh From Farm"
                  subtitle="Crisp greens, vine tomatoes, and seasonal mountain orchard fruits."
                  products={freshFarmProduce}
                  onViewAll={() => navigate('/category/fruits-vegetables')}
                  viewAllText="Shop Produce"
                  onSelectProduct={handleSelectProduct}
                />
                <GrocerySection
                  badgeText="KITCHEN CORNERSTONES"
                  title="Daily Essentials"
                  subtitle="A2 milk, artisanal malai paneer, Basmati rice, and cold-pressed cooking oils."
                  products={dailyEssentials}
                  onViewAll={() => navigate('/category/grains-staples')}
                  viewAllText="Shop Essentials"
                  onSelectProduct={handleSelectProduct}
                />
                <GrocerySection
                  badgeText="BIGGEST PANTRY SAVINGS"
                  title="Special Offers & Discounts"
                  subtitle="Up to 25% off on selected farm fresh harvests and pantry favorites."
                  products={specialOffers}
                  onViewAll={() => setSortBy('discount')}
                  viewAllText="See All Deals"
                  onSelectProduct={handleSelectProduct}
                />
                <GrocerySection
                  badgeText="HANDPICKED FOR YOUR TASTE"
                  title="Recommended For You"
                  subtitle="Top-rated 4.9-star pantry staples and wholesome munchies."
                  products={recommendedProducts}
                  onSelectProduct={handleSelectProduct}
                />
                {recentlyViewed && recentlyViewed.length > 0 && (
                  <GrocerySection
                    badgeText="PICK UP WHERE YOU LEFT OFF"
                    title="Recently Viewed"
                    subtitle="Products you browsed during your recent visits."
                    products={recentlyViewed.slice(0, 4)}
                    onSelectProduct={handleSelectProduct}
                  />
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        PaperProps={{ sx: { width: 300, p: 2, backgroundColor: '#F0E8D8' } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton size="small" onClick={() => setMobileSidebarOpen(false)}>
            <X size={20} />
          </IconButton>
        </Box>
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setMobileSidebarOpen(false);
            if (catId !== 'all') navigate(`/category/${catId}`);
            else setSelectedCategory('all');
          }}
          selectedTag={selectedTag}
          onSelectTag={handleTagSelect}
          onResetFilters={handleResetFilters}
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

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <HomePage
            cartDrawerOpen={cartDrawerOpen}
            setCartDrawerOpen={setCartDrawerOpen}
            checkoutModalOpen={checkoutModalOpen}
            setCheckoutModalOpen={setCheckoutModalOpen}
          />
        }
      />

      {/* Category listing */}
      <Route
        path="/category/:slug"
        element={
          <CategoryListingPage
            cartDrawerOpen={cartDrawerOpen}
            setCartDrawerOpen={setCartDrawerOpen}
            checkoutModalOpen={checkoutModalOpen}
            setCheckoutModalOpen={setCheckoutModalOpen}
          />
        }
      />

      {/* Product details */}
      <Route
        path="/product/:productId"
        element={
          <ProductDetailsPage
            cartDrawerOpen={cartDrawerOpen}
            setCartDrawerOpen={setCartDrawerOpen}
            checkoutModalOpen={checkoutModalOpen}
            setCheckoutModalOpen={setCheckoutModalOpen}
          />
        }
      />

      {/* Dedicated 404 */}
      <Route path="/404" element={<NotFoundPage />} />

      {/* Catch-all → 404 */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
