import { create } from 'zustand';

const useQuantityStore = create((set) => ({
  cartItems: [],
  addToCart: (item) => set((state) => {
    const existingItemIndex = state.cartItems.findIndex(
      cartItem => cartItem.productName === item.productName
    );

    if (existingItemIndex !== -1) {
      // 如果商品已存在，替换为新的数量而不是累加
      const updatedItems = [...state.cartItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: item.quantity
      };
      return { cartItems: updatedItems };
    } else {
      // 如果是新商品，添加新条目
      return {
        cartItems: [...state.cartItems, {
          id: Date.now(),
          productName: item.productName,
          price: item.price,
          quantity: item.quantity
        }]
      };
    }
  }),
  updateQuantity: (itemId, newQuantity) => set((state) => {
    if (newQuantity <= 0) {
      // 如果数量为0或更小，从购物车中移除该商品
      return {
        cartItems: state.cartItems.filter(item => item.id !== itemId)
      };
    }
    // 否则更新数量
    return {
      cartItems: state.cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    };
  }),
  removeFromCart: (itemId) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.id !== itemId)
  }))
}));

export default useQuantityStore; 