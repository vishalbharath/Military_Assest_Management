import React from 'react';
import { Shield, Home, Package, ArrowRightLeft, Users, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { clsx } from 'clsx';

const Navigation = ({ activeTab, onTabChange }) => {
  const { user, logout, hasPermission } = useAuth();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, permission: null },
    { id: 'purchases', label: 'Purchases', icon: Package, permission: 'view_base' },
    { id: 'transfers', label: 'Transfers', icon: ArrowRightLeft, permission: 'view_base' },
    { id: 'assignments', label: 'Assignments', icon: Users, permission: 'view_base' },
    { id: 'audit', label: 'Audit Logs', icon: FileText, permission: 'view_all' },
  ];

  const filteredItems = navigationItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  );

  return (
    <div className="bg-slate-900 text-white h-screen w-64 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-amber-400" />
          <div>
            <h1 className="text-xl font-bold">MAMS</h1>
            <p className="text-sm text-slate-400">Asset Management</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">
              {user?.name?.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium text-sm">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.role.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={clsx(
                    'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
                    activeTab === item.id
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;