import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { PROMO_CODES, GROCERY_ITEMS } from '../data/groceries';

const CartContext = createContext();

export const FREE_DELIVERY_THRESHOLD = 100;
export const STANDARD_DELIVERY_FEE = 49;
export const TAX_RATE = 0.05; // 5% GST

// Helper to keep stored items' metadata (like image, name, price) fresh with catalog updates
const hydrateWithCatalog = (items) => {
  if (!Array.isArray(items)) return [];
  return items.map((item) => {
    const catalogProduct = GROCERY_ITEMS.find((p) => p.id === item.id);
    if (catalogProduct) {
      return { ...item, ...catalogProduct, quantity: item.quantity ?? 1 };
    }
    return item;
  });
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('vegbasket_cart');
      return saved ? hydrateWithCatalog(JSON.parse(saved)) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('vegbasket_wishlist');
      return saved ? hydrateWithCatalog(JSON.parse(saved)) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('vegbasket_recent');
      return saved ? hydrateWithCatalog(JSON.parse(saved)) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState(() => {
    try {
      const saved = localStorage.getItem('vegbasket_promo');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success' | 'info' | 'warning' | 'error'
  });

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('vegbasket_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('vegbasket_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist]);

  // Persist recently viewed
  useEffect(() => {
    try {
      localStorage.setItem('vegbasket_recent', JSON.stringify(recentlyViewed));
    } catch {
      // Ignore
    }
  }, [recentlyViewed]);

  // Persist promo code
  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem('vegbasket_promo', JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem('vegbasket_promo');
      }
    } catch {
      // Ignore
    }
  }, [appliedPromo]);

  const showToast = useCallback((message, severity = 'success') => {
    setToast({
      open: true,
      message,
      severity,
    });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  // Add item or increment quantity
  const addToCart = useCallback((product, quantityToAdd = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      const maxStock = product.maxStock || 15;

      if (existingIndex > -1) {
        const existingItem = prevItems[existingIndex];
        const newQuantity = Math.min(existingItem.quantity + quantityToAdd, maxStock);
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };
        showToast(`Updated "${product.name}" quantity (${newQuantity})`, 'info');
        return updated;
      } else {
        const initialQty = Math.min(quantityToAdd, maxStock);
        showToast(`Added "${product.name}" to your basket!`, 'success');
        return [...prevItems, { ...product, quantity: initialQty }];
      }
    });
  }, [showToast]);

  // Remove item
  const removeFromCart = useCallback((productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.id === productId);
      const filtered = prevItems.filter((i) => i.id !== productId);
      if (itemToRemove) {
        showToast(`Removed "${itemToRemove.name}" from basket`, 'info');
      }
      return filtered;
    });
  }, [showToast]);

  // Update quantity directly
  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === productId) {
          const maxStock = item.maxStock || 15;
          const clamped = Math.min(newQuantity, maxStock);
          return { ...item, quantity: clamped };
        }
        return item;
      });
    });
  }, [removeFromCart]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedPromo(null);
    showToast('Your basket has been cleared.', 'info');
  }, [showToast]);

  // Wishlist toggle
  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to Wishlist ❤️`, 'success');
        return [...prev, product];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some((item) => item.id === productId);
  }, [wishlist]);

  // Track Recently Viewed
  const trackRecentlyViewed = useCallback((product) => {
    if (!product || !product.id) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 10); // keep last 10
    });
  }, []);

  // Apply promo code with validation
  const applyPromoCode = useCallback((codeString) => {
    const trimmed = (codeString || '').trim().toUpperCase();
    if (!trimmed) {
      return { success: false, message: 'Please enter a valid coupon code.' };
    }

    const promo = PROMO_CODES[trimmed];
    if (!promo) {
      return { success: false, message: `Coupon "${trimmed}" is not valid.` };
    }

    const currentSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (promo.minSubtotal && currentSubtotal < promo.minSubtotal) {
      return {
        success: false,
        message: `Coupon "${trimmed}" requires minimum order of ₹${promo.minSubtotal}. Add ₹${promo.minSubtotal - currentSubtotal} more!`,
      };
    }

    setAppliedPromo(promo);
    showToast(`Coupon "${trimmed}" applied successfully! 🎉`, 'success');
    return { success: true, message: `Promo code ${trimmed} applied!` };
  }, [cartItems, showToast]);

  const removePromoCode = useCallback(() => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  }, [showToast]);

  const totalCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = useMemo(() => {
    if (cartItems.length === 0) return 0;
    if (appliedPromo?.type === 'delivery') return 0;
    if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
    return STANDARD_DELIVERY_FEE;
  }, [cartItems.length, appliedPromo, subtotal]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo || cartItems.length === 0) return 0;

    if (appliedPromo.type === 'percentage') {
      return Math.round((subtotal * appliedPromo.value) / 100);
    }
    if (appliedPromo.type === 'flat') {
      return Math.min(appliedPromo.value, subtotal);
    }
    if (appliedPromo.type === 'delivery') {
      return STANDARD_DELIVERY_FEE;
    }
    return 0;
  }, [appliedPromo, cartItems.length, subtotal]);

  const tax = useMemo(() => {
    if (cartItems.length === 0) return 0;
    const taxableAmount = Math.max(0, subtotal - (appliedPromo?.type !== 'delivery' ? discountAmount : 0));
    return Math.round(taxableAmount * TAX_RATE);
  }, [cartItems.length, subtotal, appliedPromo, discountAmount]);

  const grandTotal = useMemo(() => {
    if (cartItems.length === 0) return 0;
    const effectiveDiscount = appliedPromo?.type !== 'delivery' ? discountAmount : 0;
    const total = subtotal - effectiveDiscount + tax + deliveryFee;
    return Math.max(0, total);
  }, [cartItems.length, subtotal, discountAmount, appliedPromo, tax, deliveryFee]);

  const contextValue = useMemo(
    () => ({
      cartItems,
      totalCount,
      subtotal,
      tax,
      deliveryFee,
      discountAmount,
      grandTotal,
      appliedPromo,
      wishlist,
      recentlyViewed,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      trackRecentlyViewed,
      applyPromoCode,
      removePromoCode,
      toast,
      showToast,
      closeToast,
    }),
    [
      cartItems,
      totalCount,
      subtotal,
      tax,
      deliveryFee,
      discountAmount,
      grandTotal,
      appliedPromo,
      wishlist,
      recentlyViewed,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      trackRecentlyViewed,
      applyPromoCode,
      removePromoCode,
      toast,
      showToast,
      closeToast,
    ]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
