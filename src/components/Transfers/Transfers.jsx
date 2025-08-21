import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Search, Filter, Eye, Check, X, Truck } from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { TRANSFER_STATUS } from '../../types';

const Transfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const { user, hasPermission } = useAuth();

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const data = await apiService.getTransfers();
      setTransfers(data);
    } catch (error) {
      console.error('Failed to fetch transfers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || transfer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      [TRANSFER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
      [TRANSFER_STATUS.APPROVED]: 'bg-blue-100 text-blue-800',
      [TRANSFER_STATUS.IN_TRANSIT]: 'bg-purple-100 text-purple-800',
      [TRANSFER_STATUS.COMPLETED]: 'bg-green-100 text-green-800',
      [TRANSFER_STATUS.REJECTED]: 'bg-red-100 text-red-800',
    };

    return (
      <span className={clsx('px-2 py-1 text-xs font-medium rounded-full', statusClasses[status])}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const handleApprove = async (id) => {
    try {
      await apiService.approveTransfer(id, user.id);
      fetchTransfers();
    } catch (error) {
      console.error('Failed to approve transfer:', error);
    }
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transfer Management</h1>
          <p className="text-slate-600">Track inter-base asset movements and logistics</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transfers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="ALL">All Status</option>
            <option value={TRANSFER_STATUS.PENDING}>Pending</option>
            <option value={TRANSFER_STATUS.APPROVED}>Approved</option>
            <option value={TRANSFER_STATUS.IN_TRANSIT}>In Transit</option>
            <option value={TRANSFER_STATUS.COMPLETED}>Completed</option>
            <option value={TRANSFER_STATUS.REJECTED}>Rejected</option>
          </select>
        </div>
      </div>

      {/* Transfers Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Transfer ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredTransfers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <Truck className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    No transfers found
                  </td>
                </tr>
              ) : (
                filteredTransfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {transfer.id.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-900">Fort Liberty</span>
                        <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-900">Camp Pendleton</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {transfer.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(transfer.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <div>Requested: {format(new Date(transfer.requestDate), 'MMM d, yyyy')}</div>
                      {transfer.completionDate && (
                        <div className="text-slate-500">
                          Completed: {format(new Date(transfer.completionDate), 'MMM d, yyyy')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-slate-600 hover:text-slate-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        {transfer.status === TRANSFER_STATUS.PENDING && hasPermission('approve_transfers') && (
                          <>
                            <button
                              onClick={() => handleApprove(transfer.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
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

export default Transfers;