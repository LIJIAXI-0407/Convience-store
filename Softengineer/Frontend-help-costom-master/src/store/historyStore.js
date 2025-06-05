import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useHistoryStore = create(
  persist(
    (set) => ({
      historyItems: [],
      addToHistory: (items) => set((state) => {
        const timestamp = new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });

        const newHistoryItems = items.map(item => ({
          id: Date.now() + Math.random(), // Ensure unique ID
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          date: timestamp
        }));

        return {
          historyItems: [...newHistoryItems, ...state.historyItems]
        };
      }),
      clearHistory: () => set({ historyItems: [] })
    }),
    {
      name: 'history-storage',
    }
  )
);

export default useHistoryStore; 