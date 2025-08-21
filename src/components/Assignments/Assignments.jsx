import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Eye, RotateCcw, UserCheck } from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { ASSIGNMENT_STATUS } from '../../types';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const { hasPermission } = useAuth();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const data = await apiService.getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      [ASSIGNMENT_STATUS.ACTIVE]: 'bg-green-100 text-green-800',
      [ASSIGNMENT_STATUS.RETURNED]: 'bg-blue-100 text-blue-800',
      [ASSIGNMENT_STATUS.EXPENDED]: 'bg-red-100 text-red-800',
      [ASSIGNMENT_STATUS.DAMAGED]: 'bg-orange-100 text-orange-800',
    };

    return (
      <span className={clsx('px-2 py-1 text-xs font-medium rounded-full', statusClasses[status])}>
        {status}
      </span>
    );
  };

  const handleReturn = async (id) => {
    try {
      await apiService.returnAsset(id);
      fetchAssignments();
    } catch (error) {
      console.error('Failed to return asset:', error);
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
          <h1 className="text-2xl font-bold text-slate-900">Assignment Management</h1>
          <p className="text-slate-600">Track asset assignments to personnel</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search assignments..."
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
            <option value={ASSIGNMENT_STATUS.ACTIVE}>Active</option>
            <option value={ASSIGNMENT_STATUS.RETURNED}>Returned</option>
            <option value={ASSIGNMENT_STATUS.EXPENDED}>Expended</option>
            <option value={ASSIGNMENT_STATUS.DAMAGED}>Damaged</option>
          </select>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Asset ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Purpose
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
              {filteredAssignments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <UserCheck className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    No assignments found
                  </td>
                </tr>
              ) : (
                filteredAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {assignment.assetId.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center mr-3">
                          <Users className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {assignment.assignedTo}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {assignment.purpose}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(assignment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <div>Assigned: {format(new Date(assignment.assignmentDate), 'MMM d, yyyy')}</div>
                      {assignment.actualReturnDate && (
                        <div className="text-slate-500">
                          Returned: {format(new Date(assignment.actualReturnDate), 'MMM d, yyyy')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-slate-600 hover:text-slate-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        {assignment.status === ASSIGNMENT_STATUS.ACTIVE && hasPermission('manage_assignments') && (
                          <button
                            onClick={() => handleReturn(assignment.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Return Asset"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
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

export default Assignments;