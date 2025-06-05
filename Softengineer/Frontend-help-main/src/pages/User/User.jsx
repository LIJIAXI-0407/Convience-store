import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import WelcomeHeader from '../../components/WelcomeHeader';
import WhiteRectangle from '../../components/WhiteRectangle';
// import NotificationBell from '../../components/NotificationBell';
import '../../styles/shared.css';
import './user.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 分页相关状态
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // 每页显示5个用户

  // 获取用户数据
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost/sale/public/api/admin/users');
        const result = await response.json();
        
        if (result.success) {
          setUsers(result.data.users);
        } else {
          setError(result.message || '获取用户数据失败');
        }
      } catch (err) {
        setError('网络错误，无法获取用户数据');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 计算分页数据
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

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

  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  // 格式化创建时间
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-US');
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
          <div className="user-welcome-container">
            <WelcomeHeader />
          </div>
          <div className="user-rectangle-wrapper">
            <WhiteRectangle title="User List">
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
          <div className="user-welcome-container">
            <WelcomeHeader />
          </div>
          <div className="user-rectangle-wrapper">
            <WhiteRectangle title="User List">
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
        {/* <NotificationBell /> */}
        <div className="user-welcome-container">
          <WelcomeHeader />
        </div>
        <div className="user-rectangle-wrapper">
          <WhiteRectangle title="User List">
            <div className="user-labels-row">
              <div className="user-label">ID</div>
              <div className="user-label">UserName</div>
              <div className="user-label">Email</div>
              <div className="user-label">Career</div>
              <div className="user-label">Birthday</div>
              <div className="user-label">Reword</div>
              <div className="user-label">CreateTime</div>
            </div>
            <div className="user-separator"></div>
            {currentUsers
              .slice() // 创建一个副本以避免直接修改state
              .sort((a, b) => a.id - b.id) // 按用户ID升序排序
              .map((user, index) => (
                <div key={user.id} className="user-data-row">
                  <div className="user-data-cell">{user.id}</div>
                  <div className="user-data-cell">{user.username}</div>
                  <div className="user-data-cell">{user.email}</div>
                  <div className="user-data-cell">{user.occupation}</div>
                  <div className="user-data-cell">{formatDate(user.birthday)}</div>
                  <div className="user-data-cell">{user.reword}</div>
                  <div className="user-data-cell">{formatDateTime(user.created_at)}</div>
                </div>
              ))}
            {users.length === 0 && (
              <div className="no-data-message">No Data</div>
            )}
            
            {/* 分页控件 */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <div className="pagination-info">
                  Showing {startIndex + 1}-{Math.min(endIndex, users.length)} of {users.length} entries
                </div>
                <div className="pagination-controls">
                  <button 
                    className="pagination-btn" 
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {renderPaginationButtons()}
                  <button 
                    className="pagination-btn" 
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </WhiteRectangle>
        </div>
      </div>
    </div>
  );
};

export default User;