import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import BackArrow from '../../components/BackArrow';
import chatSupportRobot from '../../assets/images/UI/8. Chat Support Robot.png';
import API_CONFIG from '../../api/config';
const AIChat = () => {
  const navigate = useNavigate();
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => 'session_' + Date.now());

  const handleBack = () => {
    navigate('/');
  };

  const toggleInputMode = () => {
    setIsVoiceMode(!isVoiceMode);
  };

  // AI消息发送函数
  const sendAIMessage = async (message) => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    
    // 添加用户消息
    const userMessage = { text: message, isUser: true, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const requestData = {
        message: message,  // 后端期望的字段名
        session_id: sessionId
      };
      
      const response = await fetch(`${API_CONFIG.BASE_URL}/ai/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // 检查响应是否包含错误
      if (data.error) {
        throw new Error(data.message || 'Server returned an error');
      }
      
      // 提取AI回复内容
      let aiReply = '';
      if (data.choices && data.choices[0] && data.choices[0].message) {
        aiReply = data.choices[0].message.content;
      } else if (data.message) {
        aiReply = data.message;
      } else {
        aiReply = 'Sorry, I cannot understand your question.';
      }
      
      // 添加AI回复消息
      const aiMessage = {
        text: aiReply,
        isUser: false,
        timestamp: Date.now() + 1
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('AI请求失败:', error);
      
      // 显示错误消息
      const errorMessage = {
        text: `Sorry, AI service is temporarily unavailable：${error.message}`,
        isUser: false,
        timestamp: Date.now() + 1,
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() && !isLoading) {
      sendAIMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <style>
        {`
          @keyframes shake {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(-10deg);
            }
            75% {
              transform: rotate(10deg);
            }
          }
          .bouncing-robot {
            animation: shake 2s ease-in-out infinite;
            transform-origin: bottom center;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      {/* 标题栏与返回箭头 */}
      <div style={{ 
        paddingTop: '35px',
        paddingLeft: '35px',
        paddingRight: '10px',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginTop: '15px'
          }}>
            <div onClick={handleBack} style={{ cursor: 'pointer' }}>
              <BackArrow />
            </div>
            <img 
              src={chatSupportRobot}
              alt="Chat Support Robot"
              className="bouncing-robot"
              style={{
                width: '90px',
                height: '90px',
                marginTop: '-20px'
              }}
            />
          </div>
        </div>
      </div>

      {/* 聊天消息区域 */}
      <div style={{
        padding: '0 20px',
        height: 'calc(100% - 180px)',
        overflowY: 'auto'
      }}>
        {messages.map((message, index) => (
          <div
            key={message.id || index}
            style={{
              display: 'flex',
              justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              marginBottom: '16px'
            }}
          >
            <div style={{
              maxWidth: '80%',
              padding: '12px 16px',
              borderRadius: message.isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
              backgroundColor: message.isError 
                ? '#FFE6E6' 
                : message.isUser 
                  ? '#1DA1FA' 
                  : '#F0F0F0',
              color: message.isError 
                ? '#D32F2F' 
                : message.isUser 
                  ? '#FFFFFF' 
                  : '#000000',
              fontSize: '16px',
              lineHeight: '1.4',
              position: 'relative'
            }}>
              {message.isUser ? (
                message.text
              ) : (
                <ReactMarkdown 
                  components={{
                    h1: ({children}) => <h1 style={{fontSize: '18px', fontWeight: 'bold', margin: '8px 0'}}>{children}</h1>,
                    h2: ({children}) => <h2 style={{fontSize: '16px', fontWeight: 'bold', margin: '6px 0'}}>{children}</h2>,
                    h3: ({children}) => <h3 style={{fontSize: '15px', fontWeight: 'bold', margin: '4px 0'}}>{children}</h3>,
                    ul: ({children}) => <ul style={{margin: '4px 0', paddingLeft: '20px'}}>{children}</ul>,
                    ol: ({children}) => <ol style={{margin: '4px 0', paddingLeft: '20px'}}>{children}</ol>,
                    li: ({children}) => <li style={{margin: '2px 0'}}>{children}</li>,
                    p: ({children}) => <p style={{margin: '4px 0'}}>{children}</p>,
                    strong: ({children}) => <strong style={{fontWeight: 'bold'}}>{children}</strong>,
                    code: ({children}) => <code style={{backgroundColor: 'rgba(0,0,0,0.1)', padding: '2px 4px', borderRadius: '3px', fontSize: '14px'}}>{children}</code>,
                    pre: ({children}) => <pre style={{backgroundColor: 'rgba(0,0,0,0.1)', padding: '8px', borderRadius: '6px', overflow: 'auto', fontSize: '14px'}}>{children}</pre>
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              )}
              {message.isStreaming && (
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '16px',
                  backgroundColor: '#666',
                  marginLeft: '4px',
                  animation: 'blink 1s infinite'
                }}>|</span>
              )}
            </div>
          </div>
        ))}
        
        {/* 加载指示器 */}
        {isLoading && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '16px'
          }}>
            <div style={{
              maxWidth: '80%',
              padding: '12px 16px',
              borderRadius: '20px 20px 20px 4px',
              backgroundColor: '#F0F0F0',
              color: '#666',
              fontSize: '16px',
              lineHeight: '1.4',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #ccc',
                borderTop: '2px solid #1DA1FA',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              AI正在思考中...
            </div>
          </div>
        )}
      </div>

      {/* 底部聊天输入框 */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {/* 切换语音/文字按钮 */}
          <button
            onClick={toggleInputMode}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#1DA1FA',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            {isVoiceMode ? (
              <span style={{ color: '#fff', fontSize: '20px' }}>Aa</span>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z" fill="white"/>
                <path d="M17 11C17 13.76 14.76 16 12 16C9.24 16 7 13.76 7 11H5C5 14.53 7.61 17.43 11 17.92V21H13V17.92C16.39 17.43 19 14.53 19 11H17Z" fill="white"/>
              </svg>
            )}
          </button>

          {/* 输入框 */}
          {!isVoiceMode ? (
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isLoading ? "AI is replying..." : "Type your message..."}
              disabled={isLoading}
              style={{
                flex: 1,
                height: '40px',
                borderRadius: '20px',
                border: '1px solid #E0E0E0',
                padding: '0 20px',
                fontSize: '16px',
                outline: 'none',
                backgroundColor: isLoading ? '#F5F5F5' : '#FFFFFF',
                color: isLoading ? '#999' : '#000'
              }}
            />
          ) : (
            <div style={{
              flex: 1,
              height: '40px',
              borderRadius: '20px',
              backgroundColor: '#F5F5F5',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '16px',
              color: '#666'
            }}>
              Hold to speak
            </div>
          )}

          {/* 发送按钮 */}
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: (isLoading || !inputText.trim()) ? '#CCC' : '#1DA1FA',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: (isLoading || !inputText.trim()) ? 'not-allowed' : 'pointer',
              flexShrink: 0
            }}
          >
            {isLoading ? (
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #fff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="white"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;