import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/lib/validations';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (sku: string) => void;
  setQuantity: (sku: string, quantity: number) => void;
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
            item => item.sku === newItem.sku
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
      
      removeItem: (sku) => {
        set((state) => ({
          items: state.items.filter(item => item.sku !== sku),
        }));
      },
      
      setQuantity: (sku, quantity) => {
        if (quantity <= 0) {
          get().removeItem(sku);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.sku === sku
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
        return get().items.reduce((total, item) => {
          return total + (item.priceMXN * item.quantity);
        }, 0);
      },
    }),
    {
      name: 'leather-path-cart',
    }
  )
);

