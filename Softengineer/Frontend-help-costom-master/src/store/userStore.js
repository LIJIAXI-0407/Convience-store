import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import API_CONFIG from '../api/config';

const useUserStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],
      isLoading: false,
      error: null,
      
      setCurrentUser: (user) => set({ currentUser: user }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      
      // 原有的本地登录方法（保留用于离线模式）
      loginLocal: (email, password) => {
        const state = get();
        const user = state.users.find(u => u.email === email && u.password === password);
        if (!user) return false;
        const userWithPoints = {
          ...user,
          points: Number(user.points || 0)
        };
        set({ currentUser: userWithPoints, error: null });
        return true;
      },
      
      // 新的API登录方法
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_CONFIG.BASE_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password
            })
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || '登录失败');
          }
          
          if (data.success && data.data) {
            const user = {
              id: data.data.user.id,
              username: data.data.user.username,
              email: data.data.user.email,
              occupation: data.data.user.occupation,
              birthday: data.data.user.birthday,
              token: data.data.token,
              reword: data.data.user.reword
            };
            
            // 保存token到localStorage
            localStorage.setItem('authToken', data.data.token);
            
            set({ 
              currentUser: user, 
              isLoading: false, 
              error: null 
            });
            
            return { success: true, user };
          } else {
            throw new Error(data.message || '登录失败');
          }
        } catch (error) {
          console.error('登录错误:', error);
          set({ 
            isLoading: false, 
            error: error.message || '网络错误，请稍后重试' 
          });
          return { success: false, error: error.message };
        }
      },
      addUser: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_CONFIG.BASE_URL}/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || '注册失败');
          }
          
          if (data.success && data.data) {
            const user = {
              id: data.data.user.id,
              username: data.data.user.username,
              email: data.data.user.email,
              occupation: data.data.user.occupation,
              birthday: data.data.user.birthday,
              token: data.data.token,
              reword: data.data.user.reword || 0
            };
            
            // 保存token到localStorage
            localStorage.setItem('authToken', data.data.token);
            
            set({ 
              currentUser: user, 
              isLoading: false, 
              error: null 
            });
            
            return { success: true, user };
          } else {
            throw new Error(data.message || '注册失败');
          }
        } catch (error) {
          console.error('注册错误:', error);
          set({ 
            isLoading: false, 
            error: error.message || '网络错误，请稍后重试' 
          });
          return { success: false, error: error.message };
        }
      },
      
      updateUserAvatar: (avatar) => set((state) => {
        if (!state.currentUser) return state;
        
        const updatedUsers = state.users.map(user => 
          user.email === state.currentUser.email 
            ? { ...user, avatar }
            : user
        );
        
        return {
          users: updatedUsers,
          currentUser: { ...state.currentUser, avatar }
        };
      }),
      
      loginWithGoogle: (googleUser) => set((state) => {
        let user = state.users.find(u => u.email === googleUser.email);
        
        if (!user) {
          user = {
            email: googleUser.email,
            username: googleUser.name,
            points: 0,
            googleId: googleUser.sub
          };
          return {
            users: [...state.users, user],
            currentUser: user
          };
        }
        
        const updatedUser = {
          ...user,
          googleId: googleUser.sub,
          points: Number(user.points || 0)
        };
        
        const updatedUsers = state.users.map(u => 
          u.email === googleUser.email ? updatedUser : u
        );
        
        return {
          users: updatedUsers,
          currentUser: updatedUser
        };
      }),
      
      logout: () => {
        localStorage.removeItem('authToken');
        set({ currentUser: null, error: null });
      },
      
      updatePoints: (points) => set((state) => {
        if (!state.currentUser) return state;
        
        const updatedUsers = state.users.map(user => 
          user.email === state.currentUser.email 
            ? { ...user, points: Number(user.points || 0) + Number(points || 0) }
            : user
        );
        
        return {
          users: updatedUsers,
          currentUser: { 
            ...state.currentUser, 
            points: Number(state.currentUser.points || 0) + Number(points || 0) 
          }
        };
      }),
      
      updateReword: (reword) => set((state) => {
        if (!state.currentUser) return state;
        
        const updatedUsers = state.users.map(user => 
          user.email === state.currentUser.email 
            ? { ...user, reword: Number(reword || 0) }
            : user
        );
        
        return {
          users: updatedUsers,
          currentUser: { 
            ...state.currentUser, 
            reword: Number(reword || 0) 
          }
        };
      }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;