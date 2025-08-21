import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, Calendar } from 'lucide-react';
import { apiService } from '../../services/api';
import { format } from 'date-fns';
import { clsx } from 'clsx';

const AuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      const data = await apiService.getAuditLogs();
      setAuditLogs(data);
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.entityType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'ALL' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const getActionBadge = (action) => {
    const actionClasses = {
      ASSET_ASSIGNED: 'bg-blue-100 text-blue-800',
      ASSET_RETURNED: 'bg-green-100 text-green-800',
      TRANSFER_CREATED: 'bg-purple-100 text-purple-800',
      TRANSFER_COMPLETED: 'bg-indigo-100 text-indigo-800',
      PURCHASE_APPROVED: 'bg-amber-100 text-amber-800',
      USER_LOGIN: 'bg-slate-100 text-slate-800',
      ASSET_EXPENDED: 'bg-red-100 text-red-800',
    };

    return (
      <span className={clsx('px-2 py-1 text-xs font-medium rounded-full', actionClasses[action] || 'bg-gray-100 text-gray-800')}>
        {action.replace('_', ' ')}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Audit Trail</h1>
        <p className="text-slate-600">Complete log of all system activities and transactions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search audit logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="ALL">All Actions</option>
            <option value="ASSET_ASSIGNED">Asset Assigned</option>
            <option value="ASSET_RETURNED">Asset Returned</option>
            <option value="TRANSFER_CREATED">Transfer Created</option>
            <option value="TRANSFER_COMPLETED">Transfer Completed</option>
            <option value="PURCHASE_APPROVED">Purchase Approved</option>
            <option value="USER_LOGIN">User Login</option>
            <option value="ASSET_EXPENDED">Asset Expended</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Entity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    No audit logs found
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <div className="text-sm text-slate-900">
                          {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm:ss')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {log.userName}
                      </div>
                      <div className="text-xs text-slate-500">
                        ID: {log.userId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">
                        {log.entityType}
                      </div>
                      <div className="text-xs text-slate-500">
                        {log.entityId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">
                        {Object.entries(log.details).map(([key, value]) => (
                          <div key={key} className="mb-1">
                            <span className="font-medium">{key}:</span> {String(value)}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;