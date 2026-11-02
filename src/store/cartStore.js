import { create } from 'zustand';

const LOCAL_STORAGE_CART_KEY = 'ttblade_cart_items';

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useCartStore = create((set, get) => ({
  items: loadInitialCart(),
  isCartDrawerOpen: false,
  promoCode: '',
  discountPercent: 0,
  promoError: '',

  // Open / Close Drawer
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),

  // Add Item to Cart
  addItem: (item) => {
    const currentItems = get().items;
    // Check if identical configuration already in cart
    const existingIndex = currentItems.findIndex(
      (i) => i.configurationId === item.configurationId
    );

    let updatedItems;
    if (existingIndex > -1) {
      updatedItems = [...currentItems];
      updatedItems[existingIndex].quantity += item.quantity || 1;
    } else {
      updatedItems = [
        {
          ...item,
          cartItemId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
        },
        ...currentItems
      ];
    }

    set({ items: updatedItems });
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(updatedItems));
    } catch {
      // ignore
    }
  },

  // Update item quantity
  updateQuantity: (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      get().removeItem(cartItemId);
      return;
    }

    const updatedItems = get().items.map((item) =>
      item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
    );

    set({ items: updatedItems });
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(updatedItems));
    } catch {
      // ignore
    }
  },

  // Remove item
  removeItem: (cartItemId) => {
    const updatedItems = get().items.filter((item) => item.cartItemId !== cartItemId);
    set({ items: updatedItems });
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(updatedItems));
    } catch {
      // ignore
    }
  },

  // Clear Cart
  clearCart: () => {
    set({ items: [], promoCode: '', discountPercent: 0 });
    try {
      localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
    } catch {
      // ignore
    }
  },

  // Promo Code Validation
  applyPromoCode: (code) => {
    const clean = (code || '').trim().toUpperCase();
    if (clean === 'PRO10') {
      set({ promoCode: clean, discountPercent: 10, promoError: '' });
      return { success: true, message: '10% Pro discount applied!' };
    } else if (clean === 'CHAMPION20') {
      set({ promoCode: clean, discountPercent: 20, promoError: '' });
      return { success: true, message: '20% Champion discount applied!' };
    } else {
      set({ promoError: 'Invalid promo code. Try PRO10' });
      return { success: false, message: 'Invalid promo code' };
    }
  },

  removePromoCode: () => {
    set({ promoCode: '', discountPercent: 0, promoError: '' });
  },

  // Calculated totals
  getCartSummary: () => {
    const items = get().items;
    const subtotal = items.reduce(
      (sum, item) => sum + (item.unitPrice || 0) * (item.quantity || 1),
      0
    );
    const discountPercent = get().discountPercent;
    const discountAmount = (subtotal * discountPercent) / 100;
    const discountedSubtotal = subtotal - discountAmount;
    // Free shipping if over $100
    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 12.00;
    const estimatedTax = discountedSubtotal * 0.08; // 8% demo tax
    const total = discountedSubtotal + shipping + (subtotal > 0 ? estimatedTax : 0);
    const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

    return {
      subtotal,
      discountPercent,
      discountAmount,
      shipping,
      estimatedTax,
      total,
      itemCount
    };
  }
}));

