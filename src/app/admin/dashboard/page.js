'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, FolderTree, ShoppingCart, DollarSign } from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';
import Loader from '@/components/common/Loader';

// Reusable Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
      <CardTitle className="pr-2 text-xs font-medium text-gray-500 sm:text-sm">{title}</CardTitle>
      <Icon className={`h-4 w-4 shrink-0 sm:h-5 sm:w-5 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="break-words text-xl font-bold sm:text-2xl">{value}</div>
      {trend && (
        <p className="text-xs text-green-600 mt-1">{trend}</p>
      )}
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    totalItems: 0,
    totalCategories: 0,
    totalStock: 0,
    totalValue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        const response = await fetch('/api/admin/dashboard-stats', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await response.json();
        if (response.ok && result.success) {
          setStatsData(result.data);
        }
      } catch (error) {
        console.error('Dashboard stats fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { title: 'Total Items', value: statsData.totalItems, icon: Package, color: 'text-blue-600', trend: '+Updated live' },
    { title: 'Categories', value: statsData.totalCategories, icon: FolderTree, color: 'text-green-600' },
    { title: 'Total Stock', value: statsData.totalStock, icon: ShoppingCart, color: 'text-purple-600' },
    { title: 'Inventory Value', value: `₹${statsData.totalValue.toLocaleString()}`, icon: DollarSign, color: 'text-yellow-600', trend: 'Total worth' },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">Welcome back! Here&apos;s your inventory overview</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState title="No categories yet" description="Create your first category to get started" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState title="No low stock items" description="All items are well stocked" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
