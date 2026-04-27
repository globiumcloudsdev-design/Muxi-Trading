'use client';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/common/DataTable';
import Loader from '@/components/common/Loader';
import { API } from '@/lib/api/end-point';
import DiscountOfferModal from '@/components/modals/DiscountOfferModal';
import { Percent, Tag, CalendarIcon, PencilLine, Trash2, Plus, BarChart3 } from 'lucide-react';
import ConfirmModal from '@/components/common/ConfirmModal';

export default function DiscountOffersAdminPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('12');
  const [searchTerm, setSearchTerm] = useState('');

  const showMessage = useCallback((text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  }, []);

  const fetchOffers = useCallback(async (page = 1, limit = pageSize, search = '') => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit,
        includeInactive: 'true'
      });
      if (search) params.append('search', search);

      const response = await fetch(`${API.base}/admin/discount-offers?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        setOffers(data.data || []);
        setPagination(data.pagination || {});
      } else {
        showMessage(data.error || 'Failed to fetch', 'error');
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
      showMessage('Network error', 'error');
    } finally {
      setLoading(false);
    }
  }, [pageSize, showMessage]);

  useEffect(() => {
    fetchOffers(currentPage, pageSize, searchTerm);
  }, [fetchOffers, currentPage, pageSize, searchTerm]);

  const handleSubmit = async (data) => {
    try {
      const token = localStorage.getItem('accessToken');
      const isEdit = !!editingOffer;
      const url = isEdit 
        ? `${API.base}/admin/discount-offers/${editingOffer._id}`
        : `${API.base}/admin/discount-offers`;
      const method = isEdit ? 'PUT' : 'POST';

      const payload = new FormData();
      payload.append('offerName', data.offerName || '');
      payload.append('offerTitle', data.offerTitle || '');
      payload.append('shortDescription', data.shortDescription || '');
      payload.append('longDescription', data.longDescription || '');
      payload.append('discountType', data.discountType || 'percentage');
      payload.append('discountValue', data.discountValue || '0');
      payload.append('couponCode', data.couponCode || '');
      payload.append('ctaButtonText', data.ctaButtonText || 'Claim Discount');
      payload.append('ctaRedirectUrl', data.ctaRedirectUrl || '/discount-offers');
      payload.append('priority', data.priority || '0');
      payload.append('countdownEnabled', String(data.countdownEnabled === true));
      payload.append('popupModalEnabled', String(data.popupModalEnabled === true));
      payload.append('featuredOffer', String(data.featuredOffer === true));
      payload.append('forceRepeatSession', String(data.forceRepeatSession === true));
      payload.append('status', data.status || 'active');
      payload.append('startDate', data.startDate || '');
      payload.append('endDate', data.endDate || '');

      if (data.bannerImage instanceof File) {
        payload.append('bannerImage', data.bannerImage);
      } else if (data.removeBannerImage) {
        payload.append('removeBannerImage', 'true');
      }
      if (data.heroModalImage instanceof File) {
        payload.append('heroModalImage', data.heroModalImage);
      } else if (data.removeHeroModalImage) {
        payload.append('removeHeroModalImage', 'true');
      }

      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: payload,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showMessage(isEdit ? 'Discount offer updated!' : 'Discount offer created!');
        fetchOffers(currentPage, pageSize, searchTerm);
        setModalOpen(false);
        setEditingOffer(null);
      } else {
        showMessage(result.error || 'Operation failed', 'error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      showMessage('Network error', 'error');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API.base}/admin/discount-offers/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showMessage('Discount offer deleted successfully!');
        fetchOffers(currentPage, pageSize, searchTerm);
        setDeleteId(null);
      } else {
        showMessage(result.error || 'Delete failed', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showMessage('Network error', 'error');
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const activeCount = offers.filter(o => o.status === 'active').length;
  const totalRedemptions = offers.reduce((sum, o) => sum + (o.totalRedemptions || 0), 0);

  const columns = [
    {
      key: 'image',
      label: 'Image',
      className: 'w-16',
      render: (item) => (
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-[#896336]/20 to-[#a88148]/10 border border-[#896336]/20">
          {item.bannerImage ? (
            <img src={item.bannerImage} alt={item.offerName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Tag className="w-5 h-5 text-[#896336]" />
            </div>
          )}
        </div>
      )
    },
    { 
      key: 'offerName', 
      label: 'Offer Name', 
      className: 'font-medium text-slate-900',
      render: (item) => (
        <div>
          <div className="font-semibold">{item.offerName}</div>
          {item.featuredOffer && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold">
              FEATURED
            </span>
          )}
        </div>
      )
    },
    { 
      key: 'discount', 
      label: 'Discount',
      render: (item) => (
        <span className="font-bold text-lg text-[#896336]">
          {item.discountType === 'percentage' ? `${item.discountValue}%` : `Rs. ${item.discountValue}`}
        </span>
      )
    },
    {
      key: 'attachedCategories',
      label: 'Categories',
      render: (item) => (
        <span className="text-sm text-slate-600">{item.totalCategoriesAttached || 0}</span>
      )
    },
    {
      key: 'totalProducts',
      label: 'Products',
      render: (item) => (
        <span className="text-sm text-slate-600">{item.totalProducts || 0}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
          item.status === 'active' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-slate-100 text-slate-500'
        }`}>
          {item.status}
        </span>
      )
    },
    {
      key: 'popupModalEnabled',
      label: 'Hero Popup',
      render: (item) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
          item.popupModalEnabled
            ? 'bg-purple-100 text-purple-700'
            : 'bg-slate-100 text-slate-400'
        }`}>
          {item.popupModalEnabled ? 'ON' : 'OFF'}
        </span>
      )
    },
    {
      key: 'dateRange',
      label: 'Validity',
      render: (item) => {
        const start = item.startDate ? new Date(item.startDate).toLocaleDateString() : '-';
        const end = item.endDate ? new Date(item.endDate).toLocaleDateString() : '-';
        return <span className="text-xs text-slate-500">{start} - {end}</span>;
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setEditingOffer(item);
              setModalOpen(true);
            }}
            className="p-1.5 text-slate-600 hover:text-[#896336] hover:bg-[#896336]/10 rounded transition-colors"
            title="Edit"
          >
            <PencilLine className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteClick(item._id)}
            className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {message.text && (
        <div className={`p-3 rounded-lg ${message.type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}>
          {message.text}
        </div>
      )}

      <PageHeader
        title="Discount Offers Management"
        description="Create and manage centralized discount offers that can be assigned to categories."
        buttonText="Create Discount Offer"
        onButtonClick={() => {
          setEditingOffer(null);
          setModalOpen(true);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-[#896336] to-[#a88148] text-white border-0 shadow-lg shadow-[#896336]/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80 font-medium text-sm mb-1">Total Offers</p>
                <h3 className="text-3xl font-bold">{offers.length}</h3>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg shadow-green-500/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80 font-medium text-sm mb-1">Active Offers</p>
                <h3 className="text-3xl font-bold">{activeCount}</h3>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Percent className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80 font-medium text-sm mb-1">Assigned Categories</p>
                <h3 className="text-3xl font-bold">{offers.reduce((s, o) => s + (o.totalCategoriesAttached || 0), 0)}</h3>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg shadow-purple-500/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80 font-medium text-sm mb-1">Total Products</p>
                <h3 className="text-3xl font-bold">{offers.reduce((s, o) => s + (o.totalProducts || 0), 0)}</h3>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-slate-800">All Discount Offers</CardTitle>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search offers..."
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#896336]"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={offers}
            columns={columns}
            pagination={pagination}
            showPageSizeSelector={true}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </CardContent>
      </Card>

      <DiscountOfferModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingOffer(null);
        }}
        offer={editingOffer}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Discount Offer"
        description="Are you sure you want to delete this discount offer? Categories using this offer will no longer have discounts."
      />
    </div>
  );
}
