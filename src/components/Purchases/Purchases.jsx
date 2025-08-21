import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Eye, Check, X, Package } from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { PURCHASE_STATUS } from '../../types';

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user, hasPermission } = useAuth();

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const data = await apiService.getPurchases();
      setPurchases(data);
    } catch (error) {
      console.error('Failed to fetch purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || purchase.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      [PURCHASE_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
      [PURCHASE_STATUS.APPROVED]: 'bg-green-100 text-green-800',
      [PURCHASE_STATUS.REJECTED]: 'bg-red-100 text-red-800',
      [PURCHASE_STATUS.DELIVERED]: 'bg-blue-100 text-blue-800',
    };

    return (
      <span className={clsx('px-2 py-1 text-xs font-medium rounded-full', statusClasses[status])}>
        {status}
      </span>
    );
  };

  const handleApprove = async (id) => {
    try {
      await apiService.approvePurchase(id, user.id);
      fetchPurchases();
    } catch (error) {
      console.error('Failed to approve purchase:', error);
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
          <h1 className="text-2xl font-bold text-slate-900">Purchase Management</h1>
          <p className="text-slate-600">Track and manage asset procurement orders</p>
        </div>
        {hasPermission('create_purchases') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Purchase</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search purchases..."
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
            <option value={PURCHASE_STATUS.PENDING}>Pending</option>
            <option value={PURCHASE_STATUS.APPROVED}>Approved</option>
            <option value={PURCHASE_STATUS.REJECTED}>Rejected</option>
            <option value={PURCHASE_STATUS.DELIVERED}>Delivered</option>
          </select>
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Asset Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Quantity & Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredPurchases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    No purchases found
                  </td>
                </tr>
              ) : (
                filteredPurchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {purchase.assetName}
                        </div>
                        <div className="text-sm text-slate-500">
                          {purchase.assetType.replace('_', ' ')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">
                        Qty: {purchase.quantity.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-500">
                        ${purchase.totalAmount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {purchase.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(purchase.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <div>Ordered: {format(new Date(purchase.orderDate), 'MMM d, yyyy')}</div>
                      {purchase.deliveryDate && (
                        <div className="text-slate-500">
                          Delivery: {format(new Date(purchase.deliveryDate), 'MMM d, yyyy')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-slate-600 hover:text-slate-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        {purchase.status === PURCHASE_STATUS.PENDING && hasPermission('approve_purchases') && (
                          <>
                            <button
                              onClick={() => handleApprove(purchase.id)}
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

export default Purchases;