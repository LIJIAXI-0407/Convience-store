import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import WelcomeHeader from '../../components/WelcomeHeader';
import WhiteRectangle from '../../components/WhiteRectangle';
import ProductModal from '../../components/ProductModal/ProductModal';
import trashIcon from '../../assets/images/trash.svg';
import cameraIcon from '../../assets/images/Camera.svg';
import { useProducts } from '../../context/ProductContext';
import '../../styles/shared.css';
import './product.css';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const { 
    products, 
    setProducts, 
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 分页相关状态
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // 每页显示5个商品

  const navigate = useNavigate();

  // 获取商品数据的函数
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost/sale/public/api/admin/products');
      const result = await response.json();
      if (result.success) {
        // 将API数据格式转换为组件期望的格式
        const formattedProducts = result.data.products.map((product, index) => ({
          id: product.id,
          sort: index + 1, // 添加排序字段用于页面显示
          name: product.product_name,
          barcode: product.bar_code,
          price: `$${parseFloat(product.price).toFixed(2)}`,
          stock: product.stock.toString(),
          created_at: product.created_at,
          updated_at: product.updated_at
        }));
        setProducts(formattedProducts);
      } else {
        setError(result.message || '获取商品数据失败');
      }
    } catch (err) {
      setError('网络错误，无法获取商品数据');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // 获取商品数据
  useEffect(() => {
    fetchProducts();
  }, [setProducts]);

  // 处理从相机页面返回的数据
  useEffect(() => {
    if (location.state?.fromCamera) {
      if (location.state.productCreated) {
        // 重新获取商品列表以显示新添加的商品
        fetchProducts();
        // 跳转到最后一页
        const newTotalPages = Math.ceil((products.length + 1) / itemsPerPage);
        setCurrentPage(newTotalPages);
      } else if (location.state.error) {
        alert(location.state.error);
      }
      // 清除location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // 计算分页数据
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // 分页控制函数
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAddProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost/sale/public/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: 'ABC',
          bar_code: '1234567890',
          price: 0,
          stock: 50
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        // 从后端响应中获取创建的商品数据，并格式化为组件期望的格式
        const rawProduct = result.data;
        const formattedProduct = {
          id: rawProduct.id,
          sort: products.length + 1, // 添加排序字段，基于当前产品数量
          name: rawProduct.product_name,
          barcode: rawProduct.bar_code,
          price: `$${parseFloat(rawProduct.price).toFixed(2)}`,
          stock: rawProduct.stock.toString(),
          created_at: rawProduct.created_at,
          updated_at: rawProduct.updated_at
        };
        // 更新商品列表
        const updatedProducts = [...products, formattedProduct];
        setProducts(updatedProducts);
        // 设置编辑状态
        setEditingProductId(formattedProduct.id);
        // 跳转到最后一页显示新添加的商品
        const newTotalPages = Math.ceil(updatedProducts.length / itemsPerPage);
        setCurrentPage(newTotalPages);
      } else {
        console.error('Failed to create product:', response.statusText);
        alert('Failed to create product. Please try again.');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product, field) => {
    setEditingProductId({ id: product.id, field });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost/sale/public/api/admin/products/${productId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // 删除成功后重新获取最新数据
        await fetchProducts();
        
        // 清除编辑状态
        if (editingProductId?.id === productId) {
          setEditingProductId(null);
        }
        
        // 如果删除后当前页没有数据，跳转到上一页
        const newTotalPages = Math.ceil((products.length - 1) / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      } else {
        console.error('Failed to delete product:', response.statusText);
        alert('删除商品失败，请重试。');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('删除商品时发生错误，请检查网络连接。');
    }
  };

  const handleModalSubmit = async (productData) => {
    if (editingProductId) {
      // 编辑现有商品 - 可以添加PUT请求到后台
      try {
        const response = await fetch(`http://localhost/sale/public/api/admin/products/${editingProductId.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData)
        });
        
        if (response.ok) {
          setProducts(products.map(product => 
            product.id === editingProductId.id ? { ...product, ...productData } : product
          ));
          setEditingProductId(null);
        } else {
          console.error('Failed to update product:', response.statusText);
          alert('Failed to update product. Please try again.');
        }
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Error updating product. Please check your connection.');
      }
    } else {
      // 添加新商品
      try {
        const response = await fetch('http://localhost/sale/public/api/admin/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData)
        });
        
        if (response.ok) {
          const createdProduct = await response.json();
          setProducts([...products, createdProduct]);
        } else {
          console.error('Failed to create product:', response.statusText);
          alert('Failed to create product. Please try again.');
        }
      } catch (error) {
        console.error('Error creating product:', error);
        alert('Error creating product. Please check your connection.');
      }
    }
  };

  const handleCameraClick = async (e) => {
    e.stopPropagation(); // 防止事件冒泡
    try {
      setLoading(true);
      const response = await fetch('http://localhost/sale/public/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: 'New Product',
          bar_code: '8850999220000', // 指定的条形码
          price: 0,
          stock: 50
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        // 从后端响应中获取创建的商品数据，并格式化为组件期望的格式
        const rawProduct = result.data;
        const formattedProduct = {
          id: rawProduct.id,
          sort: products.length + 1,
          name: rawProduct.product_name,
          barcode: rawProduct.bar_code,
          price: `$${parseFloat(rawProduct.price).toFixed(2)}`,
          stock: rawProduct.stock.toString(),
          created_at: rawProduct.created_at,
          updated_at: rawProduct.updated_at
        };
        // 更新商品列表
        const updatedProducts = [...products, formattedProduct];
        setProducts(updatedProducts);
        // 设置编辑状态，让用户可以立即编辑新商品的名称
        setEditingProductId({ id: formattedProduct.id, field: 'name' });
        // 跳转到最后一页显示新添加的商品
        const newTotalPages = Math.ceil(updatedProducts.length / itemsPerPage);
        setCurrentPage(newTotalPages);
        
        // 显示成功消息
        alert('New product created with barcode: 8850999220000');
      } else {
        console.error('Failed to create product:', response.statusText);
        alert('Failed to create product. Please try again.');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCellChange = (e, productId, field) => {
    const value = e.target.value;
    setProducts(products.map(p => {
      if (p.id === productId) {
        if (field === 'price') {
          const numericValue = value.replace(/[^0-9.]/g, '');
          return { ...p, [field]: `$${numericValue}` };
        }
        if (field === 'stock') {
          const numericValue = value.replace(/[^0-9]/g, '');
          return { ...p, [field]: numericValue };
        }
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  // 新增：处理单元格编辑完成后的API更新
  const handleCellEditComplete = async (productId, field, value) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // 准备更新数据
    let updateData = {};
    if (field === 'name') {
      updateData.product_name = value;
    } else if (field === 'barcode') {
      updateData.bar_code = value;
    } else if (field === 'price') {
      updateData.price = parseFloat(value.replace('$', '')) || 0;
    } else if (field === 'stock') {
      updateData.stock = parseInt(value) || 0;
    }

    try {
      const response = await fetch(`http://localhost/sale/public/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        console.log('Product updated successfully');
      } else {
        console.error('Failed to update product:', response.statusText);
        alert('Failed to update product. Please try again.');
        // 恢复原始数据
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please check your connection.');
      // 恢复原始数据
      fetchProducts();
    }
  };

  const renderCell = (product, field) => {
    const isEditing = editingProductId?.id === product.id && editingProductId?.field === field;
    
    if (isEditing && field !== 'id') {
      return (
        <input
          type={field === 'price' || field === 'stock' ? 'number' : 'text'}
          value={field === 'price' ? product[field].replace('$', '') : product[field]}
          onChange={(e) => handleCellChange(e, product.id, field)}
          onBlur={() => {
            setEditingProductId(null);
            // 编辑完成后发送更新请求
            handleCellEditComplete(product.id, field, product[field]);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEditingProductId(null);
              // 编辑完成后发送更新请求
              handleCellEditComplete(product.id, field, product[field]);
            }
          }}
          className="cell-input"
          autoFocus
          min={field === 'price' || field === 'stock' ? '0' : undefined}
          step={field === 'price' ? '0.01' : '1'}
        />
      );
    }

    return (
      <div 
        className="product-data-cell editable-cell" 
        onClick={() => field !== 'id' && field !== 'sort' && handleEditProduct(product, field)}
      >
        {product[field]}
      </div>
    );
  };

  // 格式化创建时间
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
  };

  // 生成分页按钮
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }
    
    return buttons;
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-main">
          <div className="product-welcome-container">
            <WelcomeHeader />
          </div>
          <div className="product-rectangle-wrapper">
            <WhiteRectangle title="Product List">
              <div className="loading-message">Loading...</div>
            </WhiteRectangle>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-main">
          <div className="product-welcome-container">
            <WelcomeHeader />
          </div>
          <div className="product-rectangle-wrapper">
            <WhiteRectangle title="Product List">
              <div className="error-message">Error: {error}</div>
            </WhiteRectangle>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <div className="product-welcome-container">
          <WelcomeHeader />
        </div>
        <div className="product-button-container">
          <button className="add-item-button" onClick={handleAddProduct}>
            Add items+
          </button>
        </div>
        <div className="product-rectangle-wrapper">
          <WhiteRectangle title="Product List">
            <div className="product-labels-row">
              <div className="product-label">ID</div>
              <div className="product-label">ProductName</div>
              <div className="product-label">
                BarCode
                <img
                  src={cameraIcon}
                  alt="Scan Barcode"
                  className="camera-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate('/camera', { state: { returnToProduct: true } });
                  }}
                  style={{ cursor: 'pointer', marginLeft: '8px' }}
                />
              </div>
              <div className="product-label">Price</div>
              <div className="product-label">Stock</div>
              <div className="product-label">CreateTime</div>
              <div className="product-label">Opration</div>
            </div>
            <div className="product-separator"></div>
            {currentProducts.map((product) => (
              <div 
                key={product.id} 
                className={`product-data-row ${parseInt(product.stock) < 5 ? 'low-stock-row' : ''}`}
              >
                <div className="product-data-cell">{product.sort}</div>
                <div className="product-data-cell">
                  {renderCell(product, 'name')}
                </div>
                <div className="product-data-cell">
                  {renderCell(product, 'barcode')}
                </div>
                <div className="product-data-cell">
                  {renderCell(product, 'price')}
                </div>
                <div className="product-data-cell">
                  {renderCell(product, 'stock')}
                </div>
                <div className="product-data-cell">
                  {formatDateTime(product.created_at)}
                </div>
                <div className="product-data-cell">
                  <div className="product-actions">
                    <img
                      src={trashIcon}
                      alt="Delete"
                      className="product-action-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProduct(product.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="no-data-message">暂无商品数据</div>
            )}
            
            {/* 分页控件 */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <div className="pagination-info">
                  show {startIndex + 1}-{Math.min(endIndex, products.length)} list，total {products.length} list
                </div>
                <div className="pagination-controls">
                  <button 
                    className="pagination-btn" 
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                  >
                    pre
                  </button>
                  {renderPaginationButtons()}
                  <button 
                    className="pagination-btn" 
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    next
                  </button>
                </div>
              </div>
            )}
          </WhiteRectangle>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Product;