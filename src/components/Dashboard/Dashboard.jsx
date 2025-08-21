import React, { useState, useEffect } from 'react';
import { BarChart3, Package, TrendingUp, TrendingDown, Users } from 'lucide-react';
import { apiService } from '../../services/api';
import MetricCard from './MetricCard';
import AssetTypeChart from './AssetTypeChart';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await apiService.getDashboardMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch dashboard metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center text-slate-500 py-8">
        Failed to load dashboard metrics. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Command Dashboard</h1>
        <p className="text-slate-600">Overview of military asset management and operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Opening Balance"
          value={metrics.openingBalance}
          icon={BarChart3}
          color="blue"
        />
        <MetricCard
          title="Closing Balance"
          value={metrics.closingBalance}
          icon={Package}
          color="green"
        />
        <MetricCard
          title="Net Movement"
          value={metrics.netMovement}
          icon={metrics.netMovement >= 0 ? TrendingUp : TrendingDown}
          trend={metrics.netMovement >= 0 ? 'up' : 'down'}
          trendValue={metrics.netMovement >= 0 ? `+${metrics.netMovement}` : `${metrics.netMovement}`}
          color={metrics.netMovement >= 0 ? 'green' : 'red'}
        />
        <MetricCard
          title="Total Assigned"
          value={metrics.totalAssigned}
          icon={Users}
          color="amber"
        />
        <MetricCard
          title="Total Expended"
          value={metrics.totalExpended}
          icon={TrendingDown}
          color="slate"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssetTypeChart data={metrics.assetsByType} />
        <RecentActivity activities={metrics.recentActivities} />
      </div>

      {/* Asset Status Overview */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Asset Status Overview</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Asset Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Available
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Assigned
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Expended
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {metrics.assetsByType.map((asset) => (
                <tr key={asset.type} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {asset.type.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {asset.count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    {asset.available.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600">
                    {asset.assigned.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {asset.maintenance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    {asset.expended.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;