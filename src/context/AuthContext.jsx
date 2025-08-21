import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_ROLES } from '../types';

const AuthContext = createContext(undefined);

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    name: 'System Administrator',
    email: 'admin@mams.mil',
    role: USER_ROLES.ADMIN,
    baseId: 'base-1',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'commander',
    name: 'Colonel John Smith',
    email: 'commander@mams.mil',
    role: USER_ROLES.BASE_COMMANDER,
    baseId: 'base-1',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    username: 'logistics',
    name: 'Major Sarah Johnson',
    email: 'logistics@mams.mil',
    role: USER_ROLES.LOGISTICS_OFFICER,
    baseId: 'base-1',
    createdAt: new Date().toISOString(),
  },
];

// Role permissions mapping
const rolePermissions = {
  [USER_ROLES.ADMIN]: ['view_all', 'manage_users', 'manage_bases', 'approve_transfers', 'approve_purchases'],
  [USER_ROLES.BASE_COMMANDER]: ['view_base', 'approve_transfers', 'approve_purchases', 'manage_assignments'],
  [USER_ROLES.LOGISTICS_OFFICER]: ['view_base', 'create_transfers', 'create_purchases', 'manage_assets'],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('mams_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username, password) => {
    // Mock authentication
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('mams_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mams_user');
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return rolePermissions[user.role]?.includes(permission) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};