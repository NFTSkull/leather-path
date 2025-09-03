import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/lib/validations';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            item => item.variantId === newItem.variantId
          );
          
          if (existingItemIndex >= 0) {
            // Actualizar cantidad si ya existe
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
            };
            return { items: updatedItems };
          } else {
            // Agregar nuevo item
            return { items: [...state.items, newItem] };
          }
        });
      },
      
      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter(item => item.variantId !== variantId),
        }));
      },
      
      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.variantId === variantId
              ? { ...item, quantity: Math.min(quantity, 10) }
              : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getSubtotal: () => {
        // Esta función necesitará los precios de las variantes
        // Se implementará cuando tengamos acceso a los datos de productos
        return 0;
      },
    }),
    {
      name: 'leather-path-cart',
    }
  )
);
