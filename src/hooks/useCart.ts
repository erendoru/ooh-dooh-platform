import { useState, useEffect } from 'react';

export const useCart = () => {
  // Hook mantığını burada uygulayın
  return {
    cartItems: [],
    loading: false,
    error: null,
    fetchCartItems: () => {},
    removeFromCart: () => {},
    updateCartItem: () => {},
  };
};