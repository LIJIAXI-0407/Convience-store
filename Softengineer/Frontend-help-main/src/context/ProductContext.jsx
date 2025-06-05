import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: '001',
      name: 'Cocacola',
      barcode: '1234567891078',
      price: '$3.99',
      stock: '50'
    }
  ]);

  // 生成新的产品ID
  const generateNewId = () => {
    if (products.length === 0) return '001';
    const lastId = parseInt(products[products.length - 1].id);
    return String(lastId + 1).padStart(3, '0');
  };

  // 重新排序所有产品ID
  const reorderIds = (productsList) => {
    return productsList.map((product, index) => ({
      ...product,
      id: String(index + 1).padStart(3, '0')
    }));
  };

  // 更新产品库存
  const updateProductStock = (productId, quantity) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map(product => {
        if (product.id === productId) {
          const newStock = parseInt(product.stock) - quantity;
          return {
            ...product,
            stock: String(Math.max(0, newStock)) // 确保库存不会小于0
          };
        }
        return product;
      });
      return reorderIds(updatedProducts);
    });
  };

  // 检查库存并显示警告
  useEffect(() => {
    products.forEach(product => {
      const stock = parseInt(product.stock);
      if (stock < 5) {
        alert(`警告：${product.name} 的库存低于5件，当前库存：${stock}件`);
      }
    });
  }, [products]);

  const value = {
    products,
    setProducts,
    generateNewId,
    reorderIds,
    updateProductStock
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}; 